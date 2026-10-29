# TinyNest

TinyNest is a React single-page storefront built with Vite.

## Local development

```sh
npm ci
npm run dev
```

## Production checks

```sh
npm run lint
npm run build
```

Vite writes the production site to `dist/`.

## Deploy to Vercel

Import the repository into Vercel and use the Vite preset. The build command is
`npm run build`, the output directory is `dist`, and the install command is
`npm ci`. The `vercel.json` rewrite supports direct visits and refreshes on
client-side routes. Use a Node.js version allowed by the `engines` field in
`package.json`.

The checkout and newsletter are currently front-end demonstrations without
payment or subscription services. Connect the required backend providers before
accepting real orders or subscriptions.
