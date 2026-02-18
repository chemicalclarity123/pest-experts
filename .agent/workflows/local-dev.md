---
description: Local Development and Review Workflow
---

# Local Development and Review Workflow

This workflow outlines the standard procedure for developing and verifying changes using local servers, ensuring no unrequested git commits occur.

## 1. Development Mode

- **Action**: Always prioritize running the application locally for review.
- **Command**:
  - Frontend: `npm run dev` (Runs on `http://localhost:4321`)
  - CMS: `cd studio && npm run dev` (Runs on `http://localhost:3333`)
- **Goal**: Allow the user to review changes purely on `localhost`.

## 2. Git Policy

- **Rule**: **NEVER** commit to git unless the user explicitly asks for it.
- **Reasoning**: The user manages source control manually or in batches. Automated commits disrupt their workflow.
- **Alternative**: If persistence is needed, rely on the local file system updates.

## 3. Cloudflare/Deployment

- **Rule**: Do not auto-deploy to production for review.
- **Action**: Use `npm run preview` if a production-like local build is needed to verify specific behaviors (like redirects or headers) before asking to deploy.
