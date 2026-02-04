# Built For Speed - Astro 6.0 + Cloudflare Pages

A modern, SEO-optimized website built with Astro 6.0, deployed on Cloudflare Pages, and powered by Sanity CMS via GraphQL.

## 🚀 Features

- **Astro 6.0** - Fast, modern static site generation
- **Cloudflare Pages** - Edge deployment for global performance
- **Apollo Client** - Efficient GraphQL data fetching from Sanity
- **TypeScript** - Strict mode for type safety
- **JSON-LD Schemas** - Service and LocalBusiness structured data
- **SEO Optimized** - Built-in schema markup for search engines

## 📁 Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── layouts/         # Page layouts
│   │   └── ServicePage.astro  # Service page template with JSON-LD
│   ├── lib/             # Utilities and helpers
│   │   ├── apollo-client.ts   # Apollo Client configuration
│   │   └── schema.ts          # JSON-LD schema generators
│   └── pages/           # Route pages
│       └── services/    # Service pages
├── astro.config.mjs     # Astro configuration
├── wrangler.jsonc       # Cloudflare Workers configuration
├── tsconfig.json        # TypeScript configuration
└── llms.txt            # AI crawler information
```

## 🛠️ Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your Sanity project details.

3. **Run development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Preview production build:**

   ```bash
   npm run preview
   ```

## 🌐 Deployment

This project is configured for Cloudflare Pages deployment:

1. **Connect your repository** to Cloudflare Pages
2. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
3. **Environment variables:** Add your Sanity credentials in Cloudflare dashboard

## 📝 Creating Service Pages

Service pages use the `ServicePage` layout which automatically generates JSON-LD schemas:

```astro
---
import ServicePage from '../../layouts/ServicePage.astro';

const serviceData = {
  title: 'Your Service Title',
  serviceName: 'Service Name',
  serviceDescription: 'Description of your service',
  businessName: 'Your Business Name',
  businessUrl: 'https://example.com',
  // ... more fields
};
---

<ServicePage {...serviceData}>
  <!-- Your content here -->
</ServicePage>
```

## 🔧 Apollo Client Configuration

The Apollo Client is configured to fetch data from Sanity's GraphQL API:

```typescript
import { client } from '../lib/apollo-client';
import { gql } from '@apollo/client';

const { data } = await client.query({
  query: gql`
    query GetService {
      allService {
        title
        description
      }
    }
  `,
});
```

## 📊 JSON-LD Schemas

The project includes generators for:

- **Service Schema** - Describes service offerings
- **LocalBusiness Schema** - Business information and location

These are automatically embedded in service pages for enhanced SEO.

## 🔍 llms.txt

The root `llms.txt` file provides AI crawlers with structured information about:

- Site technology stack
- Content structure
- API endpoints
- Schema implementations

## 📚 Tech Stack

- [Astro](https://astro.build) - Web framework
- [Cloudflare Pages](https://pages.cloudflare.com) - Hosting
- [Sanity](https://www.sanity.io) - Headless CMS
- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL client
- [schema-dts](https://github.com/google/schema-dts) - TypeScript Schema.org types

## 📄 License

MIT
