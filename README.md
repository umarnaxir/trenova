# Trenova 🛍️👗

Trenova is a modern full-stack e-commerce web application tailored for fashion and activewear in India. The monorepo consists of a **Next.js (App Router)** storefront and admin panel, and a **Node.js, Express, PostgreSQL, and Prisma** REST API backend.

---

## ⚡ Quick Start (Run Locally in 5 Minutes)

### 1. Prerequisites
- **Node.js**: `v20.9.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v10+` (bundled with Node.js)
- **PostgreSQL**: `v14+` running locally, in Docker, or via a cloud provider like [Neon](https://neon.tech) / [Supabase](https://supabase.com).

---

### 2. Database Setup

Create a local database named `trenova`:

```sql
-- In psql or your database client:
CREATE DATABASE trenova;
```

---

### 3. Backend Setup

Open a terminal in the project root:

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file from template
# On Windows (PowerShell):
Copy-Item .env.example .env
# On Mac/Linux:
# cp .env.example .env
```

Edit `backend/.env` with your PostgreSQL connection string and a JWT secret:

```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/trenova?schema=public"
JWT_SECRET="super-secret-local-jwt-key-trenova-dev-2026"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:3000"

# Optional / External services (Leave as dummy for local development):
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Generate Prisma client, run migrations, and seed initial catalog + admin data:

```bash
# Generate Prisma Client & apply schema
npx prisma generate
npx prisma migrate deploy

# Seed database with sample products, categories, coupons, and superadmin account
npm run db:seed

# Start backend dev server
npm run dev
```

> 🚀 Backend is now live at: `http://localhost:5000` (Health check: `http://localhost:5000/api/v1/health`)

---

### 4. Frontend Setup

Open a **second terminal** in the project root:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create local environment file from template
# On Windows (PowerShell):
Copy-Item .env.example .env.local
# On Mac/Linux:
# cp .env.example .env.local
```

Ensure `frontend/.env.local` contains:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

Start frontend dev server:

```bash
npm run dev
```

> 🚀 Frontend is now live at: `http://localhost:3000`

---

## 🔑 Default Seeded Credentials

When you run `npm run db:seed` in the backend, the following local accounts are created:

### 👑 Admin Portal (`http://localhost:3000/admin`)
- **Email:** `umar@gmail.com`
- **Password:** `1122`
- **Role:** `SUPERADMIN`

### 🛒 Customer Storefront (`http://localhost:3000`)
- You can register any new customer account directly from the storefront login/register modal or use OTP simulation.

---

## 📁 Repository Structure

```text
trenova/
├── backend/                        # Node.js + Express + Prisma API
│   ├── prisma/
│   │   ├── schema.prisma           # Prisma schema definition
│   │   └── migrations/             # SQL migration history
│   ├── src/
│   │   ├── controllers/            # Route handler logic
│   │   ├── routes/                 # Express route definitions (/api/v1/*)
│   │   ├── middlewares/            # Auth, validation, error handling
│   │   ├── lib/                    # Prisma client, Cloudinary, Razorpay helpers
│   │   ├── seed.ts                 # Admin seed script
│   │   └── seedCatalog.ts          # Catalog & demo product seed script
│   ├── mock_data.json              # Seed data for categories, products, coupons
│   ├── package.json
│   └── .env.example
│
└── frontend/                       # Next.js (App Router) Storefront & Admin
    ├── app/                        # Next.js App Router (Storefront, Admin, API)
    │   ├── (storefront)/           # Public shopping pages (catalog, product, cart)
    │   ├── (account)/              # Customer profile, orders, addresses
    │   └── admin/                  # Admin management dashboard
    ├── components/                 # Shared UI & atomic design components
    ├── features/                   # Domain features (admin, cart, catalog, checkout)
    ├── hooks/stores/               # Zustand state stores
    ├── services/                   # Frontend API integration layer
    ├── package.json
    └── .env.example
```

---

## 🌐 Main Application URLs

| Surface | URL | Description |
|---|---|---|
| **Storefront** | [http://localhost:3000](http://localhost:3000) | Public customer shopping experience |
| **Admin Panel** | [http://localhost:3000/admin](http://localhost:3000/admin) | Product, order, coupon, and inventory management |
| **Backend Health** | [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health) | Backend health verification endpoint |
| **API Catalog** | [http://localhost:5000/api/v1/catalog/products](http://localhost:5000/api/v1/catalog/products) | Public product catalog REST endpoint |
| **Prisma Studio** | `npx prisma studio` (in `backend/`) | GUI database browser at `http://localhost:5555` |

---

## 🛠️ Available Scripts & Commands

### Backend (`/backend`)

| Command | Description |
|---|---|
| `npm run dev` | Starts dev server with hot-reload via `tsx watch` |
| `npm run build` | Compiles TypeScript into `backend/dist` |
| `npm start` | Runs compiled production server from `dist/` |
| `npm run db:seed` | Runs admin and catalog database seeds |
| `npx prisma generate` | Generates Prisma client types |
| `npx prisma migrate deploy` | Applies pending database migrations |
| `npx prisma migrate dev` | Creates and applies new database migration |
| `npx prisma studio` | Launches interactive Prisma visual database browser |

### Frontend (`/frontend`)

| Command | Description |
|---|---|
| `npm run dev` | Starts Next.js development server on `0.0.0.0:3000` |
| `npm run build` | Builds optimized production Next.js application |
| `npm start` | Starts Next.js production server |
| `npm run lint` | Runs ESLint check across all files |

---

## 🔌 API Overview (`/api/v1`)

- **`/auth`** — Customer registration, login, profile, OTP
- **`/catalog`** — Public categories, products, filters, search
- **`/coupons`** — Coupon code validation
- **`/orders`** — Checkout flow, order tracking, customer order history
- **`/payments`** — Razorpay payment intent creation, verification, and webhooks
- **`/reviews`** — Product ratings and customer reviews
- **`/admin/auth`** — Admin authentication & team setup
- **`/admin/catalog`** — Admin product CRUD & category management
- **`/admin/orders`** — Order fulfillment, tracking update, status transitions
- **`/admin/inventory`** — Stock management & size variant inventory
- **`/admin/coupons`** — Promotional discount creation & limits
- **`/admin/analytics`** — Revenue, order volume, and top products metrics
- **`/admin/media`** — Image upload (Cloudinary / local upload)

---

## ❓ Troubleshooting & FAQs

### 1. Database Connection Error (`P1001: Can't reach database server`)
- Verify PostgreSQL service is active on your machine.
- Check `DATABASE_URL` credentials in `backend/.env`.
- If using Docker: ensure the container is running with `docker ps`.

### 2. Frontend Not Loading Data / Network Errors
- Ensure the backend is running at `http://localhost:5000`.
- Verify `frontend/.env.local` contains `NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1`.
- Restart the Next.js server (`npm run dev`) after modifying `.env.local`.

### 3. Payment Gateway in Local Development
- By default, you can test checkout using **Cash on Delivery (COD)** or demo payment mode without Razorpay API keys.
- To test real Razorpay workflows, supply test API keys in `backend/.env` (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`) and `frontend/.env.local` (`NEXT_PUBLIC_RAZORPAY_KEY_ID`).

---

## 🚀 Handoff & Git Best Practices

Before pushing code:
1. Ensure `.env` and `.env.local` are **NOT** committed to Git (they are in `.gitignore`).
2. Run database migrations and test that `npm run db:seed` executes cleanly.
3. Test production builds:
   - In `backend/`: `npm run build`
   - In `frontend/`: `npm run build`
