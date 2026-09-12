# Bagicha Daily

Fresh Himalayan apples — product catalog with WhatsApp ordering. Built with [Astro](https://astro.build) and Tailwind CSS.

## Features

- Static product pages with SEO-friendly HTML
- Product catalog with weight options (1kg, 5kg, 10kg)
- Shopping cart persisted in `localStorage`
- WhatsApp checkout (no payment gateway)
- Fast mobile-first design

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

## Deploy

Deploy the `dist/` folder to any static host:

- **Vercel** — connect repo; `vercel.json` is included
- **Netlify** — connect repo; `netlify.toml` is included
- **Cloudflare Pages** — build command: `npm run build`, output: `dist`

Update `SITE_URL` in `src/consts.ts` to your production domain for correct canonical URLs and Open Graph tags.

## Product updates

Edit `src/data/products.json` to add or change products, then rebuild and redeploy.
