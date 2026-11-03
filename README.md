# Tile Saint, LLC

A complete, frontend-only architectural website built with React, TypeScript, Vite, React Router, Tailwind CSS v4, Framer Motion, and Lucide icons.

The updated visual system closely follows the reference site's floating frosted-glass navigation, soft architectural frames, Albert Sans and Barlow typography, image-led service presentation, wide space sliders, asymmetrical lookbook, horizontal material browsing, and light editorial footer. Tile Saint retains its own identity, verified content, and client-provided photography.

## Run Locally

```sh
npm install
npm run dev
```

## Production Build

```sh
npm run build
npm run preview
```

Deploy the entire `dist/` directory, including its images and fonts. The application uses browser-history routing. Configure your static host to serve `index.html` for unknown paths. `public/_redirects` includes the equivalent rule for Netlify-compatible hosts. No application server, database, API credentials, or environment variables are needed.

## Pages

- `/`: Full editorial homepage with three hero slides, services, draggable space carousel, installation process, inspiration gallery, material browser, owner introduction, verified testimonials, service areas, FAQ, and contact CTA.
- `/about`: Company story, philosophy, owner, and approach.
- `/services`: Detailed service overview.
- `/tile-flooring-installation`: Flooring materials, preparation, installation details, inspiration, and FAQs.
- `/bathroom-remodeling`: Bathroom tile work, showers, flooring, layout upgrades, process, inspiration, and FAQs.
- `/projects`: Filterable architectural inspiration gallery with keyboard-accessible lightbox.
- `/service-areas`: Service-area overview with client-provided photography.
- `/service-areas/kinnelon-nj`, `/service-areas/mahwah-nj`, `/service-areas/morristown-nj`, `/service-areas/parsippany-nj`, `/service-areas/butler-nj`: Individually written local content.
- `/contact`: Validated, frontend-only estimate inquiry preparation.
- `/guides/choosing-your-tile`, `/guides/planning-a-bathroom`, `/guides/preparing-your-project`: Practical project-planning articles with dedicated routing and metadata.
- `/image-credits`: Photo sources, licenses, and inspiration disclosure.

## Contact Workflow

The form validates in the browser and creates an editable inquiry preview. It does **not** submit, transmit, or store inquiry details on a server. The visitor explicitly chooses to open their own email app, copy the inquiry, download a text file, or call. Form values exist only in the current React page state.

The recipient, `tilesaintllc@gmail.com`, and phone number, `(646) 491-2546`, were verified from the original `https://tilesaint.com/` website. No unverified street address, hours, certifications, experience claims, awards, ratings, or social profiles have been added.

## Photography and Content

All project-gallery photography is clearly labeled architectural inspiration, not completed Tile Saint client work. Craftsmanship photographs do not claim to depict the owner or employees. Material browsing describes installation options, not products for sale.

Site photography is served from `public/images-client/`, except for the six existing Pexels reference images in the Explore Tile Materials section. Photographer, copyright, and license details for the supplied client files were not included; see `/image-credits` and `public/PHOTO-LICENSES.md` for details. Self-hosted fonts include their Open Font License files in `public/fonts/`.

Business information, service descriptions, owner name, and the three testimonials are based on the original Tile Saint website. The new visual identity, layouts, and components are original; no Somany brand assets or proprietary imagery are used.

## Architecture

- `src/App.tsx`: Entry component, routing, page transitions, and scroll/focus management.
- `src/data.ts`: Verified business information and typed site content.
- `src/siteAssets.ts`: Root-absolute font and favicon loading for reliable production deep links.
- `src/mediaSources.ts`: Preserved material-image and open-font sources.
- `src/components/UI.tsx`: Shared typography, photography, actions, metadata, and modal focus management.
- `src/components/Layout.tsx`: Responsive navigation, image-preview dropdowns, footer, and mobile action bar.
- `src/components/Sections.tsx`: Reusable interactive editorial sections.
- `src/components/EditorialSections.tsx`: Reference-aligned homepage compositions and a private, frontend-only style guide.
- `src/components/SiteTools.tsx`: Client-side page search and service-area finder.
- `src/pages/`: Homepage, independently composed inner pages, and contact workflow.
- `src/index.css`: Responsive design system and reduced-motion behavior.
- `src/design.css`: Revised visual system applied consistently across the homepage, inner pages, overlays, and mobile layouts.

## Verification

```sh
npx tsc --noEmit
npx playwright install --with-deps chromium
npx playwright test
npm audit
npm run build
```

The Playwright suite covers every route, metadata, all local image assets, responsive layouts, navigation, slides, dragging, material keyboard interaction, gallery filters and lightbox, validated inquiry preparation, clipboard/download alternatives, and recovery from missing pages.

It also covers site search, the service-area finder, the style guide, and its prefilled contact workflow. These tools use local frontend state only, with no authentication, customer accounts, backend, database, or server-side inquiry handling.

To test a running production preview instead of the development server, use `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4173 npx playwright test` after `npm run build` and `npm run preview`.

SEO includes unique titles and descriptions, canonical URLs, Open Graph tags, a sitemap, robots.txt, and structured data using verified business details only. Animations respect reduced-motion preferences; hero autoplay pauses for keyboard interaction and can be paused manually.