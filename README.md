# ಉಡುಪಿ ಮಲ್ಲಿಗೆ · Udupi Mallige

A responsive, frontend-only flower-ordering website for delivery within Udupi district. Built with React, TypeScript, Vite, Tailwind CSS and hash-based React Router. Orders and custom enquiries are completed through WhatsApp. There is no backend, database, login or online payment collection.

## Run locally

Requirements: Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Run all quality checks with:

Install Chromium once before the browser test with `npx playwright install chromium`.

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

The production site is generated in `dist/`.

## Maintain shop content

All business content is under `src/data/`:

- `prices.ts`: update Mallige Chendu, Mallige Atte and Jaaji prices whenever your buying rate changes. Keep `original` and `selling` equal unless there is a genuine discount.
- `products.ts`: add/edit products, availability, minimum quantities and image paths. Keep every `id`, `slug` and `productCode` unique.
- `categories.ts` and `occasions.ts`: catalogue filters and home-page links.
- `deliveryAreas.ts`: area, taluk, PIN codes, delivery fee, minimum order and scheduled-delivery estimate.
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
git commit -m "Create Udupi Mallige"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/udupi-flower-mart.git
git push -u origin main
```

The repository name does not affect the public Cloudflare Pages URL.

## Deploy to Cloudflare Pages for free

The workflow at `.github/workflows/deploy.yml` runs linting, type checking, tests and a production build on every push to `main`. Cloudflare Pages performs the public deployment separately.

1. Create a free Cloudflare account and open **Workers & Pages**.
2. Select **Create application → Pages → Connect to Git** and authorize the GitHub repository.
3. Use project name `udupi-mallige` if Cloudflare says it is available.
4. Set the production branch to `main`, build command to `npm run build`, and output directory to `dist`.
5. Save and deploy. The intended address is `https://udupi-mallige.pages.dev/`; Cloudflare will show the actual address after confirming project-name availability.

Routing uses `HashRouter`, so URLs such as `/#/products` survive direct access and refresh. `public/404.html` provides a branded redirect for unknown non-hash URLs.

Before launch, replace all example shop details in `src/data/settings.ts`. If Cloudflare assigns a different project address, replace `https://udupi-mallige.pages.dev` in `index.html`, `public/robots.txt` and `public/sitemap.xml`.

## Connect a custom domain

1. In the Cloudflare Pages project, open **Custom domains → Set up a domain**.
2. Follow Cloudflare's DNS instructions. An apex domain must use Cloudflare nameservers; a subdomain can use a CNAME record.
3. Update the canonical URLs in `index.html`, `robots.txt` and `sitemap.xml`.

## Privacy and order flow

Only cart product IDs and quantities are saved in browser `localStorage`. Checkout and enquiry fields remain in component memory and are used to compose a URL-encoded WhatsApp message. They are not sent to any database or analytics service. The website never asks for a password, card details, CVV, OTP or UPI PIN. Payment is discussed only after the shop confirms the order.
