# GovConnect — Project Documentation

**Tagline:** One Profile. Every Government Service.

GovConnect is a frontend-only prototype (built for SIH) of a unified citizen portal: one profile, government service/scheme discovery, and — its main feature — a single dashboard to track applications submitted across different government portals. There is no backend; everything is mock data seeded into `localStorage`.

> This document explains how the app is structured and how each piece works, so you (or a teammate) can navigate the codebase without re-reading every file.

---

## 1. Running it

```bash
cd govconnect
npm install   # one-time setup, only needed before the first run
npm run dev   # starts the dev server -> http://localhost:5173
```

That's it — `npm run dev` is the only command you need day-to-day. Open the printed URL in a browser, then on the Landing page click **Login → Use Demo Account** to seed a demo profile (Aarav Sharma) and demo applications into `localStorage` and log in. Clear site data / use an incognito window to reset back to a clean state.

Optional, only if you want to sanity-check the production bundle instead of the dev server:
```bash
npm run build     # production build -> dist/
npm run preview   # serves that dist/ build locally
```

---

## 2. Tech stack

- **React 19** + **Vite** (`.jsx`, no TypeScript)
- **react-router-dom** for routing (`BrowserRouter`)
- **Tailwind CSS v3** for styling (`tailwind.config.js`)
- **lucide-react** for icons
- **localStorage** as the only persistence layer (no backend, no real API calls)

No state-management library (Redux/Zustand) is used — each page reads from the service layer on render and re-fetches after mutations. This is fine at this scale since nothing needs cross-page live sync beyond a full navigation/re-render.

---

## 3. Folder structure & the mental model

```
src/
  main.jsx              # ReactDOM root
  App.jsx               # <BrowserRouter> + all <Route> definitions
  index.css             # Tailwind directives + Google Fonts import

  pages/                 # one file per route — orchestrates a screen
  components/            # reusable, presentational or shared-behavior pieces
  services/               # the ONLY layer pages should call into
  data/                   # static seed data (services, schemes, mock docs, demo profile)
  utils/                  # pure helper functions (localStorage wrapper, matching engine, formatting)
```

**The golden rule of this codebase:** pages never touch `localStorage` or `data/*.js` directly — they call functions in `services/*.js`. That indirection is the seam where a real backend could later replace `localStorage` without changing any page code.

```
Page (e.g. Schemes.jsx)
   │  calls
   ▼
services/schemeApi.js        (business logic: ranking, search, lookups)
   │  calls
   ▼
utils/matchingEngine.js      (pure scoring function)
   +
data/schemes.js              (static seed list)
   +
utils/storage.js             (localStorage read/write, when persistence is needed)
```

---

## 4. Routing (`src/App.jsx`)

| Path | Page | Auth |
|---|---|---|
| `/` | Landing | public |
| `/login` | Login | public |
| `/officer` | Officer | public (separate mock view, own header) |
| `/services`, `/services/:id` | Services, ServiceDetail | **public** (browsable pre-login, per spec) |
| `/schemes`, `/schemes/:id` | Schemes, SchemeDetail | **public** |
| `/dashboard` | Dashboard | protected |
| `/profile` | Profile | protected |
| `/mock-portal/:serviceId` | MockPortal | protected |
| `/applications`, `/applications/:id` | Applications, ApplicationDetail | protected |
| `/documents` | Documents | protected |
| `/consent` | Consent | protected |
| `/grievances` | Grievances | protected |
| `/help` | Help | protected |
| `*` | falls back to Landing | — |

"Protected" means wrapped in `<ProtectedRoute>` (`src/components/ProtectedRoute.jsx`), which checks `isAuthenticated()` from `authApi.js` and redirects to `/login` if there's no logged-in user in `localStorage`.

Services/Schemes are intentionally public so the landing page's "Browse Services" and search results work without forcing a login — anything that touches *personal* data (profile, applications, documents, consent) is gated.

---

## 5. Auth (`services/authApi.js`)

This is **not real authentication** — it's a mock for the prototype:

- `login({ identifier, password })` — rejects if either field is empty; otherwise accepts anything and stores `{ name, identifier }` under `govconnect_auth` in localStorage.
- `loginDemo()` — logs in as a fixed demo user, calls `setProfile(demoProfile)` and `seedApplicationsIfEmpty(mockApplications)` so the whole demo dataset appears at once.
- `logout()` — removes the auth key.
- `isAuthenticated()` / `getCurrentUser()` — read helpers used by `ProtectedRoute` and `DashboardLayout`.

---

