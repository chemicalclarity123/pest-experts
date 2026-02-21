import { defineCliConfig } from 'sanity/cli'

const serviceUpdates = [
    {
        slug: 'ant-control-solutions',
        title: 'Ant Control',
        data: {
            introHeadline: 'Professional Ant Control Solutions in Gauteng',
            introShortDescription: 'Stop ant trails at the source with targeted baiting and colony eradication.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Ant infestations are a common problem across Gauteng, particularly during warmer months when ants actively search for food and moisture. Once established, they can spread rapidly through kitchens, bathrooms, offices, and outdoor areas. Our ant control solutions deliver effective treatment for properties in Pretoria, Centurion, Midrand, Johannesburg South, Sandton, Randburg, and Roodepoort.' }]
                },
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Since starting our business in 2004, we have built extensive local knowledge of ant species behaviour, nesting habits, and seasonal activity patterns. Ants are more than a nuisance as they contaminate food surfaces, disrupt daily activities, and can be difficult to eliminate without professional intervention. Many infestations persist because treatments only target visible ants rather than the colony itself.' }]
                },
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Our approach focuses on identifying nesting locations, entry points, and foraging trails. Treatments are designed to eliminate colonies while disrupting breeding cycles and food sources. Solutions are tailored to the property, whether residential, commercial, or mixed-use, ensuring targeted control rather than short term relief.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Queen Eradication', description: 'We target the queen using advanced transfer baits.', icon: 'crosshairs' },
                { title: 'Safe for Kitchens', description: 'HACCP-compliant gel baits safe near food preparation.', icon: 'utensils' },
                { title: 'Perimeter Defense', description: 'Exterior barrier sprays to prevent re-entry.', icon: 'shield-halved' },
                { title: 'Paving Protection', description: 'Specialized treatments for ants destroying driveway sand.', icon: 'road' },
                { title: 'Pet Friendly', description: 'Non-toxic, low-odor methods safe for cats and dogs.', icon: 'paw' },
                { title: 'Long-term Tracking', description: 'We monitor nesting habits to prevent seasonal returns.', icon: 'magnifying-glass' }
            ]
        }
    },
    {
        slug: 'commercial-pest-control-solutions',
        title: 'Commercial Pest Control',
        data: {
            introHeadline: 'Commercial Pest Control Solutions',
            introShortDescription: 'Comprehensive, proactive pest management tailored specifically for businesses and commercial facilities.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Protecting your commercial property requires a robust, proactive approach. A single pest sighting can damage your reputation, impact employee morale, and lead to health code violations. We provide comprehensive pest management tailored to the unique operational demands of businesses across Gauteng.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Discreet Service', description: 'After-hours treatments and unmarked vehicles available.', icon: 'user-secret' },
                { title: 'Zero Downtime', description: 'Fast-acting protocols customized to your operating hours.', icon: 'clock' },
                { title: 'Regulatory Compliance', description: 'Full documentation and logbooks provided for health inspections.', icon: 'file-contract' },
                { title: 'Dedicated Managers', description: 'Direct access to a commercial account manager.', icon: 'user-tie' },
                { title: 'Multi-Site Programs', description: 'Standardized pest control across all your locations.', icon: 'building' },
                { title: 'Staff Training', description: 'We educate your team on early pest detection protocols.', icon: 'chalkboard-user' }
            ]
        }
    },
    {
        slug: 'termite-control-soil-poisoning',
        title: 'Termite Control & Soil Poisoning',
        data: {
            introHeadline: 'Termite Expert Extermination & Prevention',
            introShortDescription: 'Protect your property’s foundation with deep soil poisoning and drill-and-inject treatments.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Subterranean termites cause millions in structural damage annually. By the time they are visible in your skirting boards or roof trusses, the colony is already deeply entrenched. We specialize in both curative eradication and preventative soil poisoning for pre-construction.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Drill & Inject', description: 'Targeted sub-slab injection for active termite colonies.', icon: 'syringe' },
                { title: 'Pre-Construction', description: 'SABS approved soil poisoning for new foundations.', icon: 'trowel-bricks' },
                { title: 'Wood Borer Clearance', description: 'Official entomologist clearance certificates for property sales.', icon: 'certificate' },
                { title: 'Long-term Guarantee', description: 'Extended warranties on preventative structural treatments.', icon: 'shield' },
                { title: 'Advanced Termiticides', description: 'Non-repellent chemicals that infect the entire colony.', icon: 'flask' },
                { title: 'Foundation Inspections', description: 'Thorough structural risk assessments using thermal imaging.', icon: 'house-chimney' }
            ]
        }
    },
    {
        slug: 'rodent-control-bait-station-management',
        title: 'Rodent Control & Bait Station Management',
        data: {
            introHeadline: 'Advanced Rodent Control & Elimination',
            introShortDescription: 'Secure your premises against rats and mice with tamper-proof bait stations and exclusion techniques.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Rodents pose serious health risks by contaminating surfaces and can cause devastating electrical fires by chewing through wiring. We implement strategic baiting and trapping programs that prioritize safety, sanitation, and swift population collapse.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Tamper-Proof Stations', description: 'Lockable bait stations safe around children and pets.', icon: 'lock' },
                { title: 'Secondary Poisoning Safe', description: 'Modern rodenticides that minimize risk to owls and cats.', icon: 'feather' },
                { title: 'Exclusion Sealing', description: 'Identifying and blocking rodent entry points in roofs.', icon: 'hammer' },
                { title: 'Odor Control', description: 'Treatments to neutralize dead rodent odors in ceiling voids.', icon: 'wind' },
                { title: 'Monthly Maintenance', description: 'Regular restocking and monitoring of bait stations.', icon: 'calendar-check' },
                { title: 'Electronic Traps', description: 'Non-toxic electrocution options for sensitive environments.', icon: 'bolt' }
            ]
        }
    },
    {
        slug: 'cockroach-extermination',
        title: 'Cockroach Extermination',
        data: {
            introHeadline: 'Total Cockroach Eradication Services',
            introShortDescription: 'Break the cockroach breeding cycle rapidly with hormonal growth regulators and premium baiting.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'German and American cockroaches are notoriously difficult to eliminate due to their rapid reproduction rates and resistance to store-bought sprays. Our approach attacks roaches at every life stage, neutralizing adults and preventing nymphs from maturing.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Growth Regulators', description: 'Sterilizing juvenile roaches to stop future generations.', icon: 'ban' },
                { title: 'Crack & Crevice Gel', description: 'Precise application in appliances and hinges.', icon: 'spray-can' },
                { title: 'Flushing Agents', description: 'Driving roaches out of deep harbourage areas.', icon: 'wind' },
                { title: 'Appliance Safe', description: 'Treatments tailored to protect your fridge and dishwasher motors.', icon: 'plug' },
                { title: 'Zero Spray Odor', description: 'Low-toxicity gels that allow you to stay in the home.', icon: 'house' },
                { title: 'Sewer Line Defense', description: 'Targeting American cockroaches migrating through drains.', icon: 'water' }
            ]
        }
    },
    {
        slug: 'bed-bug-treatments',
        title: 'Bed Bug Treatments',
        data: {
            introHeadline: 'Complete Bed Bug Elimination',
            introShortDescription: 'Restore your peace of mind with intensive, multi-phase bed bug eradication programs.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Bed bugs are the ultimate hitchhikers and can spread rapidly through a property. A successful eradication requires painstaking attention to detail and multiple residual applications to ensure every egg and nymph is destroyed.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Multi-Phase protocol', description: '3-stage visits to break the complex egg hatching cycle.', icon: 'rotate' },
                { title: 'Deep Residual Sprays', description: 'Treating mattresses, headboards, and skirting boards.', icon: 'bed' },
                { title: 'Mattress Encasements', description: 'Providing certified bed bug proof mattress covers.', icon: 'shield-virus' },
                { title: 'Travel Safe Advice', description: 'Guiding you on how to prevent re-infestation after travel.', icon: 'plane' },
                { title: 'Hotel Fast Response', description: 'Rapid room-turnaround protocols for hospitality clients.', icon: 'hotel' },
                { title: 'Discreet Vehicles', description: 'Unmarked vans to protect your establishment\'s reputation.', icon: 'user-secret' }
            ]
        }
    },
    {
        slug: 'restaurant-food-premises-pest-control',
        title: 'Restaurant & Food Premises',
        data: {
            introHeadline: 'HACCP-Compliant Pest Control for Restaurants',
            introShortDescription: 'Safeguard your food handling licenses and customer reputation with zero-tolerance pest management.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Food preparation environments face relentless pressure from cockroaches, rodents, and flying insects. We specialize in audit-ready, HACCP-compliant pest programs designed to meet the strictest food safety standards in South Africa.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Audit Ready Files', description: 'Comprehensive site manuals updated after every visit.', icon: 'folder-open' },
                { title: 'Fly Control Units', description: 'Installation and servicing of UV fly capture systems.', icon: 'lightbulb' },
                { title: 'Night Services', description: 'Treatments conducted outside of your trading hours.', icon: 'moon' },
                { title: 'Drain Management', description: 'Bio-enzymatic foam treatments for fruit flies.', icon: 'sink' },
                { title: 'HACCP Certified', description: 'Methods complying with all food inspectorate standards.', icon: 'certificate' },
                { title: 'Staff Briefings', description: 'Training your kitchen staff on pest awareness protocols.', icon: 'users' }
            ]
        }
    },
    {
        slug: 'industrial-pest-management-gauteng',
        title: 'Industrial Pest Management',
        data: {
            introHeadline: 'Heavy-Duty Industrial Pest Control',
            introShortDescription: 'Protecting factories, processing plants, and manufacturing hubs from critical pest disruptions.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Industrial facilities have complex blueprints, heavy machinery, and constant foot traffic, making pest control incredibly challenging. We deploy industrial-grade interventions designed for vast square footage and specialized manufacturing environments.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Perimeter Defense', description: 'Extensive exterior tracking and baiting arrays.', icon: 'border-all' },
                { title: 'Heavy-Duty Traps', description: 'Galvanized steel stations resistant to forklifts.', icon: 'cubes' },
                { title: 'Bird Exclusion', description: 'Netting and spikes for factory rafters and loading bays.', icon: 'crow' },
                { title: 'Safety Inductions', description: 'Technicians cleared for high-risk and high-altitude work.', icon: 'hard-hat' },
                { title: 'Silo Fumigation', description: 'Gas treatments for bulk storage and raw materials.', icon: 'cloud' },
                { title: 'Compliance Reporting', description: 'Digital trend analysis and mapping for auditors.', icon: 'chart-line' }
            ]
        }
    },
    {
        slug: 'warehouse-logistics-pest-control',
        title: 'Warehouse & Logistics',
        data: {
            introHeadline: 'Logistics & Warehouse Pest Security',
            introShortDescription: 'Defending supply chains and stored products against destructive infestations.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Distribution centers and warehouses act as transit hubs for pests entering via pallets and shipments. We establish unyielding pest perimeters to ensure your stock remains uncompromised before it reaches the consumer.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Pallet Inspections', description: 'Monitoring systems for incoming wooden freight.', icon: 'pallet' },
                { title: 'Weevil Control', description: 'Stored product insect (SPI) monitoring and pheromone traps.', icon: 'bug' },
                { title: 'Rodent Perimeters', description: 'High-density baiting along exterior warehouse walls.', icon: 'shield' },
                { title: 'Fumigation Ready', description: 'Container and tarp fumigation services for exports.', icon: 'box' },
                { title: 'Loading Dock Seals', description: 'Advising on structural exclusion at dispatch doors.', icon: 'door-closed' },
                { title: 'Real-time Reporting', description: 'Digital barcode scanning for every bait station check.', icon: 'qrcode' }
            ]
        }
    },
    {
        slug: 'school-healthcare-pest-control',
        title: 'School & Healthcare',
        data: {
            introHeadline: 'Sensitive Environment Pest Control',
            introShortDescription: 'Ultra-safe, low-toxicity pest management for schools, clinics, and hospitals.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Environments catering to children and patients require a fundamentally different approach. We utilize IPM (Integrated Pest Management) techniques that rely on exclusion, sanitation, and physical trapping before considering low-impact chemical applications.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Zero Toxic Vapor', description: 'Exclusive use of odorless, non-volatile compounds.', icon: 'lungs' },
                { title: 'Weekend Operations', description: 'Servicing schools and clinics when fully vacated.', icon: 'calendar-check' },
                { title: 'Lice & Flea Care', description: 'Specialized interventions for classroom parasite outbreaks.', icon: 'virus' },
                { title: 'Sterile Field Focus', description: 'Protocols tailored for operating theaters and ICU wards.', icon: 'user-nurse' },
                { title: 'IPM Strategy', description: 'Prioritizing biological and mechanical control methods.', icon: 'leaf' },
                { title: 'Parental Transparency', description: 'Providing MDS sheets for school administration records.', icon: 'file-lines' }
            ]
        }
    },
    {
        slug: 'seasonal-pest-control',
        title: 'Seasonal Pest Control',
        data: {
            introHeadline: 'Proactive Seasonal Pest Defense',
            introShortDescription: 'Stay ahead of nature’s lifecycle with timed treatments targeting specific seasonal outbreaks.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Pest pressures change dramatically with South Africa’s seasons. From summer tick and flea explosions to winter rodent migrations indoors, our seasonal packages preemptively deal with the incoming wave before it enters your home.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Summer Wasps', description: 'Safe removal of wasp and hornet colonies from eaves.', icon: 'bug' },
                { title: 'Winter Rodents', description: 'Pre-winter roof sealing and ceiling baiting.', icon: 'snowflake' },
                { title: 'Spring Ants', description: 'Barrier sprays applied just before the first rains.', icon: 'cloud-rain' },
                { title: 'Autumn Spiders', description: 'Web sweeping and perimeter knock-down treatments.', icon: 'spider' },
                { title: 'Tick & Flea Blasts', description: 'Lawn and garden treatments during peak heat waves.', icon: 'sun' },
                { title: 'Flexible Scheduling', description: 'Automated reminders to book your seasonal barrier.', icon: 'clock' }
            ]
        }
    },
    {
        slug: 'residential-pest-control-services',
        title: 'Residential Pest Control',
        data: {
            introHeadline: 'Complete Home Protection Services',
            introShortDescription: 'Safeguard your family and property with comprehensive, family-friendly pest control.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Your home is your sanctuary. Whether you’re dealing with a sudden ant invasion, a rat in the ceiling, or general crawling insects, our technicians provide fast, courteous, and safe residential eradication services you can rely on.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Family Safe', description: 'Chemicals approved for domestic use around children.', icon: 'child' },
                { title: 'Pet Friendly', description: 'Strict protocols to protect cats, dogs, and birds.', icon: 'paw' },
                { title: 'Clean Operations', description: 'We wear shoe covers and clean up after treatments.', icon: 'broom' },
                { title: 'Same Day Service', description: 'Rapid response for emergency residential outbreaks.', icon: 'truck-fast' },
                { title: 'Inside & Out', description: 'Dual treatments covering roof voids down to garden walls.', icon: 'house-crack' },
                { title: 'Honest Advice', description: 'We explain exactly what we are doing and why.', icon: 'comment-dots' }
            ]
        }
    },
    {
        slug: 'body-corporate-estate-pest-control',
        title: 'Body Corporate & Estate',
        data: {
            introHeadline: 'HOA & Estate Pest Management',
            introShortDescription: 'Harmonized, large-scale pest solutions for secure complexes and residential estates.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Managing pests across dozens or hundreds of units requires exceptional coordination. We partner with Body Corporates and Managing Agents to deliver uniform, cost-effective pest control that adheres strictly to estate rules and resident preferences.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Bulk Discounts', description: 'Highly competitive rates for complex-wide treatments.', icon: 'tags' },
                { title: 'Common Property', description: 'Treating clubhouses, guardhouses, and refuse rooms.', icon: 'building' },
                { title: 'Resident Scheduling', description: 'We handle the logistics of booking individual unit access.', icon: 'calendar-days' },
                { title: 'HOA Compliant', description: 'Fully insured and vetted for high-security estates.', icon: 'id-card' },
                { title: 'Weed Control', description: 'Paving weed eradication alongside pest services.', icon: 'leaf' },
                { title: 'Detailed Reporting', description: 'Monthly summaries submitted to the managing agent.', icon: 'file-signature' }
            ]
        }
    },
    {
        slug: 'office-retail-pest-control',
        title: 'Office & Retail',
        data: {
            introHeadline: 'Discreet Office & Retail Pest Control',
            introShortDescription: 'Ensure a pristine environment for your staff and customers with our invisible pest defense.',
            introBodyText: [
                {
                    style: 'normal',
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Offices and retail stores face unique challenges, from employees eating at their desks to constant foot traffic through front doors. We provide discreet pest control that operates in the background, ensuring your business image remains spotless.' }]
                }
            ],
            serviceHighlights: [
                { title: 'Canteen Focus', description: 'Targeting office kitchens and break rooms directly.', icon: 'coffee' },
                { title: 'Zero Odor', description: 'Formulations that won’t trigger staff allergies or complaints.', icon: 'wind' },
                { title: 'Cable Protection', description: 'Rodent prevention in server rooms and under raised floors.', icon: 'server' },
                { title: 'Weekend Work', description: 'Treatments applied when the office is entirely empty.', icon: 'calendar' },
                { title: 'Retail Floor Safe', description: 'Careful application protecting your clothing or stock.', icon: 'shop' },
                { title: 'Discreet Traps', description: 'Sleek, hidden bait stations that blend into office decor.', icon: 'eye-slash' }
            ]
        }
    }
];

export default async function updateServiceHighlights(context: any) {
    const { getClient } = context;
    const client = getClient({ apiVersion: '2024-02-19' });

    console.log('🚀 Starting Enhanced Service Content Update...');

    for (const update of serviceUpdates) {
        const { slug, data } = update;
        console.log(`Processing ${slug}...`);

        let docs;
        try {
            docs = await client.fetch(`*[_type == "service" && slug.current == $slug]`, { slug });
        } catch (e) {
            console.error(`Failed to fetch documents for ${slug}: ${e.message}`);
            continue;
        }

        if (docs.length === 0) {
            console.warn(`⚠️  Warning: No service found for slug "${slug}".`);
            continue;
        }

        for (const doc of docs) {
            try {
                await client
                    .patch(doc._id)
                    .set(data)
                    .commit();
                console.log(`✅ Successfully updated ${slug} (${doc._id})`);
            } catch (err) {
                console.error(`❌ Error updating ${slug} (${doc._id}):`, err.message);
            }
        }
    }

    console.log('🎉 Service Highlight Update Complete! Your frontend will now show 6 custom cards per page.');
}
