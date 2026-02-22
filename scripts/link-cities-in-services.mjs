import crypto from 'crypto';

const PROJECT_ID = 'vc8zkv1m';
const DATASET = 'production';
const API_VERSION = 'v2026-02-04';
const TOKEN = process.env.SANITY_WRITE_TOKEN || 'skwsE257FBojYtt4z9152ozQlajORtFcvomSE5leLQXrlDs1ilYyoeFHBCngdBWrri9AZ0AsXpOMj43dwkbg0cwYdCHyYmiHKXRFolFrurCm8g6TZT4hZTQNpYgiF3kQVk2CESYSJbHMnCUXAgqnASqHuibJd44J1yIDna4NPScnzSpvNoPp';

const BASE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data`;
const DRY_RUN = process.argv.includes('--dry-run');

// Configuration Limits
const MAX_LINKS_PER_PAGE = 8;
const MAX_LINKS_PER_URL = 1;

// Rich text fields to check in Service documents
const RICH_TEXT_FIELDS = ['introBodyText', 'content', 'overview', 'benefits'];

/**
 * Perform a GROQ Query using fetch
 */
async function sanityQuery(query) {
    const url = `${BASE_URL}/query/${DATASET}?query=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    if (!response.ok) {
        throw new Error(`Sanity Query Failed: ${response.status} ${await response.text()}`);
    }
    const json = await response.json();
    return json.result;
}

/**
 * Perform a Sanity Mutation using fetch
 */
