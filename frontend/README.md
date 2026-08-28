# Trenova

Premium fashion & activewear storefront for India — Next.js App Router, styled-components, and a mock data layer ready to swap for a real backend.

The app is split into three surfaces that share types, services, and design tokens:

| Surface | Route group | Who uses it |
|---|---|---|
| **Storefront** | `app/(storefront)` | Shoppers — catalog, product, cart, checkout, content pages |
| **User panel** | `app/(account)` + `app/(auth)` | Signed-in customers — orders, addresses, profile |
| **Admin panel** | `app/
` | Team — catalog, orders, inventory, settings |

All three talk to the same **service layer** (`services/`). Today that layer reads/writes in-memory + `localStorage` mocks. A backend developer replaces those implementations without rewriting UI.

---

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
|---|---|
| `yarn dev` | Dev server on `0.0.0.0:3000` (LAN-friendly) |
| `yarn build` | Production build |
| `yarn start` | Serve the production build |
| `yarn lint` | ESLint |

### Environment

Copy values into `.env.local` (gitignored):

| Variable | Used by |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, JSON-LD (`constants/site.ts`) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Checkout (browser) |
| `RAZORPAY_KEY_SECRET` | Order create + signature verify (`app/api/razorpay/*`) |

Without Razorpay keys, checkout still works in **demo mode**.

Path alias: `@/*` → project root (`tsconfig.json`).

### Demo logins (mock only)

| Surface | Email | Password |
|---|---|---|
| Storefront / account | `umar@example.com` | `1122` |
| Admin | `umar@gmail.com` | `1122` |

These live in `services/mock/usersStore.ts` and `services/mock/adminRepository.ts`. Remove them when real auth is wired.

---

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **styled-components** + **styled-system** (layout primitives)
- **Zustand** (client state, persisted where needed)
- **react-hook-form** + **zod** (forms)
- **framer-motion** (hero + navbar)
- **lucide-react** (icons)

There is **no** React Query / Redux / CSS modules. Server components fetch via `services/*`; client components use Zustand stores.

---

## Architecture

```
Browser
  ├── Storefront  ──┐
  ├── User panel  ──┼── services/*.service.ts  ──  services/mock/*  (today)
  └── Admin panel ──┘                              └── HTTP API     (later)

Auth
  ├── Customer  →  hooks/stores/authStore.ts   →  usersStore (localStorage)
  └── Admin     →  hooks/stores/adminAuthStore →  team members (adminRepository)
```

**Rule for backend work:** UI and pages import `services/*.service.ts` (and a few store helpers). They should not import `services/mock/*` except where noted below. Replace the mock bodies of those services and keep the function signatures.

---

## Project structure

```
trenova/
├── app/                    Next.js routes, layouts, API, SEO
├── components/             Shared UI primitives + storefront chrome
├── features/               Domain UI (account, admin, cart, shop, …)
├── sections/               Homepage-only sections
├── services/               Data access (swap mocks → API here)
│   └── mock/               Seed data + in-memory stores
├── hooks/stores/           Zustand stores
├── types/                  Shared TypeScript models
├── constants/              Site copy, SEO pages, images, admin session key
├── lib/                    SEO, Razorpay, styled-components registry
├── providers/              App-wide theme + toast
├── styles/                 Theme tokens + global CSS
├── utils/                  Currency, dates, inventory, color names
└── public/                 Static images (logo, hero, product photos)
```

### `app/` — routing

Next.js **route groups** (parentheses) do not appear in the URL. They exist so each surface can have its own layout.

| Path | Role |
|---|---|
| `app/layout.tsx` | Root HTML, fonts, metadata, `AppProviders` |
| `app/not-found.tsx` | Global 404 |
| `app/robots.ts` / `app/sitemap.ts` | SEO crawlers |
| `app/(storefront)/` | Public shop + content pages |
| `app/(account)/account/` | Authenticated customer panel |
| `app/(auth)/` | Login / register / forgot password |
| `app/admin/` | Admin dashboard (gated, `noIndex`) |
| `app/api/razorpay/` | Payment order + signature verify |

### `components/` — shared UI

Reusable, presentational. Each folder is typically `Component.tsx` + `Component.styles.ts`.

