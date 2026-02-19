import type { APIRoute } from 'astro';

// Genera robots.txt dinámicamente usando Astro.site como fuente de verdad
export const GET: APIRoute = ({ site }) => {
    const siteUrl = site?.toString() || 'https://pestexperts.co.za';

    const robotsTxt = `
User-agent: *
Allow: /

Disallow: /test-sanity

Sitemap: ${siteUrl}sitemap-index.xml
`.trim();

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