## 6. Storage layer (`utils/storage.js`)

Thin wrapper around `localStorage` with JSON parse/stringify and try/catch (so a private-browsing/storage-disabled edge case doesn't crash the app — it just no-ops).

```js
STORAGE_KEYS = {
  AUTH, PROFILE, APPLICATIONS, CONSENTS, GRIEVANCES, DOCUMENTS, SEEDED
}
```
All keys are prefixed `govconnect_` so they're easy to spot/clear in DevTools → Application → Local Storage.

---

## 7. Data models (`data/*.js`)

- **`services.js`** — ~15 real Indian government digital services. Each entry: `id, name, department, category, description, requirements[], documents[], officialUrl, profileFieldsUsed[], supportsMockPortal`. `officialUrl` is a real government URL opened via `window.open` when the user clicks "Apply on Official Website". `supportsMockPortal: true` (currently just Passport) shows the "Try Fill with GovConnect Demo" link to `/mock-portal/:id`.

- **`schemes.js`** — 12 schemes, all flagged `isDemoScheme: true` since they're fictional/illustrative. Each has an `eligibilityRules` object consumed by the matching engine:
  ```js
  eligibilityRules: {
    minAge, maxAge,               // number
    studentRequired,              // true | false | null (null = not a criterion)
    maxIncome,                    // number, rupees
    educationLevels,              // array of strings, or 'any'
    states,                       // array of strings, or 'any'
  }
  ```
  The rules were tuned so the seeded demo profile (Aarav Sharma) scores exactly: **Student Education Support 100%, Digital Skills Scholarship 80%, Youth Employment Assistance 75%** — matching the product spec's demo numbers.

- **`demoProfile.js`** — the fixed Aarav Sharma profile loaded by `loginDemo()`.

- **`mockApplications.js`** — the 4 seed applications (Passport/Under Review, Income Certificate/Approved, Driving Licence/Processing, Student Education Support/Submitted), only written to storage the first time (`seedApplicationsIfEmpty`), so user edits/additions persist across reloads.

- **`mockDocuments.js`** — the 6 reusable mock documents (ID Proof, Income/Domicile/Caste/Education/Birth Certificate).

---

## 8. Service layer (`services/*.js`)

| File | Responsibility |
|---|---|
| `authApi.js` | login/logout/demo login, current user |
| `profileApi.js` | get/set/update the citizen profile; `hasProfile()` checks `fullName` is set |
| `serviceApi.js` | read-only lookups + text search over `data/services.js` |
| `schemeApi.js` | read-only lookups + search over `data/schemes.js`, plus `getRankedSchemes()` / `getMatchForScheme(id)` which pull the current profile and run it through the matching engine |
| `applicationApi.js` | the **core USP data layer** — seed, list, get-by-id, add, update-status (see §10) |
| `documentApi.js` | lazily seeds `mockDocuments` into storage on first read |
| `consentApi.js` | pending/active/history consent request state machine (see §11) |
| `grievanceApi.js` | mock grievance list + add |

Every one of these is a small set of plain exported functions — no classes, no hooks inside the service files (hooks live in components/pages only). This is what makes the "swap for a real backend later" story credible: each function is a natural fit for `fetch('/api/...')` later.

---

## 9. The Scheme Matching Engine (`utils/matchingEngine.js`)

Pure, rule-based (no ML), exported as two functions:

- **`computeMatch(profile, scheme)`** — builds a list of applicable `criteria` from the scheme's `eligibilityRules` (age range, student-status, income ceiling, education level, state — each only added to the list if the rule is actually defined on that scheme, so schemes with fewer constraints aren't unfairly penalized). Returns:
  ```js
  {
    percent,            // matchedCount / totalCriteria * 100, rounded
    matchedCriteria,    // [{ label, matched: bool }, ...] — used to render checklists
    likelyEligible,     // percent >= 60 (never state "Eligible" outright — spec requirement)
    reason,             // "Recommended because your X, Y, Z match the demo eligibility criteria."
  }
  ```
- **`rankSchemes(schemes, profile)`** — maps every scheme through `computeMatch` and sorts descending by `percent`. Used by the Dashboard (top 3) and the Schemes catalog page (full ranked list).

This is the only "intelligence" in the app — it's intentionally simple and auditable, per the spec's "no AI/ML required" instruction.

---

## 10. Applications / Unified Tracking (`services/applicationApi.js`) — the main feature

This is the piece the whole product is built around, so it's worth being precise about the data shape:

```js
{
  id,                // e.g. "PSP-2026-10234" (user-supplied) or auto-generated "APP-2026-xxxxx" / "SCH-2026-xxxxx"
  name,              // display name, e.g. "Passport Application"
  type,              // 'DIGITAL_SERVICE' | 'SCHEME'
  serviceId,         // set if type is DIGITAL_SERVICE
  schemeId,          // set if type is SCHEME
  department,
  status,            // 'Submitted' | 'Processing' | 'Under Review' | 'Approved' | 'Rejected' | ...
  submittedDate,
  lastUpdated,
  timeline: [
    { step: 'Application Submitted', done: true,  date },
    { step: 'Documents Received',    done: false, current: true },
    { step: 'Verification',          done: false },
    { step: 'Department Processing', done: false },
    { step: 'Final Decision',        done: false },
  ],
}
```

Two ways an application gets created — both converge on the same `addApplication()` call and both land in the same `/applications` list, which is the whole point of "unified" tracking:

1. **Digital Service flow** (`ServiceDetail.jsx`): user clicks "Apply on Official Website" (`window.open(service.officialUrl)`), then manually fills the "Add Application for Tracking" form (Application ID + date) once they've applied on the real portal.
2. **Scheme flow** (`SchemeDetail.jsx`) or **Mock Portal flow** (`MockPortal.jsx`): submitting the in-app multi-step flow calls `addApplication()` directly with an auto-generated ID.

`Applications.jsx` reads the full list, offers type filter (All/Digital Services/Schemes) and status filter chips, and renders a table (desktop) — `ApplicationDetail.jsx` renders the `Timeline` component for a single application, with a note that "Tracking status is simulated for this prototype."

---

## 11. Consent Center (`services/consentApi.js`)

Simple three-bucket state machine stored as one object under `govconnect_consents`:

```js
{ pending: [...], active: [...], history: [...] }
```

- `grantConsent(id)` moves a request from `pending` → `active` (stamped `grantedOn`).
- `declineConsent(id)` moves `pending` → `history` (stamped `action: 'Declined'`).
- `revokeConsent(id)` moves `active` → `history` (stamped `action: 'Revoked'`).

`DEFAULT_REQUESTS` seeds two example pending requests the first time the page is opened. This same `ConsentModal` component is reused by the Mock Portal auto-fill flow (a lightweight, one-off consent prompt, not tied to this pending/active/history state).

---

## 12. Key components (`src/components/`)

| Component | Purpose |
|---|---|
| `DashboardLayout.jsx` | Shell for every logged-in-style page (services/schemes are public but still use this shell): desktop sidebar, mobile drawer sidebar, top header with `SearchBar`, notifications dropdown (static mock list), user menu with logout. |
| `Sidebar.jsx` | The nav link list (Dashboard, My Profile, Digital Services, …), used inside both the desktop `<aside>` and the mobile drawer in `DashboardLayout`. |
| `Navbar.jsx` | Public-page header (Landing) with its own mobile hamburger behavior — separate from `DashboardLayout`'s. |
| `SearchBar.jsx` | Controlled input + live dropdown. On every keystroke calls `searchServices(query)` and `searchSchemes(query)`, groups results under "Digital Services" / "Schemes" headings, has All/Services/Schemes filter chips. Clicking a result navigates to its detail page. Used on both Landing and inside `DashboardLayout`'s header — one component, two contexts. |
| `StatusBadge.jsx` / `TypeBadge.jsx` | Colored pill badges for application status and DIGITAL_SERVICE/SCHEME type, used everywhere applications are listed. |
| `ApplicationCard.jsx`, `SchemeCard.jsx`, `ServiceCard.jsx` | Card renderers for their respective list pages and the Dashboard's "latest 4" / "top 3" sections. |
| `Timeline.jsx` | Renders the `timeline[]` array from an application as a vertical step tracker (done / current / upcoming states). |
| `ConsentModal.jsx` | Generic "list of fields + Cancel/Allow" modal — reused by Mock Portal's auto-fill consent step. |
| `ToastContext.jsx` | `ToastProvider` (wraps the whole app in `App.jsx`) + `useToast()` hook exposing `showToast(message, type)`. Toasts auto-dismiss after 4s. |
| `ProgressBar.jsx` | Generic percentage bar — used for Profile Completion and the multi-step scheme application stepper. |
| `EmptyState.jsx` | "No X found" placeholder with title/description, used wherever a filtered list can be empty. |
| `UnifiedTrackingBanner.jsx` | The dark navy callout block reused on the Dashboard reinforcing the tracking USP. |
| `ProtectedRoute.jsx` | Route guard, see §4. |

