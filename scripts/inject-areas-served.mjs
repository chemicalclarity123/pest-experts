import crypto from 'crypto';

const PROJECT_ID = 'vc8zkv1m';
const DATASET = 'production';
const API_VERSION = 'v2026-02-04';
const TOKEN = process.env.SANITY_WRITE_TOKEN || 'skwsE257FBojYtt4z9152ozQlajORtFcvomSE5leLQXrlDs1ilYyoeFHBCngdBWrri9AZ0AsXpOMj43dwkbg0cwYdCHyYmiHKXRFolFrurCm8g6TZT4hZTQNpYgiF3kQVk2CESYSJbHMnCUXAgqnASqHuibJd44J1yIDna4NPScnzSpvNoPp';

const BASE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data`;
const DRY_RUN = process.argv.includes('--dry-run');

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
 * Generate a random 12-character key
 */
function generateKey() {
    return crypto.randomBytes(6).toString('hex');
}

async function run() {
    console.log(`Starting Areas Served Injection Script ${DRY_RUN ? '(--dry-run MODE)' : '(LIVE MUTATION MODE)'}`);

    // 1. Fetch Service Areas to build the list
    const serviceAreas = await sanityQuery(`*[_type == "serviceArea"]{ title }`);
    const areaNames = serviceAreas.map(a => a.title).sort();
    const areasString = areaNames.join(', ');

    console.log(`Identified ${areaNames.length} areas: ${areasString}`);

    // 2. Fetch all Services
    const services = await sanityQuery(`*[_type == "service"]{ _id, title, overview }`);
    console.log(`Found ${services.length} services to process.`);

    const mutations = [];

    for (const service of services) {
        console.log(`\nChecking: "${service.title}"`);

        // Check if "Areas Served" block already exists in overview to prevent double-injection
        const overview = service.overview || [];
        const plainText = JSON.stringify(overview);

        if (plainText.toLowerCase().includes('areas served') || plainText.toLowerCase().includes('serving areas')) {
            console.log(`  -> Skipping: Already contains area mentions.`);
            continue;
        }

        // Prepare the new block
        const newBlock = {
            _key: generateKey(),
            _type: 'block',
            children: [
                {
                    _key: generateKey(),
                    _type: 'span',
                    marks: ['strong'],
                    text: 'Areas Served: '
                },
                {
                    _key: generateKey(),
                    _type: 'span',
                    marks: [],
                    text: `Professional pest control services provided across ${areasString} and surrounding Gauteng suburbs.`
                }
            ],
            markDefs: [],
            style: 'normal'
        };

        const updatedOverview = [...overview, newBlock];

        mutations.push({
            patch: {
                id: service._id,
                set: { overview: updatedOverview }
            }
        });
        console.log(`  -> Queued injection for ${service.title}`);
    }

    if (mutations.length > 0) {
        console.log(`\nReady to mutate ${mutations.length} documents.`);
        if (!DRY_RUN) {
            await sanityMutate(mutations);
            console.log('  -> ✅ Successfully updated Sanity.');
        } else {
            console.log('  -> ⚠️ DRY RUN: Skipping mutation.');
        }
    } else {
        console.log('\nNo updates needed.');
    }

    console.log('\nDone.');
}

run().catch(console.error);
