import type { APIRoute } from 'astro';

const robotsTxt = `
User-agent: *
Allow: /

# Agentic Search & AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Applebot-Extended
Allow: /

sitemap: https://pest-experts-site.pages.dev/sitemap-index.xml
`.trim();

export const GET: APIRoute = () => {
    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