Note: there's no separate `MobileNav.jsx` — responsive/mobile nav behavior is built directly into `Navbar.jsx` (public pages) and `DashboardLayout.jsx` (drawer sidebar), rather than factored into its own file.

---

## 13. Design system

Defined in `tailwind.config.js` + `index.css`:

- **Colors**: `navy` (50–900, primary brand) and `saffron` (50–900, accent — used sparingly for CTAs/badges, not backgrounds).
- **Fonts**: `font-heading` (Lora serif, via Google Fonts) for all headings/titles, `font-body`/default sans (Inter) for body text — this pairing is what keeps the UI from reading as a generic "Inter-everywhere" AI-template layout.
- **Cards**: `rounded-xl border border-gray-200 bg-white` — hairline borders instead of heavy shadows.
- **Motion**: only `transition-colors` / `transition-transform` on hover — no page-transition animations.

---

## 14. Page-by-page notes worth knowing

- **Landing (`Landing.jsx`)** — hero search bar reuses `SearchBar`; "Browse Services" / "Get Started" buttons route to `/services` and `/login`. Footer explicitly disclaims real Aadhaar/DigiLocker/government integration.
- **Login (`Login.jsx`)** — plain form + "Use Demo Account" button calling `loginDemo()`.
- **Dashboard (`Dashboard.jsx`)** — welcome banner, 5 quick-action cards, then the two-column USP layout: **My Applications (left, latest 4)** / **Recommended Schemes (right, top 3 via `getRankedSchemes()`)**, Profile Completion card (`ProgressBar`), Recent Activity (static mock feed), and the `UnifiedTrackingBanner` at the bottom.
- **Profile (`Profile.jsx`)** — grouped form (Personal/Address/Education/Employment/Financial/Other) that calls `updateProfile()` on save; this is what feeds the matching engine everywhere else.
- **Services / Schemes (`Services.jsx` / `Schemes.jsx`)** — client-side search + category filter over the static data arrays; Schemes additionally sorts by match % via `getRankedSchemes()`.
- **ServiceDetail** — see §10, flow #1.
- **SchemeDetail** — see §10 & §9, the 5-step apply wizard (`STEPS` array drives a simple `step` index state machine).
- **MockPortal** — see §10 flow #2 and the code walkthrough in §"Smart Auto-Fill" below.
- **Applications / ApplicationDetail** — see §10.
- **Documents (`Documents.jsx`)** — lists `getDocuments()`, all marked mock/reusable, no real DigiLocker claim.
- **Consent (`Consent.jsx`)** — renders the three `consentApi` buckets with Grant/Decline/Revoke actions.
- **Officer (`Officer.jsx`)** — separate, publicly-routed mock view: stat tiles, an applications table (synthesized multi-citizen mock data), a "Mock Integration Status" panel, and a data-mapping / interoperability-flow visual — all explicitly labeled conceptual/mock.
- **Grievances / Help** — lightweight stub-but-functional pages (`grievanceApi.js` backs a real add-to-list form on Grievances; Help is a static FAQ accordion).

### Smart Auto-Fill (Mock Portal) walkthrough

1. User lands on `/mock-portal/:serviceId` with an **empty** form styled like a generic application form, with a yellow banner clarifying it's a demo, not a real external site.
2. Clicking **"Fill with GovConnect"** opens `ConsentModal` listing exactly which fields will be shared.
3. **Allow & Fill** → `handleAllowFill()` copies matching fields from `getProfile()` into local form state and marks each with an `autofilled` flag, which renders a small green "✓ Auto-filled from GovConnect Profile" note under that field. Fields stay editable (typing into a field clears its `autofilled` flag).
4. Submitting the form calls `addApplication({ type: 'DIGITAL_SERVICE', ... })` and navigates straight to that new application's tracking detail page — closing the loop: **Profile → Auto-Fill → Apply → Track**.

---

## 15. Known simplifications (by design, for a hackathon prototype)

- No real backend/API — swapping `services/*.js` internals for `fetch` calls is the intended upgrade path.
- No real auth, Aadhaar, DigiLocker, or government database/API integration anywhere — all such claims are explicitly disclaimed in the UI copy (Landing footer, Help FAQ, Documents page, Consent page, Mock Portal banner).
- Status changes in Applications are static seed data / whatever `updateApplicationStatus()` is called with — there's no timer/cron simulating real progression.
- `/officer` and `/services` + `/schemes` are intentionally not behind login (see §4); everything else touching personal data is.
