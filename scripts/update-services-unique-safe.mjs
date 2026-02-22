const PROJECT_ID = 'vc8zkv1m';
const DATASET = 'production';
const API_VERSION = '2026-02-04';
const TOKEN = 'skg3ilUoFxBRfmAuRLQRcweY5W49fG12yoR4jDcmiXowQFJXjDu9nH8x9s7ezQEKfWRsxiCRFgOWtQEzA';

// Each service has exactly 4 points.
// Constraints: NO guarantees, NO odor claims, NO specialist equipment claims, NO ecological claims, NO report claims.
// Focus: Trust, 22 Years Experience, 1 Hour Response, Local Gauteng Experience, Professionalism.

const serviceUpdates = [
    {
        slug: 'ant-control-solutions',
        title: 'Ant Control',
        data: {
            serviceHighlights: [
                { title: '22 Years Ant Experience', description: 'Since 2004, we have successfully managed Gauteng’s specific ant species with professional diligence.', icon: 'calendar-check', _key: '1' },
                { title: '1-Hour Response Time', description: 'When ant swarms or trails suddenly invade your space, our team aims to be in touch and deploy quickly.', icon: 'clock', _key: '2' },
                { title: 'Approved Applications', description: 'We strictly utilize registered baits and targeted barrier treatments, avoiding unproven remedies.', icon: 'shield', _key: '3' },
                { title: 'Local Knowledge', description: 'Deep understanding of the seasonal triggers that cause ants to enter properties in our region.', icon: 'map-location-dot', _key: '4' }
            ]
        }
    },
    {
        slug: '\u00a0commercial-pest-control-solutions',
        title: 'Commercial Pest Control',
        data: {
            serviceHighlights: [
                { title: 'Trusted Since 2004', description: '22 years of partnering with local businesses to reliably protect their commercial premises.', icon: 'handshake', _key: '1' },
                { title: '1-Hour Response Time', description: 'Rapid deployment for commercial clients to minimize business disruption when issues arise.', icon: 'clock', _key: '2' },
                { title: 'Professional Operations', description: 'Uniformed, trained technicians operating respectfully and efficiently on your site.', icon: 'user-tie', _key: '3' },
                { title: 'Compliant Methods', description: 'Working strictly with approved, registered methods suitable for commercial environments.', icon: 'clipboard-check', _key: '4' }
            ]
        }
    },
    {
        slug: 'termite-control-soil-poisoning',
        title: 'Termite Control & Soil Poisoning',
        data: {
            serviceHighlights: [
                { title: '22 Years Structural Defense', description: 'Over two decades of experience protecting local properties from extensive termite damage.', icon: 'calendar-check', _key: '1' },
                { title: '1-Hour Response Time', description: 'When you discover termite activity, we aim to be in touch and assist your property rapidly.', icon: 'clock', _key: '2' },
                { title: 'Registered Treatments', description: 'Applying industry-approved soil poisoning and control solutions safely and correctly.', icon: 'flask', _key: '3' },
                { title: 'Gauteng Soil Expertise', description: 'Years of hands-on experience dealing with the specific subterranean termites in our region.', icon: 'trowel-bricks', _key: '4' }
            ]
        }
    },
    {
        slug: 'rodent-control-bait-station-management',
        title: 'Rodent Control & Bait Station Management',
        data: {
            serviceHighlights: [
                { title: 'Rodent Control Since 2004', description: 'An extensive 22-year track record dealing securely with local rat and mice populations.', icon: 'shield', _key: '1' },
                { title: '1-Hour Response Time', description: 'Fast tracking and bait station deployment when you spot immediate rodent activity.', icon: 'clock', _key: '2' },
                { title: 'Industry-Approved Baits', description: 'Setting up secure containment using properly registered and regulated control products.', icon: 'lock', _key: '3' },
                { title: 'Local Property Knowledge', description: 'Understanding the structural vulnerabilities of Gauteng homes and commercial buildings.', icon: 'house-crack', _key: '4' }
            ]
        }
    },
    {
        slug: 'cockroach-extermination',
        title: 'Cockroach Extermination',
        data: {
            serviceHighlights: [
                { title: '22 Years of Control', description: 'Dealing with resilient local roach species professionally and successfully since 2004.', icon: 'calendar-check', _key: '1' },
                { title: '1-Hour Response Time', description: 'Quick action to address sudden crawling insect infestations in your kitchens or businesses.', icon: 'clock', _key: '2' },
                { title: 'Professional Application', description: 'Relying strictly on approved, registered gels and targeted barrier defense methods.', icon: 'spray-can', _key: '3' },
                { title: 'Gauteng Hygiene Experts', description: 'Deeply familiar with the unique environments that allow local roaches to thrive.', icon: 'magnifying-glass', _key: '4' }
            ]
        }
    },
    {
        slug: 'bed-bug-treatments',
        title: 'Bed Bug Treatments',
        data: {
            serviceHighlights: [
                { title: 'Trusted Relief Since 2004', description: '22 years of assisting locals with complex, sensitive bed bug issues professionally.', icon: 'calendar-check', _key: '1' },
                { title: '1-Hour Response Time', description: 'Rapid scheduling and assistance when you need immediate help for your sleeping areas.', icon: 'clock', _key: '2' },
                { title: 'Diligent Treatments', description: 'Executing focused, multi-stage applications using explicitly registered products.', icon: 'rotate', _key: '3' },
                { title: 'Local Discretion', description: 'Professional, respectful property access, treating your bedroom and home with utmost care.', icon: 'bed', _key: '4' }
            ]
        }
    },
    {
        slug: 'restaurant-food-premises-pest-control',
        title: 'Restaurant & Food Premises',
        data: {
            serviceHighlights: [
                { title: '22 Years Hospitality Experience', description: 'A trusted service partner to Gauteng’s food and beverage industry since 2004.', icon: 'utensils', _key: '1' },
                { title: '1-Hour Response Time', description: 'Rapid assistance for restaurants to keep your daily operations running smoothly.', icon: 'clock', _key: '2' },
                { title: 'Industry-Approved Standards', description: 'Applying only correctly registered products suitable for kitchen proximity and compliance.', icon: 'certificate', _key: '3' },
                { title: 'Local Knowledge', description: 'Understanding the specific health demands and operational needs of local eateries.', icon: 'users', _key: '4' }
            ]
        }
    },
    {
        slug: 'industrial-pest-management-gauteng',
        title: 'Industrial Pest Management',
        data: {
            serviceHighlights: [
                { title: 'Industrial Defense Since 2004', description: 'Protecting large-scale factories and industrial plants reliably for 22 solid years.', icon: 'industry', _key: '1' },
                { title: '1-Hour Response Time', description: 'Fast action for industrial parks when production lines or storage are at risk.', icon: 'clock', _key: '2' },
                { title: 'Approved Industrial Methods', description: 'Deploying registered, compliant solutions intended for tough working environments.', icon: 'hard-hat', _key: '3' },
                { title: 'Gauteng Manufacturing Insight', description: 'Extensive experience navigating the scale and layouts of local industrial zones.', icon: 'map-location-dot', _key: '4' }
            ]
        }
    },
    {
        slug: 'warehouse-logistics-pest-control',
        title: 'Warehouse & Logistics',
        data: {
            serviceHighlights: [
                { title: '22 Years Supply Chain Protection', description: 'Securing logistics hubs, dispatch areas, and storage facilities effectively since 2004.', icon: 'truck-ramp-box', _key: '1' },
                { title: '1-Hour Response Time', description: 'Quick intervention to protect stored goods and incoming freight from infestation.', icon: 'clock', _key: '2' },
                { title: 'Professional & Compliant', description: 'Using strictly approved interventions suitable for expansive warehousing setups.', icon: 'clipboard-check', _key: '3' },
                { title: 'Local Distribution Knowledge', description: 'Familiar with the specific pest pressures of Gauteng’s major logistics corridors.', icon: 'box', _key: '4' }
            ]
        }
    },
    {
        slug: 'school-healthcare-pest-control',
        title: 'School & Healthcare',
        data: {
            serviceHighlights: [
                { title: 'Trusted by Facilities Since 2004', description: '22 years of respectful, careful service in sensitive institutional environments.', icon: 'calendar-check', _key: '1' },
                { title: '1-Hour Response Time', description: 'Rapid, reliable deployment when schools or clinics face sudden pest pressures.', icon: 'clock', _key: '2' },
                { title: 'Compliant Applications', description: 'Strict adherence to registered methods appropriate for sensitive and communal sites.', icon: 'file-lines', _key: '3' },
                { title: 'Local Community Partner', description: 'Deep understanding of the operational schedules in Gauteng’s care facilities.', icon: 'users', _key: '4' }
            ]
        }
    },
    {
        slug: 'seasonal-pest-control',
        title: 'Seasonal Pest Control',
        data: {
            serviceHighlights: [
                { title: '22 Years of Seasonal Tracking', description: 'Anticipating and managing Gauteng’s specific seasonal pest cycles since 2004.', icon: 'calendar-days', _key: '1' },
                { title: '1-Hour Response Time', description: 'Fast action when summer rains or winter cold snaps trigger sudden indoor swarms.', icon: 'clock', _key: '2' },
                { title: 'Approved Defensive Barriers', description: 'Creating consistent perimeters using strictly registered and reliable applications.', icon: 'shield', _key: '3' },
                { title: 'Deep Local Knowledge', description: 'Extensive understanding of the specific climatic behaviors of pests in our province.', icon: 'sun', _key: '4' }
            ]
        }
    },
    {
        slug: 'residential-pest-control-services',
        title: 'Residential Pest Control',
        data: {
            serviceHighlights: [
                { title: 'Protecting Homes Since 2004', description: '22 years of trusted, professional service for homeowners across the province.', icon: 'calendar-check', _key: '1' },
                { title: '1-Hour Response Time', description: 'When pests invade your personal space, our team is ready to act swiftly and assist.', icon: 'clock', _key: '2' },
                { title: 'Approved Home Methods', description: 'Applying only correctly registered products with professional care and diligence.', icon: 'house-circle-check', _key: '3' },
                { title: 'Professional & Courteous', description: 'Uniformed technicians who treat your family and home with the utmost respect.', icon: 'user-shield', _key: '4' }
            ]
        }
    },
    {
        slug: 'body-corporate-estate-pest-control',
        title: 'Body Corporate & Estate',
        data: {
            serviceHighlights: [
                { title: '22 Years of Estate Management', description: 'A long-standing and reliable partner to Body Corporates across the region.', icon: 'building', _key: '1' },
                { title: '1-Hour Response Time', description: 'Fast routing for sudden complex-wide issues or localized individual unit assistance.', icon: 'clock', _key: '2' },
                { title: 'Compliant & Approved', description: 'Utilizing registered solutions that strictly align with complex management rules.', icon: 'clipboard-check', _key: '3' },
                { title: 'Local Complex Knowledge', description: 'Extensive experience navigating the specific access needs of Gauteng HOAs.', icon: 'id-card', _key: '4' }
            ]
        }
    },
    {
        slug: 'office-retail-pest-control',
        title: 'Office & Retail',
        data: {
            serviceHighlights: [
                { title: '22 Years Corporate Service', description: 'Providing reliable pest management to retail and corporate spaces since 2004.', icon: 'calendar-check', _key: '1' },
                { title: '1-Hour Response Time', description: 'Rapid deployment to resolve issues before they impact your staff or customers.', icon: 'clock', _key: '2' },
                { title: 'Professionally Approved Methods', description: 'Deploying registered applications suited perfectly for commercial retail floors.', icon: 'shop', _key: '3' },
                { title: 'Local Business Understanding', description: 'Familiar with the specific foot-traffic and operational challenges in Gauteng.', icon: 'users-gear', _key: '4' }
            ]
        }
    }
];

async function runUpdates() {
    console.log('🚀 Starting Unique 4-Point Production Service Update...');

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
