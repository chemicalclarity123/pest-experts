// src/pages/api/submit-lead.ts
import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'vc8zkv1m',
    dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
    apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token: import.meta.env.SANITY_WRITE_TOKEN, // Need write token for mutations
    useCdn: false,
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        // Acepta ambos nombres de campo (antiguos y nuevos) para compatibilidad
        const name = data.fullName || data.name;
        const phone = data.phone;

        // Validate required fields
        if (!name || !phone) {
            return new Response(
                JSON.stringify({ error: 'Name and phone number are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Create document in Sanity
        const submission = await sanityClient.create({
            _type: 'formSubmission',
            name: name,
            phone: phone,
            email: data.email || '',
            serviceInterest: data.pestChallenge || data.service || data.serviceNeeded || '',
            message: data.message || '',
            submittedAt: new Date().toISOString(),
            status: 'new',
            source: data.source || 'homepage',
        });

        // Optional: Send notification (email, WhatsApp, etc.)
        // await sendNotification(submission);

        return new Response(
            JSON.stringify({
                success: true,
                message: "Thank you! We'll contact you within 1 hour.",
                submissionId: submission._id,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Form submission error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to submit form. Please try again.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