**Layout (storefront chrome)**

| Component | Purpose |
|---|---|
| `layout/StorefrontShell` | Page background wrapper |
| `layout/AnnouncementBar` | Rotating promo strip |
| `layout/Navbar` | Mega menu, search, cart/wishlist counts, auth modal |
| `layout/Footer` | Links, newsletter, payment icons, legal |

**Primitives**

`Box` (styled-system base), `Flex`, `Stack`, `Grid`, `Container`, `Text`, `Button`, `IconButton`, `Input`, `TextArea`, `Select`, `Modal`, `Loader`, `Badge`, `Pagination`.

**Commerce**

`ProductCard`, `Price`, `Rating`, `ReviewCard`, `QuantityStepper`, `SearchBar`, `EmptyState`, `PaymentIcons`, `Logo`, `SafeImage`, `WhatsAppButton`, `Toast`, `PageShell`, `Breadcrumb`, `VisuallyHidden`.

**SEO**

`seo/JsonLd` — injects JSON-LD script tags on pages.

### `features/` — domain modules

Feature folders own screens that are more than a primitive. Pages in `app/` stay thin: fetch data / set metadata, then render a feature.

| Folder | Responsibility |
|---|---|
| `account/` | Account gate, sidebar shell, dashboard/profile styles |
| `admin/` | Admin chrome, tables, forms, product editor, search |
| `auth/` | Login page, login/register modal, register panel, schemas |
| `cart/` | Cart lines, coupon, totals |
| `checkout/` | Checkout form, Razorpay/COD, payment brand marks |
| `contact/` | Contact form |
| `content/` | CMS-style pages (about, policies, FAQ accordion, track order) |
| `newsletter/` | Footer subscribe form |
| `product/` | PDP (gallery, variants, reviews, related) |
| `shop/` | Catalog, filters, category hero, categories index |
| `wishlist/` | Saved products grid |

### `sections/home/`

Homepage composition only: `Hero`, `ShopByCategory`, `TrustBar`, `ProductRail`, `DualPromoBanners`, `InstagramGallery`. Wired from `app/(storefront)/page.tsx`.

### `services/` — backend integration surface

| File | Domain | Mock source |
|---|---|---|
| `product.service.ts` | Catalog list/filter, PDP, related, search, featured/best sellers | `mock/catalogStore.ts` |
| `category.service.ts` | Categories + mega menu | `mock/categories.ts` |
| `user.service.ts` | Place order, list orders | `mock/usersStore.ts` + catalog stock |
| `coupon.service.ts` | Validate coupon at cart/checkout | `mock/coupons.ts` |
| `review.service.ts` | Product reviews | `mock/reviews.ts` |
| `instagram.service.ts` | Home Instagram grid | `mock/catalogStore.ts` |
| `newsletter.service.ts` | Subscribe (stub success) | none yet |
| `admin.service.ts` | All admin CRUD | `mock/adminRepository.ts` |

`admin.service.ts` is a thin façade over `adminRepository`. Keep that split when you add a real API: UI stays on `admin.service.ts`.

### `hooks/stores/` — client state

| Store | Persist key | Purpose |
|---|---|---|
| `authStore` | `trenova-auth` | Customer session |
| `adminAuthStore` | `trenova-admin-auth` | Admin session |
| `cartStore` | `trenova-cart` | Cart lines + applied coupon |
| `wishlistStore` | `trenova-wishlist` | Saved products |
| `recentlyViewedStore` | `trenova-recently-viewed` | Last viewed PDPs (written on PDP) |
| `uiStore` | (memory) | Toasts, mobile menu, search, auth modal |
| `adminUiStore` | `trenova-admin-ui` | Sidebar collapse, admin search query |
| `siteSettingsStore` | `trenova-site-settings` | Public store contact/social (synced from Admin → Settings) |

`hooks/useIsClient.ts` avoids hydration mismatches for persisted counts.

### `types/`

Canonical models. UI, services, and mocks all import from here.

| File | Models |
|---|---|
| `product.ts` | Product, images, sizes, `sizeStock`, filters, pagination |
| `category.ts` | Category tree |
| `cart.ts` | Cart line, coupon |
| `user.ts` | User, address, order, order status |
| `admin.ts` | Admin session, team, inventory, CMS, notifications, settings |
| `review.ts` | Review |

