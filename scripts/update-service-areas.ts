import { defineCliConfig } from 'sanity/cli'

// Enhanced, hyper-local content for the 5 service areas
const areaUpdates = [
    {
        slug: 'lynnwood',
        data: {
            description: 'Premium pest control for Lynnwood\'s established homes and gardens.',
            heroSubheading: 'Protecting properties in Lynnwood, Lynnwood Manor, and surrounds. Safe for pets and gardens.',
            whyLocal: {
                title: 'Why Lynnwood Needs Professional Pest Control',
                body: [
                    {
                        style: 'normal',
                        _type: 'block',
                        children: [{ _type: 'span', text: 'Lynnwood is one of Pretoria\'s oldest and most leafy suburbs. The established gardens and older foundations create ideal conditions for subterranean termites and ants. Our treatments are designed to protect these heritage properties and lush gardens without disrupting the local ecosystem.' }]
                    }
                ]
            },
            localPests: [
                { name: 'Subterranean Termites', description: 'Attack older hardwood floors and roof trusses.', icon: 'mound' },
                { name: 'Garden Ants', description: 'Large colonies that undermine paving and enter kitchens.', icon: 'bug' },
                { name: 'Parktown Prawns', description: 'Common in lush gardens during rainy seasons.', icon: 'locust' }
            ],
            serviceHighlights: [
                { title: 'Garden Safe', description: 'Treatments that won\'t harm your plants.', icon: 'leaf' },
                { title: 'Termite Drills', description: 'Specialized soil poisoning for older homes.', icon: 'shield-halved' },
                { title: 'Pet Friendly', description: 'Safe for your dogs and cats.', icon: 'paw' }
            ],
            ctaHeading: 'Protect Your Lynnwood Home',
            ctaDescription: 'Get a free, no-obligation quote today.',
            seo: {
                metaTitle: 'Pest Control Lynnwood | Termite & Ant Specialists | Pest Experts',
                metaDesc: 'Expert pest control in Lynnwood. Specialists in termites, ants, and garden pests. Pet-safe treatments for established homes. Call now.'
            }
        }
    },
    {
        slug: 'lynnwood-glen',
        data: {
            description: 'Secure, discreet pest control for Lynnwood Glen estates.',
            heroSubheading: 'Approved pest management for Struben Dam area and gated communities.',
            whyLocal: {
                title: 'Pest Challenges in Lynnwood Glen',
                body: [
                    {
                        style: 'normal',
                        _type: 'block',
                        children: [{ _type: 'span', text: 'Lynnwood Glen\'s proximity to the Struben Dam and the Moreleta Spruit brings unique pest challenges, including mosquitoes and rodents. Living in a security estate also requires discreet, compliant service. We offer unmarked vehicles and scheduled maintenance that adheres to all HOA and Body Corporate rules.' }]
                    }
                ]
            },
            localPests: [
                { name: 'Mosquitoes', description: 'High activity near the dam and spruit.', icon: 'mosquito' },
                { name: 'Rodents', description: 'Rats competing for shelter in roof voids.', icon: 'otter' },
                { name: 'Cockroaches', description: 'Found in drains and municipal lines.', icon: 'bug' }
            ],
            serviceHighlights: [
                { title: 'Estate Compliant', description: 'HOA approved contractor.', icon: 'building-shield' },
                { title: 'Discreet Fleet', description: 'Unmarked vehicles on request.', icon: 'user-secret' },
                { title: 'Monthly Plans', description: 'Preventative maintenance.', icon: 'calendar-check' }
            ],
            ctaHeading: 'Secure Your Home in Lynnwood Glen',
            ctaDescription: 'Discreet, effective pest control for estate living.',
            seo: {
                metaTitle: 'Pest Control Lynnwood Glen | Estate Specialists | Pest Experts',
                metaDesc: 'Trusted pest control in Lynnwood Glen. Estate-approved services for ants, rodents, and mosquitoes. Discreet and professional. Book now.'
            }
        }
    },
    {
        slug: 'menlo-park',
        data: {
            description: 'Heritage home specialists in Menlo Park.',
            heroSubheading: 'Protecting wooden floors and antique structures from borers and termites.',
            whyLocal: {
                title: 'Preserving Menlo Park\'s Heritage',
                body: [
                    {
                        style: 'normal',
                        _type: 'block',
                        children: [{ _type: 'span', text: 'Menlo Park is famous for its classic architecture and vibrant "The Village" restaurant scene. The older homes with suspended wooden floors are prime targets for wood-boring beetles and termites. We specialize in fumigation and wood preservation to keep these structures standing strong.' }]
                    }
                ]
            },
            localPests: [
                { name: 'Wood Borer Beetles', description: 'The silent destroyers of antique wood.', icon: 'bug' },
                { name: 'Rodents', description: 'Seek warmth in older ceiling voids.', icon: 'otter' },
                { name: 'Cockroaches', description: 'Migrate from nearby restaurant hubs.', icon: 'spider' }
            ],
            serviceHighlights: [
                { title: 'Wood Certified', description: 'Entomologist clearance certificates.', icon: 'certificate' },
                { title: 'Restaurant Safe', description: 'HACCP solutions for local eateries.', icon: 'utensils' },
                { title: 'Structural Care', description: 'Drill-and-inject preservation.', icon: 'house-chimney' }
            ],
            ctaHeading: 'Preserve Your Menlo Park Property',
            ctaDescription: 'Get a free quote for comprehensive wood-destroying organism treatment.',
            seo: {
                metaTitle: 'Pest Control Menlo Park | Borer & Termite Experts | Pest Experts',
                metaDesc: 'Specialist pest control in Menlo Park. Wood borer beetles, termites, and restaurant solutions. protect your heritage home. Contact us.'
            }
        }
    },
    {
        slug: 'moreleta-park',
        data: {
            description: 'Townhouse and complex pest specialists in Moreleta Park.',
            heroSubheading: 'Affordable group rates for complexes and reliable home protection.',
            whyLocal: {
                title: 'Complex Living & Nature Reserves',
                body: [
                    {
                        style: 'normal',
                        _type: 'block',
                        children: [{ _type: 'span', text: 'Moreleta Park balances high-density complex living with nature, neighboring the Moreleta Kloof Nature Reserve. This mix brings "Parktown Prawns", scorpions, and ants into homes. Our gel baits and eco-friendly sprays are perfect for complexes where pet safety and neighbor considerations are paramount.' }]
                    }
                ]
            },
            localPests: [
                { name: 'Parktown Prawns', description: 'Large, jumping crickets from the reserve.', icon: 'locust' },
                { name: 'Ants', description: 'Invading kitchens in search of water.', icon: 'bug' },
                { name: 'Scorpions', description: 'Occasionally found near rocky gardens.', icon: 'spider' }
            ],
            serviceHighlights: [
                { title: 'Complex Rates', description: 'Discounted bulk services.', icon: 'users' },
                { title: 'Child Safe', description: 'Non-toxic treatments.', icon: 'child-reaching' },
                { title: 'Reserve Friendly', description: 'Eco-conscious products.', icon: 'tree' }
            ],
            ctaHeading: 'Pest-Free Living in Moreleta Park',
            ctaDescription: 'Get a quote for your unit or the whole complex.',
            seo: {
                metaTitle: 'Pest Control Moreleta Park | Complex Specialists | Pest Experts',
                metaDesc: 'Reliable pest control in Moreleta Park. Specialists in townhouse and estate pest management. Ants, Parktown prawns, and more. Group rates available.'
            }
        }
    },
    {
        slug: 'silverton',
        data: {
            description: 'Industrial and residential pest control in Silverton.',
            heroSubheading: 'HACCP standards for Silvertondale industry and safe homes for residents.',
            whyLocal: {
                title: 'Industrial Strength Solutions for Silverton',
                body: [
                    {
                        style: 'normal',
                        _type: 'block',
                        children: [{ _type: 'span', text: 'Silverton is the engine room of Pretoria\'s specialized industry, from automotive to logistics. This activity can attract resilient pests like German cockroaches and rodents. Our industrial team offers HACCP-compliant systems for businesses, while our residential team keeps Silverton homes safe from spillover pests.' }]
                    }
                ]
            },
            localPests: [
                { name: 'German Cockroaches', description: 'High resistance populations in industry.', icon: 'bug' },
                { name: 'Rodents', description: 'Rats damaging wiring and stock.', icon: 'otter' },
                { name: 'Stored Product Insects', description: 'Weevils in food storage areas.', icon: 'wheat' }
            ],
            serviceHighlights: [
                { title: 'HACCP Audit', description: 'Full documentation provided.', icon: 'clipboard-check' },
                { title: 'Industrial Grade', description: 'Heavy-duty bait stations.', icon: 'industry' },
                { title: '24/7 Service', description: 'After-hours treatment available.', icon: 'clock' }
            ],
            ctaHeading: 'Silverton Pest Control Experts',
            ctaDescription: 'Commercial and residential quotes available immediately.',
            seo: {
                metaTitle: 'Pest Control Silverton | Industrial & Residential | Pest Experts',
                metaDesc: 'Expert pest control in Silverton. HACCP-compliant experts for businesses and safe home treatments. Cockroaches, rats, and more. Call now.'
            }
        }
    }
];

export default async function updateServiceAreas(context: any) {
    const { getClient } = context;
    const client = getClient({ apiVersion: '2024-02-19' });

    console.log('🐜 Starting Enhanced Service Area Content Update...');

    for (const update of areaUpdates) {
        const { slug, data } = update;
        console.log(`Processing ${slug}...`);

        // Fetch ALL documents with this slug (published AND drafts)
        const docs = await client.fetch(`*[_type == "serviceArea" && slug.current == "${slug}"]`);

        if (docs.length === 0) {
            console.warn(`⚠️  Warning: No serviceArea found for slug "${slug}". Skipping.`);
            continue;
        }

        // Patch every version found (drafts and published)
        for (const doc of docs) {
            try {
                await client
                    .patch(doc._id)
                    .set(data)
                    .commit();
                console.log(`✅ Updated ${slug} (${doc._id})`);
            } catch (err) {
                console.error(`❌ Error updating ${slug} (${doc._id}):`, err.message);
            }
        }
    }

    console.log('🎉 Update Complete! Please run "npx sanity deploy" to push schema changes if you haven\'t.');
}
