# Noah Ibrahim — Portfolio

A responsive Next.js portfolio with selected projects, experience, a printable résumé, and an interactive engineering gallery.

## Development

```sh
npm install
npm run dev
```

- `/` — portfolio, project filters and detail dialogs, and contact form
- `/resume` — résumé with print / save as PDF controls
- `/gallery` — the original interactive 3D engineering gallery

## Configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your deployed URL for canonical links, social previews, and the sitemap.

To deliver contact messages directly, configure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a sender verified with your email provider), and `CONTACT_TO_EMAIL`. Without email configuration, the form keeps the visitor’s message and offers a prefilled link to their email app. It only reports delivery after the provider accepts the message.

## Checks

```sh
npm run typecheck
npm run build
```

The production build also runs the project’s configured lint checks. The existing Google Fonts setup downloads fonts at build time, so a fresh build requires internet access.

Portfolio content is in `lib/constants.ts`, `lib/data.ts`, and `lib/exhibit-catalog.ts`. Homepage components are in `components/portfolio/`. Project interface previews are illustrative designs rather than product screenshots.