### `constants/`

| File | Purpose |
|---|---|
| `site.ts` | Brand, legal, contact, currency, OG image |
| `seoPages.ts` | Per-route titles, descriptions, FAQs, breadcrumbs |
| `categoryImages.ts` | Unsplash URLs for category lifestyle shots |
| `adminAuth.ts` | Admin session storage key |

### `lib/`

| File | Purpose |
|---|---|
| `seo.ts` | Metadata helpers + JSON-LD builders |
| `razorpay.ts` | Server: create order, verify HMAC signature |
| `razorpayClient.ts` | Browser: load Checkout.js and open modal |
| `registry.tsx` | styled-components SSR stylesheet |
| `shouldForwardSystemProp.ts` | Stop styled-system props leaking to DOM |

### `public/` — assets actually in use

```
public/
├── logo/logo.png              Favicon / JSON-LD / footer mark
├── logo/nav-logo.png          Navbar wordmark
├── images/hero/
│   ├── hero-01.png … hero-03.png      Desktop hero + promo banners
│   ├── mob-hero-01.png … 03.png       Mobile hero
│   ├── cover-01.png                   OG image + shop JSON-LD
│   └── cover-02.png                   Search JSON-LD image
└── products/
    ├── {hoodie,tee,joggers,polo,jacket,shorts,women-tee,women-active}-{front,left,right}.jpg
    ├── instagram-1.jpg … instagram-6.jpg
    └── collection-{layers,women,essentials}.jpg
```

Category tiles on the storefront use **remote Unsplash** URLs from `constants/categoryImages.ts` (allowed in `next.config.ts`).

---

## Storefront (frontend)

Layout: `AnnouncementBar` + `Navbar` + `<main>` + `Footer` + WhatsApp button.

| Route | Page |
|---|---|
| `/` | Home — hero, categories, featured + best-seller rails, Instagram |
| `/shop` | Full catalog |
| `/search` | Search results |
| `/categories` | Category index |
| `/categories/[slug]` | Filtered catalog + category hero |
| `/product/[slug]` | Product detail |
| `/cart` | Cart |
| `/checkout` | Checkout + payment |
| `/wishlist` | Wishlist |
| `/about` `/contact` `/faq` `/size-guide` `/track-order` | Content |
| `/shipping-policy` `/returns-policy` `/payment-policy` `/privacy-policy` `/terms` | Policies |
| `/coming-soon` | Future drops |

Home data: `getFeaturedProducts`, `getBestSellers`, `getHomeInstagramShots`.  
Catalog: `getProducts(filters)` — category, query, price, sizes, colors, sort, pagination.  
Special slugs (`sale`, `best-sellers`, `new-arrivals`, `featured`) are handled inside `product.service.ts`.

---

## User panel

Layout reuses storefront chrome, then wraps pages in:

1. `AccountGate` — redirects to `/login` if unauthenticated  
2. `AccountShell` — sidebar (`AccountNav`) + main

| Route | Purpose |
|---|---|
| `/account` | Dashboard (order / wishlist / cart / address counts) |
| `/account/orders` | Order history |
| `/account/addresses` | Address book |
| `/account/profile` | Name, email, phone, password |
| `/account/profile/deactivate` | Deactivate account |
| `/account/profile/delete` | Schedule account deletion |

Auth pages (`/login`, `/register`, `/forgot-password`) live in `app/(auth)` — same navbar, no footer. Register opens the auth modal (`RegisterPageClient` + `RegisterPanel`). Navbar `LoginModal` handles both login and register.

Wishlist and cart stay on the storefront (`/wishlist`, `/cart`) but are linked from the account sidebar.

---

## Admin panel

`app/admin/layout.tsx` wraps every admin route in `AdminGate`. Unauthenticated users see `AdminLogin`. Authenticated users get `AdminShell` (sidebar + top bar + global search).

**Primary nav**

