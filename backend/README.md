# Trenova Backend API 🚀

REST API server built with **Node.js**, **Express 5**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**.

---

## ⚡ Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
# Windows PowerShell:
Copy-Item .env.example .env
# Linux / macOS:
# cp .env.example .env
```

Ensure `DATABASE_URL` and `JWT_SECRET` are set in `.env`:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/trenova?schema=public"
JWT_SECRET="super-secret-local-jwt-key"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:3000"
```

### 3. Database Migration & Seeding
```bash
# Generate Prisma client and apply schema
npx prisma generate
npx prisma migrate deploy

# Seed initial catalog products, categories, coupons, and superadmin account
npm run db:seed
```

### 4. Run Server
```bash
# Development (with hot-reloading)
npm run dev

# Production Build & Run
npm run build
npm start
```

---

## 🔑 Seeded Admin Account
- **Email:** `umar@gmail.com`
- **Password:** `1122`
- **Role:** `SUPERADMIN`

---

## 🛠️ Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Runs backend in development mode with `tsx watch` |
| `npm run build` | Compiles TypeScript into `/dist` |
| `npm start` | Runs compiled production JavaScript |
| `npm run db:seed` | Seeds database with admin + catalog mock data |
| `npx prisma studio` | Opens Prisma GUI database browser at `http://localhost:5555` |
| `npx prisma migrate dev` | Generates a new migration during schema changes |

---

## 🔌 API Routes Overview (`/api/v1`)

- `GET  /api/v1/health` - Health check
- `POST /api/v1/auth/*` - Customer authentication (register, login, profile, OTP)
- `GET  /api/v1/catalog/*` - Public products and categories
- `POST /api/v1/coupons/validate` - Validate discount coupons
- `POST /api/v1/orders` - Place order / checkout
- `POST /api/v1/payments/*` - Razorpay integration and webhooks
- `POST /api/v1/reviews` - Product reviews and ratings
- `POST /api/v1/admin/*` - Protected admin endpoints (catalog, orders, inventory, coupons, team, analytics)