async function sanityMutate(mutations) {
    const url = `${BASE_URL}/mutate/${DATASET}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({ mutations })
    });
    if (!response.ok) {
        throw new Error(`Sanity Mutation Failed: ${response.status} ${await response.text()}`);
    }
    return response.json();
}

/**
 * Generate a random 12-character key for Portable Text marks/children
 */
function generateKey() {
    return crypto.randomBytes(6).toString('hex');
}

/**
 * Normalizes strings for matching
 */
function normalizeText(text) {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').trim();
}

/**
 * Escapes string for use in RegExp
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function run() {
    console.log(`Starting City Linking Script for Services ${DRY_RUN ? '(--dry-run MODE)' : '(LIVE MUTATION MODE)'}`);

    // 1. Build City Dictionary from Service Areas
    console.log('\n--- Building City Dictionary ---');
    const serviceAreas = await sanityQuery(`*[_type == "serviceArea"]{ title, "slug": slug.current }`);

    const dictionary = [];
    for (const a of serviceAreas) {
        if (!a.title || !a.slug) continue;
        const cleanUrl = `/service-areas/${a.slug}/`;

        // Add the primary title
        dictionary.push({
            keyword: a.title,
            normalized: normalizeText(a.title),
            url: cleanUrl
        });

        // Special case for Johannesburg South -> link any mention of JHB
        if (a.slug === 'johannesburg-south') {
            dictionary.push({ keyword: 'Johannesburg', normalized: normalizeText('Johannesburg'), url: cleanUrl });
            dictionary.push({ keyword: 'Joburg', normalized: normalizeText('Joburg'), url: cleanUrl });
        }
    }

    // Sort by length desc to avoid partial matches
    dictionary.sort((a, b) => b.keyword.length - a.keyword.length);
    console.log(`Loaded ${dictionary.length} cities into dictionary.`);

    // 2. Fetch all Services
    console.log('\n--- Fetching Service Documents ---');
    const services = await sanityQuery(`*[_type == "service"]`);
    console.log(`Found ${services.length} services to process.`);

    // 3. Process each Service
    for (const service of services) {
        console.log(`\nProcessing: "${service.title}" (${service._id})`);

        let totalLinksAdded = 0;
        const urlsLinkedInDoc = new Set();
        const keywordsLinkedInDoc = new Set();

        let docHasChanges = false;
        const patchPayload = {};

        for (const field of RICH_TEXT_FIELDS) {
            if (!service[field] || !Array.isArray(service[field])) continue;

            // Clone field content
            const blocks = JSON.parse(JSON.stringify(service[field]));
            let fieldHasChanges = false;

            for (let i = 0; i < blocks.length; i++) { // Iterate through blocks
                const block = blocks[i];
                if (block._type !== 'block' || !block.children) continue;
                if (totalLinksAdded >= MAX_LINKS_PER_PAGE) break;

                for (let j = 0; j < block.children.length; j++) { // Iterate through children (spans)
                    const child = block.children[j];
                    if (child._type !== 'span' || (child.marks && child.marks.length > 0)) continue;

                    const childText = child.text || '';
                    if (!childText) continue;

                    let bestMatch = null;

                    // Find the match that occurs EARLIEST in the text (appearance order),
                    // breaking ties with keyword length (longest first)
                    for (const entry of dictionary) {
                        if (totalLinksAdded >= MAX_LINKS_PER_PAGE) break;
                        if (urlsLinkedInDoc.has(entry.url)) continue;
                        if (keywordsLinkedInDoc.has(entry.normalized)) continue;

                        const regex = new RegExp(`\\b${escapeRegExp(entry.keyword)}\\b`, 'gi');
                        let match;
                        while ((match = regex.exec(childText)) !== null) {
                            if (!bestMatch || match.index < bestMatch.index || (match.index === bestMatch.index && entry.keyword.length > bestMatch.entry.keyword.length)) {
                                bestMatch = {
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    entry: entry
                                };
                            }
                        }
                    }

                    if (bestMatch) {
                        const entry = bestMatch.entry;
                        console.log(`  🔗 [${field}] Found match for "${bestMatch.text}" -> ${entry.url}`);

                        const textBefore = childText.substring(0, bestMatch.index);
                        const textMatch = childText.substring(bestMatch.index, bestMatch.index + bestMatch.length);
                        const textAfter = childText.substring(bestMatch.index + bestMatch.length);

                        const markDefKey = generateKey();
                        if (!block.markDefs) block.markDefs = [];
                        block.markDefs.push({
                            _type: 'link',
                            _key: markDefKey,
                            href: entry.url,
                            blank: false
                        });

                        const newChildren = [];
                        if (textBefore) newChildren.push({ _type: 'span', _key: generateKey(), text: textBefore, marks: [] });
                        newChildren.push({ _type: 'span', _key: generateKey(), text: textMatch, marks: [markDefKey] });
                        if (textAfter) newChildren.push({ _type: 'span', _key: generateKey(), text: textAfter, marks: [] });

                        // Replace the current child with the new children
                        block.children.splice(j, 1, ...newChildren);

                        fieldHasChanges = true;
                        docHasChanges = true;
                        totalLinksAdded++;
                        urlsLinkedInDoc.add(entry.url);
                        keywordsLinkedInDoc.add(entry.normalized);

                        // Adjust j to re-process the first new span (textBefore if it exists)
                        // The j++ in the loop will then move to the next logical span.
                        // If textBefore was created, it's at index j.
                        // If textBefore was not created, textMatch is at index j.
                        // In either case, we want the next iteration to process the span *after* the one we just linked.
                        // So, we decrement j by 1 to counteract the j++ of the loop, effectively staying at the start of the new sequence.
                        j--;
                    }
                }
            }

            if (fieldHasChanges) {
                patchPayload[field] = blocks;
            }
        }

        if (docHasChanges) {
            console.log(`  -> Ready to link ${totalLinksAdded} cities.`);
            if (!DRY_RUN) {
                try {
                    const mutation = {
                        patch: {
                            id: service._id,
                            set: patchPayload
                        }
                    };
                    await sanityMutate([mutation]);
                    console.log(`  -> ✅ Successfully patched service ${service._id}`);
                } catch (err) {
                    console.error(`  -> ❌ Failed to patch service ${service._id}:`, err);
                }
            } else {
                console.log(`  -> ⚠️ DRY RUN: Skipping patch.`);
            }
        } else {
            console.log(`  -> No city linking opportunities found.`);
        }
    }

    console.log('\nDone.');
}

run().catch(console.error);
