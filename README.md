# CityRide Web Frontend

A multilingual (English / Kinyarwanda / French) web frontend for CityRide, consisting of a public marketing site and a protected admin dashboard. Built with Next.js App Router, React, and Tailwind CSS. Currently runs against a mock API layer (`lib/api/`, `lib/mock/`) shaped to match the approved CityRide backend spec, so it can be pointed at the real backend later without UI changes.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The admin dashboard is reachable at `/admin/login` (demo credentials: `admin@cityride.rw` / `admin123`) — it isn't linked from the public nav by design.

## Structure

- `app/(site)/` — public marketing pages (Home, How It Works, About, FAQ, Download, Contact)
- `app/admin/` — admin login and dashboard (Users, Riders & verification, Contact Events, Trip Requests, Notification Logs, Payments, Transactions, Roles, App Configuration)
- `components/site/`, `components/admin/`, `components/ui/` — shared UI building blocks
- `lib/i18n/` — translation dictionaries (`en`/`rw`/`fr`) and the `useI18n` hook
- `lib/api/` — mock-first service layer; each function maps to a real backend endpoint (documented inline) for a straightforward swap later
- `lib/mock/` — fixed mock data matching the approved entity schema
- `lib/auth/` — client-side admin session handling

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
