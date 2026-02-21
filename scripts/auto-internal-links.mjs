import crypto from 'crypto';

const PROJECT_ID = 'vc8zkv1m';
const DATASET = 'production';
const API_VERSION = 'v2026-02-04';
const TOKEN = process.env.SANITY_WRITE_TOKEN || 'skwsE257FBojYtt4z9152ozQlajORtFcvomSE5leLQXrlDs1ilYyoeFHBCngdBWrri9AZ0AsXpOMj43dwkbg0cwYdCHyYmiHKXRFolFrurCm8g6TZT4hZTQNpYgiF3kQVk2CESYSJbHMnCUXAgqnASqHuibJd44J1yIDna4NPScnzSpvNoPp';

const BASE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data`;
const DRY_RUN = process.argv.includes('--dry-run');

// Configuration Limits
const MAX_LINKS_PER_POST = 6;
const MAX_LINKS_PER_URL = 1;

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
 * Normalizes strings for matching (lowercase, strips punctuation)
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
    console.log(`Starting Internal Linking Script ${DRY_RUN ? '(--dry-run MODE)' : '(LIVE MUTATION MODE)'}`);

    // 1. Build Keyword Dictionary
    console.log('\n--- Building Keyword Dictionary ---');
    const services = await sanityQuery(`*[_type == "service"]{ title, "slug": slug.current }`);
    const serviceAreas = await sanityQuery(`*[_type == "serviceArea"]{ title, "slug": slug.current }`);

    const dictionary = [];

    // Add Services
    for (const s of services) {
        if (!s.title || !s.slug) continue;
        const cleanUrl = `/services/${s.slug}/`;

        dictionary.push({
            keyword: s.title,
            normalized: normalizeText(s.title),
            url: cleanUrl
        });

        // Add conversational variants based on slug
        const variants = [];
        if (s.slug.includes('termite')) variants.push('termites', 'termite');
        if (s.slug.includes('cockroach')) variants.push('cockroaches', 'roaches', 'cockroach');
        if (s.slug.includes('rodent')) variants.push('rodents', 'rats', 'mice', 'rat', 'mouse');
        if (s.slug.includes('bed-bug')) variants.push('bed bugs', 'bed bug', 'bedbugs', 'bedbug');
        if (s.slug.includes('ant')) variants.push('ants', 'ant infestation');
        if (s.slug.includes('flea')) variants.push('fleas', 'flea');
        if (s.slug.includes('mosquito')) variants.push('mosquitoes', 'mosquitos', 'mosquito');
        if (s.slug.includes('bird') || s.slug.includes('pigeon')) variants.push('birds', 'pigeons', 'bird proofing');
        if (s.slug.includes('fly') || s.slug.includes('flies')) variants.push('flies', 'house flies');
        if (s.slug.includes('weed')) variants.push('weeds', 'weed control');

        if (s.title.toLowerCase().includes('control')) {
            variants.push(s.title.replace(/control/i, 'exterminator').trim());
        }

        for (const v of variants) {
            dictionary.push({
                keyword: v,
                normalized: normalizeText(v),
                url: cleanUrl
            });
        }
    }

    // Add Service Areas
    for (const a of serviceAreas) {
        if (!a.title || !a.slug) continue;
        dictionary.push({
            keyword: a.title,
            normalized: normalizeText(a.title),
            url: `/service-areas/${a.slug}/`
        });
        // Add "pest control in [area]" variant
        dictionary.push({
            keyword: `pest control in ${a.title}`,
            normalized: normalizeText(`pest control in ${a.title}`),
            url: `/service-areas/${a.slug}/`
        });
    }

    // Sort dictionary by longest keyword first to prevent partial matches
    dictionary.sort((a, b) => b.keyword.length - a.keyword.length);

    console.log(`Loaded ${dictionary.length} keywords into dictionary.`);

    // 2. Fetch Blog Posts
    console.log('\n--- Fetching Blog Posts ---');
    const posts = await sanityQuery(`*[_type == "blogPost" && defined(content)]`);
    console.log(`Found ${posts.length} blog posts to process.`);

    // 3. Process Each Post
    for (const post of posts) {
        console.log(`\nProcessing: "${post.title}" (${post._id})`);

        let totalLinksAdded = 0;
        const urlsLinkedInPost = new Set();
        const keywordsLinkedInPost = new Set();

        // Deep clone content so we can mutate it
        const updatedContent = JSON.parse(JSON.stringify(post.content));
        let hasChanges = false;

        // Iterate over blocks
        for (const block of updatedContent) {
            if (block._type !== 'block' || !block.children) continue;

            if (totalLinksAdded >= MAX_LINKS_PER_POST) break;

            for (let i = 0; i < block.children.length; i++) {
                const child = block.children[i];

                // Skip non-text children or children that already have marks
                if (child._type !== 'span' || (child.marks && child.marks.length > 0)) continue;

                let childText = child.text || '';
                if (!childText) continue;

                let matchFound = false;

                for (const entry of dictionary) {
                    if (totalLinksAdded >= MAX_LINKS_PER_POST) break;
                    if (urlsLinkedInPost.has(entry.url)) continue;
                    if (keywordsLinkedInPost.has(entry.normalized)) continue;

                    // Case-insensitive exact word boundary match
                    const regex = new RegExp(`\\b${escapeRegExp(entry.keyword)}\\b`, 'i');
                    const match = childText.match(regex);

                    if (match) {
                        console.log(`  🔗 Found match for "${entry.keyword}" -> ${entry.url}`);

                        const matchIndex = match.index;
                        const matchLength = match[0].length;

                        const textBefore = childText.substring(0, matchIndex);
                        const textMatch = childText.substring(matchIndex, matchIndex + matchLength);
                        const textAfter = childText.substring(matchIndex + matchLength);

                        // 1. Create MarkDef
                        const markDefKey = generateKey();
                        if (!block.markDefs) block.markDefs = [];
                        block.markDefs.push({
                            _type: 'link',
                            _key: markDefKey,
                            href: entry.url,
                            blank: false
                        });

                        // 2. Split the child array
                        const newChildren = [];

                        if (textBefore) {
                            newChildren.push({
                                _type: 'span',
                                _key: generateKey(),
                                text: textBefore,
                                marks: []
                            });
                        }

                        newChildren.push({
                            _type: 'span',
                            _key: generateKey(),
                            text: textMatch,
                            marks: [markDefKey]
                        });

                        if (textAfter) {
                            newChildren.push({
                                _type: 'span',
                                _key: generateKey(),
                                text: textAfter,
                                marks: []
                            });
                        }

                        block.children.splice(i, 1, ...newChildren);

                        matchFound = true;
                        hasChanges = true;
                        totalLinksAdded++;
                        urlsLinkedInPost.add(entry.url);
                        keywordsLinkedInPost.add(entry.normalized);

                        break;
                    }
                }

                if (matchFound) {
                    i += 1;
                }
            }
        }

        if (hasChanges) {
            console.log(`  -> Ready to link ${totalLinksAdded} keywords.`);
            if (!DRY_RUN) {
                try {
                    const mutation = {
                        patch: {
                            id: post._id,
                            set: { content: updatedContent }
                        }
                    };
                    await sanityMutate([mutation]);
                    console.log(`  -> ✅ Successfully patched document ${post._id}`);
                } catch (err) {
                    console.error(`  -> ❌ Failed to patch document ${post._id}:`, err);
                }
            } else {
                console.log(`  -> ⚠️ DRY RUN: Skipping patch.`);
            }
        } else {
            console.log(`  -> No linking opportunities found.`);
        }
    }

    console.log('\nDone.');
}

run().catch(console.error);
