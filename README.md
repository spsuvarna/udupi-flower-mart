# Kepula Flower Store

A responsive, frontend-only flower-ordering website for delivery within Udupi district. Built with React, TypeScript, Vite, Tailwind CSS and hash-based React Router. Orders and custom enquiries are completed through WhatsApp. There is no backend, database, login or online payment collection.

## Run locally

Requirements: Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Run all quality checks with:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The production site is generated in `dist/`.

## Maintain shop content

All business content is under `src/data/`:

- `prices.ts`: change flower prices here. `original` is the regular crossed-out amount and `selling` is the amount customers pay.
- `products.ts`: add/edit products, availability, minimum quantities and image paths. Keep every `id`, `slug` and `productCode` unique.
- `categories.ts` and `occasions.ts`: catalogue filters and home-page links.
- `deliveryAreas.ts`: area, taluk, PIN codes, delivery fee, minimum order, same-day status and estimate.
- `banners.ts` and `testimonials.ts`: home-page content.
- `settings.ts`: the single source for the shop name, WhatsApp number, phone, address, email, hours, map and social links. The WhatsApp number must include country code and digits only, for example `919876543210`.

No secret should be stored in these files. Shop contact information is intentionally public.

## Add or replace images

Product images live in `public/assets/products/` and banners in `public/assets/banners/`. The supplied SVGs are lightweight placeholders.

1. Export a WebP or AVIF image around 800 × 600 pixels (4:3), ideally under 150 KB.
2. Use a lowercase, descriptive filename such as `red-rose-garland.webp`.
3. Copy it to `public/assets/products/`.
4. Update the product's `imagePath` to `/assets/products/red-rose-garland.webp`.
5. Put alternate views in `additionalImagePaths`.

Do not prefix asset values in data with the repository name; Vite applies the deployment base. Product UI uses explicit responsive dimensions and lazy loading in listing cards. Always keep product names descriptive because they are used in image alternative text.

## Create the GitHub repository

1. Create a new empty repository named `udupi-flower-mart` on GitHub.
2. From this folder, run:

```bash
git init
git add .
git commit -m "Create Kepula Flower Store"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/udupi-flower-mart.git
git push -u origin main
```

If the repository has a different name, change the production `base` in `vite.config.ts` and the URLs in `public/404.html`, `public/robots.txt` and `public/sitemap.xml`.

## Deploy to GitHub Pages

The workflow at `.github/workflows/deploy.yml` runs linting, type checking, tests and a production build on every push to `main`, then deploys `dist/`.

In the GitHub repository, open **Settings → Pages** and select **GitHub Actions** as the source. After the workflow succeeds, the site is available at `https://YOUR-USERNAME.github.io/udupi-flower-mart/`.

Routing uses `HashRouter`, so URLs such as `/#/products` survive direct access and refresh on GitHub Pages. `public/404.html` provides a branded redirect for unknown non-hash URLs.

Before launch, replace `YOUR-USERNAME` in `robots.txt` and `sitemap.xml`, and replace all example shop details in `src/data/settings.ts`.

## Connect a custom domain

1. In **Settings → Pages**, enter the custom domain and enable HTTPS once GitHub allows it.
2. Add the DNS records GitHub shows (typically a `CNAME` for a subdomain, or GitHub Pages A/AAAA records for an apex domain).
3. Add a `public/CNAME` file containing only the domain, for example `flowers.example.com`.
4. For a root custom domain, change Vite's production `base` to `/`; for a repository URL, retain `/udupi-flower-mart/`.
5. Update the canonical URLs in `robots.txt`, `sitemap.xml`, Open Graph metadata and `404.html`.

## Privacy and order flow

Only cart product IDs and quantities are saved in browser `localStorage`. Checkout and enquiry fields remain in component memory and are used to compose a URL-encoded WhatsApp message. They are not sent to any database or analytics service. The website never asks for a password, card details, CVV, OTP or UPI PIN. Payment is discussed only after the shop confirms the order.