| Route | Purpose |
|---|---|
| `/admin` | Dashboard stats, recent orders |
| `/admin/products` | Catalog CRUD, import/export, homepage flags |
| `/admin/users` | Storefront customers |
| `/admin/orders` | Order status updates |
| `/admin/inventory` | Per-size stock |
| `/admin/coupons` | Discount codes |
| `/admin/instagram` | Home Instagram shots |
| `/admin/analytics` | Charts from mock analytics |
| `/admin/team` | Admin users + roles + passwords |
| `/admin/settings` | Store name, contact, social (feeds `siteSettingsStore`) |
| `/admin/profile` | Signed-in admin profile / password |

**Additional routes** (URL-reachable; not in the main sidebar)

`/admin/cms`, `/admin/media`, `/admin/newsletter`, `/admin/notifications`

Admin list pages share `AdminPage` + `DataTable` + `AdminPagination`. Product create/edit uses `ProductForm`.

---

## How the three surfaces connect

```
Product catalog
  storefront  ← getProducts / getProductBySlug     ← catalogStore
  admin       ← getAdminProducts / create/update   ← same catalogStore

Orders
  checkout    → placeOrder()                       → usersStore + decrement sizeStock
  account     ← getUserOrders(userId, email)
  admin       ← getAdminOrders / updateAdminOrderStatus

Users
  register/login  → authStore → usersStore
  admin users     ← listAdminUsers()

Settings
  admin settings  → siteSettingsStore (persist)
  footer / WhatsApp / contact  ← useSiteSettings()
```

Storefront, account, and admin **must stay on these services**. Do not duplicate fetch logic inside pages.

---

## Authentication & authorization

### Customers

- `useAuthStore.login / register / logout / updateProfile / changePassword / deactivateAccount / deleteAccount`
- Session: Zustand `persist` (`trenova-auth`)
- Passwords live on `RegisteredUser` in `usersStore` (mock only)
- Inactive / pending-deletion accounts cannot sign in
- `AccountGate` protects `/account/*`
- Checkout can run as guest (order still upserts a user by email)

### Admins

- `useAdminAuthStore.login` → `authenticateTeamMember` in `adminRepository`
- Session: `ADMIN_SESSION_KEY` (`trenova-admin-auth`)
- Roles (`Admin` | `Manager` | `Editor`) are stored but **not enforced** yet — add permission maps in `AdminGate` / nav when the API exists
- Team passwords are edited in Admin → Team / Profile

### Backend replacement

Replace store methods with `POST /auth/login`, `POST /auth/register`, JWT/httpOnly cookies, etc. Keep the same Zustand shape so UI does not change. Move password hashing and session invalidation to the server.

---

## Products, cart, wishlist, orders, payments

### Products

`types/product.ts` is the contract: slug, price, `compareAtPrice`, colors, sizes, **`sizeStock`** (source of truth), flags (`isFeatured`, `isBestSeller`, `isNewArrival`, `isTrending`, `isOnSale`).

Admin `ProductForm` writes the same shape. Homepage rails read featured / best-seller flags.

### Cart & wishlist

Client-only Zustand. On a real backend:

- Cart: persist per user (`GET/PATCH /cart`) and still keep a guest local cart that merges on login
- Wishlist: `GET/POST/DELETE /wishlist`
- Re-validate `maxStock` from live `sizeStock` before checkout

### Orders

`placeOrder` in `user.service.ts`:

1. Decrements `sizeStock` on the catalog  
2. Upserts the customer  
3. Appends an `Order` (`pending` → typically `confirmed`)

Statuses: `pending | confirmed | shipped | delivered | cancelled`. Admin updates status via `updateAdminOrderStatus`.

### Payments

Checkout (`features/checkout/CheckoutForm.tsx`):

1. UPI / card → `POST /api/razorpay/create-order` → Razorpay Checkout.js → `POST /api/razorpay/verify` → `placeOrder`  
2. COD → `placeOrder` directly  

Replace the API routes with your payment service; keep `lib/razorpayClient.ts` if you stay on Razorpay.

### Coupons

`validateCoupon(code, subtotal)` — percent or fixed, optional `minOrder`. Cart and checkout both call this. Admin CRUD: `createAdminCoupon` / `updateAdminCoupon` / `deleteAdminCoupon`.

---

## State management conventions

