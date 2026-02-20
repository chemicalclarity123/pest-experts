// scripts/seed-areas.mjs
// Script para crear los 7 documentos de service area en Sanity
import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'vc8zkv1m',
    dataset: 'production',
    apiVersion: '2026-02-04',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
});

// 7 áreas hub con contenido rico para ranking local
const areas = [
    {
        title: 'Pretoria',
        slug: 'pretoria',
        isHub: true,
        description: 'Trusted pest control in Pretoria. Fast, professional, and guaranteed results. SABS-approved treatments for homes and businesses.',
        heroSubheading: 'Pretoria\'s climate — hot summers and mild winters — creates ideal conditions for cockroaches, termites, and rodents. Our licensed technicians provide fast, guaranteed pest control across all Pretoria suburbs.',
        localPests: [
            { _key: 'p1', name: 'German Cockroaches', description: 'Pretoria\'s warm climate fuels year-round cockroach infestations, especially in kitchens and bathrooms.', icon: 'bug' },
            { _key: 'p2', name: 'Subterranean Termites', description: 'The clay-heavy soils of Pretoria East and Centurion are highly prone to subterranean termite activity.', icon: 'bug' },
            { _key: 'p3', name: 'Roof Rats', description: 'Pretoria\'s mature tree canopy and older roof spaces provide nesting habitat for roof rats.', icon: 'bug' },
            { _key: 'p4', name: 'Bed Bugs', description: 'Guest houses and residential complexes in Hatfield and Sunnyside see frequent bed bug introductions.', icon: 'bug' },
        ],
        whyLocal: {
            title: 'Why Pretoria Needs Professional Pest Control',
            body: [
                { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Pretoria\'s subtropical climate, with hot, wet summers and mild, dry winters, creates a pest-friendly environment year-round. The city\'s mix of established residential suburbs, commercial centres, and lush gardens provides ideal habitats for a wide range of pests.' }] },
                { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'From termite damage in older homes across Waterkloof and Lynnwood, to rodent problems in CBD warehouses, Pretoria requires proactive pest management. Our team knows every suburb and tailors treatments to local conditions.' }] },
            ],
        },
        serviceHighlights: [
            { _key: 'h1', icon: 'clock', title: 'Same-Day Service in Pretoria', description: 'We\'re based in Gauteng with technicians across Pretoria — most services are same-day.' },
            { _key: 'h2', icon: 'shield', title: 'SABS-Approved Treatments', description: 'All chemicals are SABS-approved and safe for families, pets, and the environment.' },
            { _key: 'h3', icon: 'certificate', title: 'Licensed & Insured', description: 'Fully licensed by the Department of Agriculture with comprehensive liability insurance.' },
            { _key: 'h4', icon: 'map-location', title: 'All Pretoria Suburbs', description: 'Waterkloof, Hatfield, Arcadia, Menlo Park, Lynnwood, Faerie Glen, and more.' },
        ],
        ctaHeading: 'Ready to Solve Your Pest Problem in Pretoria?',
        ctaDescription: 'Get fast, professional pest control in Pretoria. Our licensed technicians respond within 1 hour with guaranteed results.',
        seo: {
            metaTitle: 'Pest Control Pretoria | Licensed Experts | Same-Day Service',
            metaDesc: 'Professional pest control in Pretoria. Cockroaches, termites, rats & more. Licensed, insured, guaranteed. Call now for same-day service across all Pretoria suburbs.',
        },
    },
    {
        title: 'Centurion',
        slug: 'centurion',
        isHub: true,
        description: 'Expert pest control in Centurion. Residential & commercial. Licensed technicians with guaranteed results.',
        heroSubheading: 'Centurion\'s rapid residential growth means new builds and estates are vulnerable to termite and ant infestations. Our experts serve every Centurion estate with fast, guaranteed pest solutions.',
        localPests: [
            { _key: 'p1', name: 'Harvester Termites', description: 'New developments in Centurion disturb termite colonies, pushing them into homes and gardens.', icon: 'bug' },
            { _key: 'p2', name: 'Sugar Ants', description: 'Centurion\'s many residential estates experience persistent sugar ant invasions, especially in summer.', icon: 'bug' },
            { _key: 'p3', name: 'Fleas & Ticks', description: 'Pet-friendly estates and grassy common areas create ideal conditions for fleas and ticks.', icon: 'bug' },
            { _key: 'p4', name: 'Wasps', description: 'Paper wasps build nests under eaves and in garden structures across Centurion suburbs.', icon: 'bug' },
        ],
        whyLocal: {
            title: 'Why Centurion Needs Professional Pest Control',
            body: [
                { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Centurion has experienced massive residential development over the past decade, with new estates like Midstream, Irene, and The Reeds expanding rapidly. This construction disturbs established termite colonies and creates new entry points for pests.' }] },
                { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'The area\'s proximity to wetlands and green belts also increases mosquito and tick activity. Our Centurion-based technicians understand these local dynamics and provide targeted, lasting treatments.' }] },
            ],
        },
        serviceHighlights: [
            { _key: 'h1', icon: 'clock', title: 'Rapid Response in Centurion', description: 'Technicians deployed across Centurion for fast, same-day service.' },
            { _key: 'h2', icon: 'home', title: 'Estate & Complex Specialists', description: 'Experience with body corporates, sectional title, and estate management.' },
            { _key: 'h3', icon: 'shield', title: 'Child & Pet Safe', description: 'Eco-friendly, low-toxicity treatments safe for families and pets.' },
            { _key: 'h4', icon: 'map-location', title: 'All Centurion Estates', description: 'Midstream, Irene, The Reeds, Eldoraigne, Wierdapark, and surrounds.' },
        ],
        ctaHeading: 'Need Pest Control in Centurion?',
        ctaDescription: 'Get a free quote for professional pest control in Centurion. Same-day service available across all estates.',
        seo: {
            metaTitle: 'Pest Control Centurion | Estate Specialists | Same-Day Service',
            metaDesc: 'Professional pest control in Centurion. Termites, ants, rodents & more. Serving Midstream, Irene, The Reeds. Licensed & guaranteed.',
        },
    },
    {
        title: 'Midrand',
        slug: 'midrand',
        isHub: true,
        description: 'Professional pest control in Midrand. Commercial and residential experts. Fast response, guaranteed results.',
        heroSubheading: 'Midrand\'s mix of office parks, logistics hubs, and residential estates demands versatile pest control. We serve both commercial premises and homes across Midrand.',
        localPests: [
            { _key: 'p1', name: 'American Cockroaches', description: 'Midrand\'s commercial kitchens and restaurants are hotspots for American cockroach infestations.', icon: 'bug' },
            { _key: 'p2', name: 'Mice', description: 'Office parks and warehouses in Midrand attract mice seeking shelter and food sources.', icon: 'bug' },
            { _key: 'p3', name: 'Pigeons', description: 'Commercial buildings and signage structures across Midrand suffer from pigeon roosting.', icon: 'bug' },
            { _key: 'p4', name: 'Stored Product Pests', description: 'Logistics facilities in Midrand experience weevils and beetles in stored goods.', icon: 'bug' },
        ],
        whyLocal: {
            title: 'Why Midrand Needs Professional Pest Control',
            body: [
                { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Midrand sits at the crossroads of Pretoria and Johannesburg, making it a major commercial and logistics hub. The high density of restaurants, office parks, and warehouses creates unique pest challenges that require commercial-grade solutions.' }] },
                { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Residential estates like Carlswald, Vorna Valley, and Grand Central also face pest pressure from surrounding open veld. Our team provides tailored solutions for both commercial compliance and residential comfort.' }] },
            ],
        },
        serviceHighlights: [
            { _key: 'h1', icon: 'building', title: 'Commercial Compliance', description: 'HACCP-compliant pest management for food premises and warehouses.' },
            { _key: 'h2', icon: 'clock', title: 'Minimal Business Disruption', description: 'Flexible scheduling including after-hours and weekend treatments.' },
            { _key: 'h3', icon: 'file-contract', title: 'Contract & Once-Off', description: 'Monthly contracts for businesses or once-off treatments for homes.' },
            { _key: 'h4', icon: 'map-location', title: 'Full Midrand Coverage', description: 'Carlswald, Vorna Valley, Halfway House, Grand Central, and more.' },
        ],
        ctaHeading: 'Pest Problems in Midrand?',
        ctaDescription: 'Commercial or residential — get fast, compliant pest control in Midrand. Free quotes within 1 hour.',
        seo: {
            metaTitle: 'Pest Control Midrand | Commercial & Residential | Licensed Experts',
            metaDesc: 'Professional pest control in Midrand. HACCP-compliant commercial solutions and residential treatments. Cockroaches, rats, termites. Call now.',
        },
    },
    {
        title: 'Johannesburg South',
        slug: 'johannesburg-south',
        isHub: true,
        description: 'Reliable pest control in Johannesburg South. Fast response across all southern suburbs. Licensed and guaranteed.',
        heroSubheading: 'From Alberton to Glenvista, Johannesburg South\'s residential suburbs and shopping centres need reliable pest protection. Our team delivers fast, effective treatments across the southern corridor.',
        localPests: [
            { _key: 'p1', name: 'Cockroaches', description: 'Older homes in Alberton and Bassonia are prone to German and American cockroach infestations.', icon: 'bug' },
            { _key: 'p2', name: 'Rats & Mice', description: 'Shopping centres and restaurants along the N12 corridor attract rodent populations.', icon: 'bug' },
            { _key: 'p3', name: 'Mosquitoes', description: 'Proximity to vleis and wetlands in the south increases mosquito breeding during summer.', icon: 'bug' },
            { _key: 'p4', name: 'Carpet Beetles', description: 'Older furnished homes in established suburbs experience carpet beetle damage.', icon: 'bug' },
        ],
        whyLocal: {
            title: 'Why Johannesburg South Needs Professional Pest Control',
            body: [
                { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Johannesburg South encompasses established suburbs like Alberton, Glenvista, Meyersdal, and Brackendowns. These areas feature older homes with established gardens — ideal conditions for termites, rodents, and various crawling insects.' }] },
                { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'The commercial activity along major routes and shopping centres adds cockroach and rodent pressure. Our team provides comprehensive pest management tailored to southern Johannesburg\'s unique residential and commercial mix.' }] },
            ],
        },
        serviceHighlights: [
            { _key: 'h1', icon: 'clock', title: 'Fast Response in JHB South', description: 'Technicians based in the area for rapid same-day service.' },
            { _key: 'h2', icon: 'shield', title: 'Eco-Friendly Solutions', description: 'Low-impact treatments that protect your family and garden.' },
            { _key: 'h3', icon: 'certificate', title: 'Written Guarantee', description: 'All treatments come with a service guarantee for your peace of mind.' },
            { _key: 'h4', icon: 'map-location', title: 'Full Southern Coverage', description: 'Alberton, Glenvista, Meyersdal, Brackendowns, Bassonia, and more.' },
        ],
        ctaHeading: 'Need Pest Control in Johannesburg South?',
        ctaDescription: 'Fast, reliable pest control across all southern Johannesburg suburbs. Get your free quote today.',
        seo: {
            metaTitle: 'Pest Control Johannesburg South | Alberton & Surrounds | Licensed',
            metaDesc: 'Pest control in Johannesburg South. Cockroaches, rats, termites, mosquitoes. Serving Alberton, Glenvista, Meyersdal. Licensed & guaranteed.',
        },
    },
    {
        title: 'Sandton',
        slug: 'sandton',
        isHub: true,
        description: 'Premium pest control in Sandton. Discreet, professional service for upmarket homes and commercial properties.',
        heroSubheading: 'Sandton\'s premium homes, office towers, and restaurants demand discreet, thorough pest control. We deliver executive-level service with guaranteed results across Sandton.',
        localPests: [
            { _key: 'p1', name: 'Rodents', description: 'Construction activity and restaurant density in Sandton CBD attract rats and mice.', icon: 'bug' },
            { _key: 'p2', name: 'Cockroaches', description: 'High-rise buildings and restaurant kitchens in Sandton require ongoing cockroach control.', icon: 'bug' },
            { _key: 'p3', name: 'Bed Bugs', description: 'Hotels and guest houses in the Sandton hospitality district are vulnerable to bed bug introductions.', icon: 'bug' },
            { _key: 'p4', name: 'Termites', description: 'Established gardens and mature trees in Sandhurst and Hyde Park harbour termite colonies.', icon: 'bug' },
        ],
        whyLocal: {
            title: 'Why Sandton Needs Professional Pest Control',
            body: [
                { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Sandton is South Africa\'s financial capital, home to premium office towers, five-star hotels, and some of Gauteng\'s most valuable residential properties. Pest infestations in this environment demand immediate, discreet, and thorough treatment.' }] },
                { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'From rodent issues in busy restaurant precincts like Nelson Mandela Square, to termite threats in garden estates in Bryanston, Sandton requires a pest control partner who understands the premium expectations of the area.' }] },
            ],
        },
        serviceHighlights: [
            { _key: 'h1', icon: 'star', title: 'Premium Discreet Service', description: 'Unmarked vehicles and professional technicians for complete discretion.' },
            { _key: 'h2', icon: 'building', title: 'High-Rise Specialists', description: 'Experience in office towers, hotels, and multi-storey commercial buildings.' },
            { _key: 'h3', icon: 'clock', title: 'After-Hours Available', description: 'Flexible scheduling to avoid disruption to business operations.' },
            { _key: 'h4', icon: 'map-location', title: 'Greater Sandton', description: 'Sandhurst, Hyde Park, Bryanston, Morningside, Rivonia, and surrounds.' },
        ],
        ctaHeading: 'Premium Pest Control in Sandton',
        ctaDescription: 'Discreet, professional pest management for Sandton\'s homes and businesses. Contact us for priority service.',
        seo: {
            metaTitle: 'Pest Control Sandton | Premium Service | Discreet & Licensed',
            metaDesc: 'Premium pest control in Sandton. Rodents, cockroaches, bed bugs, termites. Discreet service for homes, offices, and hospitality. Licensed & guaranteed.',
        },
    },
    {
        title: 'Randburg',
        slug: 'randburg',
        isHub: true,
        description: 'Affordable pest control in Randburg. Licensed experts serving all Randburg suburbs. Fast response guaranteed.',
        heroSubheading: 'Randburg\'s diverse mix of residential suburbs, townhouse complexes, and commercial centres requires versatile pest control. We provide affordable, effective treatments across all of Randburg.',
        localPests: [
            { _key: 'p1', name: 'German Cockroaches', description: 'High-density townhouse complexes in Randburg are prone to cockroach spread between units.', icon: 'bug' },
            { _key: 'p2', name: 'Rats', description: 'Commercial areas along Republic Road and Randburg CBD attract rat populations.', icon: 'bug' },
            { _key: 'p3', name: 'Ants', description: 'Garden ants and black ants invade homes across Randburg suburbs during summer rains.', icon: 'bug' },
            { _key: 'p4', name: 'Silverfish', description: 'Older homes in Ferndale and Blairgowrie experience silverfish in storerooms and garages.', icon: 'bug' },
        ],
        whyLocal: {
            title: 'Why Randburg Needs Professional Pest Control',
            body: [
                { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Randburg is one of Johannesburg\'s most densely populated areas, with a mix of freestanding houses, townhouse complexes, and commercial buildings. This density means pests can spread quickly between neighbouring properties if not treated promptly.' }] },
                { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Our Randburg team specialises in complex and body corporate treatments, ensuring coordinated pest management that eliminates infestations at the source rather than just treating individual units.' }] },
            ],
        },
        serviceHighlights: [
            { _key: 'h1', icon: 'tag', title: 'Affordable Pricing', description: 'Competitive rates without compromising on quality or safety.' },
            { _key: 'h2', icon: 'home', title: 'Complex & Body Corporate', description: 'Coordinated treatments for townhouse and apartment complexes.' },
            { _key: 'h3', icon: 'clock', title: 'Same-Day Service', description: 'Emergency and same-day services available across Randburg.' },
            { _key: 'h4', icon: 'map-location', title: 'All Randburg Suburbs', description: 'Ferndale, Blairgowrie, Northcliff, Fairlands, Kensington B, and more.' },
        ],
        ctaHeading: 'Affordable Pest Control in Randburg',
        ctaDescription: 'Quality pest control at competitive prices. Serving all Randburg suburbs with same-day service available.',
        seo: {
            metaTitle: 'Pest Control Randburg | Affordable & Licensed | Same-Day Service',
            metaDesc: 'Affordable pest control in Randburg. Cockroaches, rats, ants, silverfish. Serving Ferndale, Blairgowrie, Northcliff. Licensed & guaranteed.',
        },
    },
    {
        title: 'Roodepoort',
        slug: 'roodepoort',
        isHub: true,
        description: 'Professional pest control in Roodepoort. Serving homes and businesses across the West Rand. Licensed and guaranteed.',
        heroSubheading: 'Roodepoort\'s proximity to mine dumps and open veld creates unique pest challenges. Our West Rand team provides specialised treatments for homes and businesses across all Roodepoort suburbs.',
        localPests: [
            { _key: 'p1', name: 'Termites', description: 'Disturbed soils near old mine dumps increase termite activity across Roodepoort.', icon: 'bug' },
            { _key: 'p2', name: 'Field Mice', description: 'Open veld bordering residential areas pushes field mice into homes during winter.', icon: 'bug' },
            { _key: 'p3', name: 'Spiders', description: 'Rain spiders and sac spiders are common in Roodepoort homes adjacent to natural areas.', icon: 'bug' },
            { _key: 'p4', name: 'Wasps & Bees', description: 'Open spaces and gardens in Wilropark and Florida attract wasp and bee colonies.', icon: 'bug' },
        ],
        whyLocal: {
            title: 'Why Roodepoort Needs Professional Pest Control',
            body: [
                { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Roodepoort and the broader West Rand have a unique pest profile shaped by the area\'s mining history. Disturbed soils and mine dumps create favourable conditions for termites, while the open veld bordering suburbs pushes field mice and spiders into homes.' }] },
                { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Whether you\'re in an estate in Ruimsig, a townhouse in Wilropark, or a commercial premises in Florida, our technicians have the local knowledge and tools to eliminate pests quickly and effectively.' }] },
            ],
        },
        serviceHighlights: [
            { _key: 'h1', icon: 'map-location', title: 'West Rand Specialists', description: 'Local team with deep knowledge of Roodepoort\'s unique pest challenges.' },
            { _key: 'h2', icon: 'shield', title: 'Safe Treatments', description: 'Family and pet-safe products with minimal environmental impact.' },
            { _key: 'h3', icon: 'certificate', title: 'Service Guarantee', description: 'Every treatment backed by our written satisfaction guarantee.' },
            { _key: 'h4', icon: 'clock', title: 'Fast Response', description: 'Same-day service across Roodepoort, Ruimsig, Florida, and Wilropark.' },
        ],
        ctaHeading: 'Pest Control Experts in Roodepoort',
        ctaDescription: 'Professional pest management for the West Rand. Get your free, no-obligation quote today.',
        seo: {
            metaTitle: 'Pest Control Roodepoort | West Rand Experts | Licensed & Guaranteed',
            metaDesc: 'Pest control in Roodepoort. Termites, mice, spiders, wasps. Serving Ruimsig, Wilropark, Florida. Licensed, insured, guaranteed results.',
        },
    },
];

async function seed() {
    console.log('🌱 Seeding 7 service area documents into Sanity...\n');

    for (const area of areas) {
        const doc = {
            _type: 'serviceArea',
            _id: `area-${area.slug}`,
            title: area.title,
            slug: { _type: 'slug', current: area.slug },
            isHub: area.isHub,
            description: area.description,
            heroSubheading: area.heroSubheading,
            localPests: area.localPests,
            whyLocal: area.whyLocal,
            serviceHighlights: area.serviceHighlights,
            ctaHeading: area.ctaHeading,
            ctaDescription: area.ctaDescription,
            seo: area.seo,
        };

        try {
            const result = await client.createOrReplace(doc);
            console.log(`  ✅ ${area.title} (${result._id})`);
        } catch (err) {
            console.error(`  ❌ ${area.title}: ${err.message}`);
        }
    }

    console.log('\n✅ Seeding complete!');
}

seed();
