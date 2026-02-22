const PROJECT_ID = 'vc8zkv1m';
const DATASET = 'production';
const API_VERSION = '2026-02-04';
const TOKEN = 'skg3ilUoFxBRfmAuRLQRcweY5W49fG12yoR4jDcmiXowQFJXjDu9nH8x9s7ezQEKfWRsxiCRFgOWtQEzA';

// The requested standard 4-point template focuses ONLY on: Wait Times, 22 Years Experience, Trust, Local Knowledge.
const standardTrustPoints = [
    { title: 'Trusted Since 2004', description: 'With over 22 years of continuous operation, we bring decades of hands-on experience to every property we service.', icon: 'calendar-check', _key: '1' },
    { title: '1-Hour Response Time', description: 'When you need urgent assistance, our rapid response team aims to be in touch and deploy quickly across our service areas.', icon: 'clock', _key: '2' },
    { title: 'Local Gauteng Knowledge', description: 'Deeply familiar with the specific pest challenges and seasonal trends affecting homes and businesses in our region.', icon: 'map-location-dot', _key: '3' },
    { title: 'Professional & Respectful', description: 'Our trained, uniformed staff arrives ready to work efficiently, treating your property with the utmost respect and care.', icon: 'user-shield', _key: '4' }
];

// Applying the exact same 4 standard points to all services to eliminate legal risk from specific claims.
const serviceUpdates = [
    { slug: 'ant-control-solutions', title: 'Ant Control', data: { serviceHighlights: standardTrustPoints } },
    { slug: '\u00a0commercial-pest-control-solutions', title: 'Commercial Pest Control', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'termite-control-soil-poisoning', title: 'Termite Control & Soil Poisoning', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'rodent-control-bait-station-management', title: 'Rodent Control & Bait Station Management', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'cockroach-extermination', title: 'Cockroach Extermination', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'bed-bug-treatments', title: 'Bed Bug Treatments', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'restaurant-food-premises-pest-control', title: 'Restaurant & Food Premises', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'industrial-pest-management-gauteng', title: 'Industrial Pest Management', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'warehouse-logistics-pest-control', title: 'Warehouse & Logistics', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'school-healthcare-pest-control', title: 'School & Healthcare', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'seasonal-pest-control', title: 'Seasonal Pest Control', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'residential-pest-control-services', title: 'Residential Pest Control', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'body-corporate-estate-pest-control', title: 'Body Corporate & Estate', data: { serviceHighlights: standardTrustPoints } },
    { slug: 'office-retail-pest-control', title: 'Office & Retail', data: { serviceHighlights: standardTrustPoints } }
];

async function runUpdates() {
    console.log('🚀 Starting Production Service Content Update (4 Standard Trust Points)...');

    const queryUrl = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=*[_type == "service"]{_id, slug}`;

    const queryRes = await fetch(queryUrl, {
        headers: { Authorization: `Bearer ${TOKEN}` }
    });

    if (!queryRes.ok) throw new Error(`Query failed: ${await queryRes.text()}`);
    const queryData = await queryRes.json();
    const existingDocs = queryData.result;

    const mutations = [];

    for (const update of serviceUpdates) {
        const doc = existingDocs.find(d => d.slug?.current === update.slug);

        if (!doc) {
            console.warn(`⚠️  Skipping ${update.slug}: not found in Sanity.`);
            continue;
        }

        mutations.push({
            patch: {
                id: doc._id,
                set: {
                    serviceHighlights: update.data.serviceHighlights
                }
            }
        });
        console.log(`Prepared update for ${update.slug} (${doc._id})`);
    }

    if (mutations.length === 0) return console.log('No mutations to run.');

    const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}?returnIds=true`;

    const mutateRes = await fetch(mutateUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify({ mutations })
    });

    if (!mutateRes.ok) {
        throw new Error(`Mutate failed: ${await mutateRes.text()}`);
    }

    const mutateData = await mutateRes.json();
    console.log(`✅ Production Update Successful! Updated ${mutateData.results.length} documents.`);
}

runUpdates().catch(err => {
    console.error('Fatal exactly:', err);
    process.exit(1);
});