- **Server data** (catalog on first paint, SEO pages): fetch in Server Components via `services/*`.
- **Client session / cart / UI**: Zustand. Persist only what must survive refresh.
- **Toasts**: `useUiStore.pushToast` — do not add a second notification system.
- **Admin list search**: `adminUiStore.globalSearchQuery` (header) filters tables.
- Avoid importing `services/mock/*` from `app/` pages. Exceptions today: `TrackOrderForm` and `RegisterPanel` read `usersStore` directly — fold those into `user.service.ts` when you add the API.

---

## Backend integration map

Replace mock implementations; keep signatures.

| Feature | Call from UI | Implement on the server |
|---|---|---|
| Product list / filters | `getProducts` | `GET /products` |
| Product PDP | `getProductBySlug` | `GET /products/:slug` |
| Related | `getRelatedProducts` | `GET /products/:id/related` |
| Search | `searchProducts` | `GET /products?q=` |
| Homepage rails | `getFeaturedProducts`, `getBestSellers` | flagged products or merchandising API |
| Categories / mega menu | `getCategories`, `getMegaMenuCategories` | `GET /categories` |
| Reviews | `getProductReviews` | `GET /products/:id/reviews` |
| Coupons | `validateCoupon` | `POST /coupons/validate` |
| Place order | `placeOrder` | `POST /orders` (atomic stock + payment) |
| User orders | `getUserOrders` | `GET /orders?user=` |
| Newsletter | `subscribeNewsletter` | `POST /newsletter` (also feed Admin → Newsletter) |
| Instagram | `getHomeInstagramShots` | CMS or Instagram Graph |
| Admin CRUD | `admin.service.ts` | REST/GraphQL admin API + authz |
| Payments | `app/api/razorpay/*` | Your gateway + webhook to mark orders paid |
| Auth | `authStore` / `adminAuthStore` | JWT or session cookies; never store raw passwords client-side |
| Uploads | Admin `ImageDropzone` (data URLs today) | S3/Cloudinary; store URLs on the product |

`services/mock/catalogStore.ts` is the shared mutable catalog so admin edits appear on the storefront in the same browser. A real API makes that a database.

Seed catalog: `services/mock/products.ts` + `dummyProducts.ts`. You can delete dummy seeds once the API is live.

---

## Conventions for future developers

1. **Pages stay thin.** Put UI in `features/` or `components/`. Put data in `services/`.
2. **One model, three surfaces.** If admin and storefront disagree, fix `types/` first.
3. **Do not add a second styling system.** New UI uses styled-components and `styles/theme.ts` tokens (black / white / gold).
4. **Colocate styles** as `Name.styles.ts` next to the component.
5. **Keep files focused.** Split when a file is doing two jobs — not to hit an arbitrary line count.
6. **No barrel `index.ts` files** unless a folder is imported from many places and the public API is stable.
7. **Client components** need `"use client"` (Zustand, forms, styled-components that use theme).
8. **Images** go through `next/image` / `SafeImage`. Add hostnames to `next.config.ts` `images.remotePatterns` for new CDNs.
9. **SEO** copy lives in `constants/seoPages.ts`. Use `pageMetadata(key)` + `JsonLd`.
10. **Inventory** always goes through `utils/inventory.ts` (`sizeStock` is canonical; `stock` is the sum).
11. **Do not commit `.env*`.** Use `.env.local` locally.
12. Admin roles are placeholders — enforce them when the backend exists.

---

## Design tokens

`styles/theme.ts` — colors, type scale, space, radii, breakpoints (`theme.mediaQueries`).  
Fonts: **Manrope** (body) and **Cormorant Garamond** (display), loaded in `app/layout.tsx`.

---

## Current limitations (intentional mocks)

- No real database; catalog/orders/users reset per browser (and some in-memory admin state resets on refresh).
- Newsletter subscribe does not write Admin → Newsletter.
- Contact form toasts success; it does not send email.
- Admin CMS/media/newsletter/notifications are functional mocks, not wired to the public pages’ source of truth (except Instagram + settings).
- Payment webhooks are not implemented — verification is request/response only.

These are the first things a backend developer should replace, in roughly this order: **auth → products → inventory → cart/orders → payments → content**.
