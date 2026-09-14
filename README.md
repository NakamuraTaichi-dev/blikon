# Folios Digitales Premium — Next.js

Recreation of [portalfoliosdigitales.blikon.com](https://portalfoliosdigitales.blikon.com/) with Next.js 14 (App Router). Public flows: homepage, products, support tickets, checkout, system login, POS trial, and XML tools.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without backend env vars, login, tickets, and purchases stay in the browser (`localStorage`). Registering creates 10 courtesy credits. Sample RFC: `XAXX010101000`.

## Deploy to Vercel

1. Push this repo to GitHub, GitLab, or Bitbucket.
2. In Vercel: **Add New Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `next build`. Output: default Next.js.
5. Add environment variables (see `.env.example`).
6. Deploy.

Until the backend API is live, leave `NEXT_PUBLIC_BACKEND_ENABLED=false`. The site still runs on Vercel using the local demo store.

### Connect the Blikon API

When `https://portalfoliosdigitales.blikon.com` (or another API host) exposes REST endpoints, set these in Vercel → Settings → Environment Variables:

| Variable | Example | Where |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_ENABLED` | `true` | Production |
| `BACKEND_API_URL` | `https://portalfoliosdigitales.blikon.com` | Server only |
| `BACKEND_API_PREFIX` | `/api` | Server only |
| `BACKEND_API_KEY` | your secret | Server only |

The browser never calls Blikon directly. Pages call same-origin `/api/*` on Vercel. Those serverless routes proxy to the backend, attach `X-Api-Key` / `Authorization`, and store the session in an httpOnly cookie.

Expected backend contract (override paths with `BACKEND_PATH_*` if needed):

- `POST /auth/login` `{ usuario, cuenta, password }` → `{ user, token }`
- `POST /auth/register` `{ rfc, razonSocial, email, password, telefono }` → `{ user, token }`
- `POST /auth/logout`
- `GET /auth/session` → `{ user }`
- `GET|POST /tickets`
- `GET /tickets/lookup?rfc=&folio=`
- `GET|POST /orders`
- `POST /leads/punto-venta`

Health check after deploy: `https://your-app.vercel.app/api/health`

## Production build

```bash
npm run build
npm start
```
