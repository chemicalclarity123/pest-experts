// scripts/sync-reviews.mjs
import { createClient } from '@sanity/client';
import fetch from 'node-fetch';

// CONFIGURATION - The user should fill these or we can pull from Sanity if we fetch settings first
const SANITY_CONFIG = {
    projectId: 'vc8zkv1m',
    dataset: 'production',
    token: 'YOUR_SANITY_WRITE_TOKEN', // Requires write access
    apiVersion: '2026-02-04',
};

const client = createClient(SANITY_CONFIG);

async function syncReviews() {
    // 1. Fetch GPB Config from Sanity
    const settings = await client.fetch(`*[_type == "companySettings"][0]{googleBusiness}`);
    const { placeId, apiKey } = settings?.googleBusiness || {};

    if (!placeId || !apiKey) {
        console.error('Error: Google Place ID or API Key missing in Sanity Company Settings.');
        return;
    }

    console.log(`Fetching reviews for Place ID: ${placeId}...`);

    // 2. Fetch from Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,user_ratings_total&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            console.error('Google API Error:', data.status, data.error_message);
            return;
        }

        const reviews = data.result.reviews || [];
        console.log(`Found ${reviews.length} reviews.`);

        // 3. Sync to Sanity
        for (const review of reviews) {
            const doc = {
                _type: 'googleReview',
                _id: `google-review-${review.time}`, // Deterministic ID to avoid duplicates
                author: review.author_name,
                authorPhoto: review.profile_photo_url,
                rating: review.rating,
                text: review.text,
                relativeTime: review.relative_time_description,
                publishDate: new Date(review.time * 1000).toISOString(),
                googleReviewId: String(review.time),
                isFeatured: review.rating >= 4, // Auto-feature 4+ star reviews
            };

            await client.createOrReplace(doc);
            console.log(`Synced review from ${review.author_name}`);
        }

        console.log('Sync complete!');
    } catch (error) {
        console.error('Sync failed:', error);
    }
}

syncReviews();
