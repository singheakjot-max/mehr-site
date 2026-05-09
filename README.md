# mehr — DTC Site

The world's first daily foundational peptides. Built with React, Vite, TypeScript, Tailwind, and Framer Motion.

## Quick start

```bash
cd app
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build into app/dist
npm run preview  # preview the production build
```

## Editing content

**Almost everything you'd want to change lives in two files:**

- `app/src/content/site.ts` — every product, price, review, FAQ, study, founder story, footer link, brand string. Edit this file to rebrand or add products.
- `app/src/index.css` — design tokens (colors, fonts, spacing). Search for `--color-` and `--font-` near the top. Change `--color-product-natto` and `--color-product-bpc` to retheme the per-product accents.

## Project structure

```
app/
├── src/
│   ├── content/site.ts          ← single source of truth for all copy/data
│   ├── index.css                ← design tokens
│   ├── components/
│   │   ├── global/              ← Header, Footer, AnnouncementBar, CartDrawer, Layout
│   │   ├── ui/                  ← shadcn/ui primitives
│   │   └── (others)             ← ProductCard, ReviewCard, etc.
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ShopPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── SciencePage.tsx
│   │   ├── ReviewsPage.tsx
│   │   ├── FAQPage.tsx
│   │   └── ContactPage.tsx
│   ├── types/index.ts           ← TypeScript types
│   ├── App.tsx                  ← routes
│   └── main.tsx                 ← root + HashRouter
└── public/
    └── images/
        ├── logo/                ← MEHR logo
        ├── bpc/                 ← BPC-157 product photos
        ├── natto/               ← Nattokinase product photos
        └── lifestyle/           ← UGC / customer review photos
```

## Things to swap before launch

1. **Founder name** — find `[FOUNDER_NAME]` in `site.ts` and replace with the real name. Update `founderTitle` if needed.
2. **Founder portrait** — `site.brand.founderPortrait` currently points to a lifestyle UGC shot as a placeholder. Replace with a real B&W editorial founder portrait.
3. **Real Shopify checkout** — wire the Add-to-Cart buttons (`ProductDetailPage.tsx`) to your Shopify checkout URLs, OR use Shopify Buy SDK / Storefront API. As shipped, the cart is in-memory only.
4. **COA PDFs** — drop the real Certificate of Analysis PDFs at `public/coa/mehr-nattokinase-coa.pdf` and `public/coa/mehr-bpc157-coa.pdf`. (These paths are referenced in `site.ts` per product.)
5. **Press logos** — replace placeholder press names in `site.ts` `pressLogos` with real ones once you have them. Add their actual logo SVGs to `public/images/press/` and update the press strip component to render them.
6. **Reviews** — the 14 reviews in `site.ts` use realistic placeholder copy mapped to your real customer photos. Replace with verified reviews when you have them.
7. **Social links** — `site.social` has placeholder URLs.
8. **Email** — `hello@mehr.com` is referenced in many places; change in `site.promises.contactEmail`.
9. **Router** — currently uses `HashRouter` (URLs look like `mehr.com/#/products/bpc-157`). Switch to `BrowserRouter` in `main.tsx` for cleaner URLs once you deploy somewhere with SPA fallback (Vercel, Netlify, Cloudflare Pages — all handle this automatically).

## Deploy

Drop `app/dist/` on:
- Vercel: `vercel --prod` (auto SPA fallback)
- Netlify: drag `dist/` into Netlify dashboard
- Cloudflare Pages: connect git, build command `npm run build`, output `dist/`

For Vercel/Netlify add a `_redirects` file at `public/_redirects`:
```
/*   /index.html   200
```
Then switch `HashRouter` to `BrowserRouter` in `main.tsx`.

## Stack

- React 18 + TypeScript
- Vite 5
- TailwindCSS + shadcn/ui (Radix primitives)
- Framer Motion (motion/react)
- React Router (HashRouter currently)
- Zustand (cart state)
- Lucide icons

## What's intentionally minimal

- **No backend.** Cart is in-memory. Wire up Shopify Buy SDK or your e-commerce of choice.
- **No real authentication.** The account icon is a placeholder.
- **No analytics.** Add GA4, Meta Pixel, or whatever stack you prefer.
- **No checkout.** "Add to Cart" populates the local cart only.

The site is a complete brand frontend. The commerce layer is yours to wire up.
