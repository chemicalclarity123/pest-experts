import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import OpenAI from "openai"; // Optional: Use AI to bulk generate snippet content

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from project root
dotenv.config({ path: join(__dirname, '../.env') });

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
    console.error("❌ Missing required environment variables (PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN).");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false, // Important: use false for writes and fresh data reads
});

// A robust dictionary of high-conversion Question snippets based on commercial intent
const generateSnippetData = (type, title, priceStr) => {
    let question = "";
    let answer = "";
    let list = [];

    const safeTitle = title.trim();

    if (type === 'service') {
        const costStr = priceStr ? ` Prices typically start around R${priceStr}, depending on the severity of the infestation and property size.` : "";

        question = `What is the best ${safeTitle} in Gauteng?`;
        answer = `Built For Speed provides professional, guaranteed ${safeTitle} across Pretoria and Johannesburg. Our licensed technicians eliminate infestations quickly using eco-friendly, family-safe methods.${costStr}`;
        list = [
            `Comprehensive ${safeTitle} inspection`,
            `Targeted eco-friendly treatments`,
            `Preventative barrier application`,
            `100% Satisfaction Guarantee`
        ];
    } else if (type === 'serviceArea') {
        question = `Do you offer professional pest control in ${safeTitle}?`;
        answer = `Yes, our certified technicians provide emergency and scheduled pest control services throughout ${safeTitle} and surrounding neighborhoods. We specialize in eradicating common local pests including rodents, termites, and cockroaches with fast response times.`;
        list = [
            `Same-day service available in ${safeTitle}`,
            `Licensed and insured local experts`,
            `Safe for children and pets`,
            `Long-term local prevention strategies`
        ];
    }

    return {
        snippetQuestion: question,
        snippetAnswer: answer,
        snippetList: list
    };
};

async function main() {
    console.log('🤖 Commencing Position Zero SEO Snippet Injection...');

    try {
        // 1. Fetch Services
        console.log('\n🔍 Fetching ALL Services...');
        const services = await client.fetch(`*[_type == "service"]{ _id, title, price, "hasSnippet": defined(featuredSnippet) }`);
        console.log(`Found ${services.length} services.`);

        // 2. Fetch Service Areas
        console.log('\n🔍 Fetching ALL Service Areas...');
        const areas = await client.fetch(`*[_type == "serviceArea"]{ _id, title, "hasSnippet": defined(featuredSnippet) }`);
        console.log(`Found ${areas.length} service areas.`);

        let mutationsCount = 0;

        // 3. Process Services
        for (const service of services) {
            if (service.hasSnippet) {
                console.log(`⏩ Skipping Service "${service.title}" (Snippets already exist)`);
                continue;
            }

            console.log(`♻️ Generating Snippets for Service: "${service.title}"...`);
            const snippet = generateSnippetData('service', service.title, service.price);

            await client
                .patch(service._id)
                .set({ featuredSnippet: snippet })
                .commit();

            console.log(`✅ Patched: ${service.title}`);
            mutationsCount++;
        }

        // 4. Process Areas
        for (const area of areas) {
            if (area.hasSnippet) {
                console.log(`⏩ Skipping Area "${area.title}" (Snippets already exist)`);
                continue;
            }

            console.log(`♻️ Generating Snippets for Area: "${area.title}"...`);
            const snippet = generateSnippetData('serviceArea', area.title);

            await client
                .patch(area._id)
                .set({ featuredSnippet: snippet })
                .commit();

            console.log(`✅ Patched: ${area.title}`);
            mutationsCount++;
        }

        console.log(`\n🎉 Optimization Complete! Successfully injected Position Zero snippets into ${mutationsCount} documents.`);

    } catch (err) {
        console.error('❌ Migration failed:', err);
    }
}

main();
