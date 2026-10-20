# Yojana Sarthi · योजना सारथी

**Find the government welfare schemes your family may qualify for — in simple Hindi or English, free, private, and offline.**

Live: https://yoajanasarthi.netlify.app

Many eligible families never claim central welfare benefits because the rules are scattered, written in bureaucratic language, and often "explained" by paid middlemen. Yojana Sarthi asks ten plain questions, runs a transparent rule engine on the user's own device, and returns:

- which schemes they likely qualify for, which need checking at the office, and which don't apply — **with the reason for each**,
- the documents they need, where to get them, and common rejection reasons,
- a printable slip they can carry to a CSC / Panchayat office,
- a tracker for applications they have started.

## Features

| | |
|---|---|
| Eligibility check | 10-question flow; 15 central schemes; every result explains what matched, what failed, and what to verify |
| Bilingual + voice | Full Hindi/English UI, simple-language mode, text-to-speech |
| Family planner | Evaluate each household member separately |
| Document checker | Readiness checklist with issuing office, fee and time |
| Application tracker | Status timeline per application |
| Offline | Installable PWA; works without internet after the first visit |
| Accessibility | Large text, high contrast, reduced motion, keyboard navigation |

## How the eligibility engine works

`src/services/eligibilityEngine.ts` evaluates each scheme's rules against the answers. Every rule resolves to one of three outcomes:

| Outcome | Example | Effect |
|---|---|---|
| **Met** | Age 42 is within 18+ | Counts fully |
| **Not met** | Scheme is only for women | Scheme marked *Likely not eligible* |
| **To verify** | Income bracket ₹1–2.5 L straddles a ₹1.2 L limit | Counts half; scheme marked *Possible — verify* |

So the three result groups have a precise meaning:

- **Strong match** — every rule is met
- **Possible — verify** — nothing fails, but something must be confirmed at the office
- **Likely not eligible** — at least one rule definitely fails

Design decisions worth noting:

- **Income brackets are compared as ranges**, not a single point, so a family is never wrongly rejected because its bracket's upper bound is above a limit.
- **Household-member schemes** (Sukanya Samriddhi, widow and old-age pensions, PMMVY) check the *member's* condition, not the age/gender of whoever fills in the form.
- **Missing answers are never treated as a pass.**
- Results are preliminary; the app says so everywhere and never claims final eligibility.

## Privacy & security

- No backend, no accounts, no analytics. Answers stay in the browser's `localStorage` and can be exported or wiped from Settings.
- Never asks for Aadhaar, phone number or bank details.
- All stored data is **validated on read** (`storageService.ts`) — tampered or corrupt values are discarded, never rendered.
- Links built from data only allow `https:` (`utils/safeUrl.ts`), blocking `javascript:` injection.
- Strict **Content-Security-Policy**, `X-Frame-Options: DENY`, HSTS, `nosniff` and a locked-down `Permissions-Policy` via `netlify.toml`.
- No source maps in production; `npm audit` reports 0 vulnerabilities in runtime dependencies.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · Vitest · Service Worker (PWA) · Netlify

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests for the engine, storage validation and URL safety
npm run lint       # type-check
npm run build      # production build in dist/
```

## Project structure

```
src/
  services/eligibilityEngine.ts   rule engine (+ .test.ts)
  services/storageService.ts      validated local persistence (+ .test.ts)
  utils/safeUrl.ts                link sanitising (+ .test.ts)
  data/schemesData.ts             scheme rules, documents, steps, helplines
  data/translations.ts            English / Hindi strings
  components/views/               one file per screen
public/sw.js                      offline service worker
netlify.toml                      deploy + security headers
```

## Limitations (honest list)

- Covers 15 central schemes; state schemes are not yet included.
- Scheme figures (amounts, interest rates) change — always confirm on the official portal linked from each scheme.
- The help-centre directory contains **sample entries only**; the app links to the official CSC locator for real centres.

## Roadmap

- Add schemes for our pilot state, each with a source link and "last verified" date
- Field-volunteer survey mode with an anonymised "unclaimed benefits" summary per village/ward
- Hindi voice input

---

An independent student community project. Not affiliated with any government department.
