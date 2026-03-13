# Luxeskinglow Store MVP — Design Document

**Date:** 2026-03-13
**Sprint:** 1 of 2 (Store MVP)
**Stack:** Next.js 14 (App Router) · Supabase · Paystack · Tailwind CSS · TypeScript

---

## Overview

Luxeskinglow is a skincare product marketplace. This document covers Sprint 1 — the public storefront and payment flow. Sprint 2 will cover the admin dashboard.

**Sprint 1 goal:** Customers can browse products, add to cart, and complete a purchase via Paystack.

---

## Architecture

### Route Structure

```
app/
├── (store)/
│   ├── page.tsx                  # Homepage
│   ├── products/
│   │   ├── page.tsx              # Product grid
│   │   └── [slug]/page.tsx       # Product detail
│   ├── checkout/
│   │   ├── page.tsx              # Checkout form
│   │   └── success/page.tsx      # Order confirmation
│   └── layout.tsx                # Store shell (nav, footer)
├── (admin)/                      # Sprint 2 — deferred
└── api/
    └── paystack/
        ├── initialize/route.ts
        └── webhook/route.ts
```

### Project Structure

```
luxeskinglow/
├── app/
├── components/
│   └── store/
│       ├── HeroSlider.tsx
│       ├── BeforeAfterSlider.tsx
│       ├── ProductCard.tsx
│       ├── ProductZoom.tsx
│       ├── CartDrawer.tsx
│       ├── TestimonialsCarousel.tsx
│       └── CheckoutForm.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── paystack.ts
│   ├── cart-store.ts
│   └── utils.ts
├── hooks/
│   ├── useCart.ts
│   ├── useProducts.ts
│   └── useInventory.ts
├── content/blog/                 # Scaffolded, unused in Sprint 1
├── scripts/
│   └── seed.ts
└── supabase/
    └── migrations/
```

---

## Data Model

### Tables

#### `products`
```sql
id uuid primary key default gen_random_uuid()
name text not null
slug text unique not null
description text
price numeric(10,2) not null
compare_price numeric(10,2)           -- shows discount ribbon if set
images jsonb default '[]'             -- [{url, alt, is_primary}]
category text
tags text[]
inventory_count integer default 0
low_stock_threshold integer default 5
is_active boolean default true
weight_grams integer
created_at timestamptz default now()
updated_at timestamptz default now()
```

#### `orders`
```sql
id uuid primary key default gen_random_uuid()
reference text unique not null        -- Paystack reference
customer_name text not null
customer_email text not null
customer_phone text
shipping_address jsonb
items jsonb not null                  -- [{product_id, name, price, qty, image}]
subtotal numeric(10,2)
shipping_fee numeric(10,2) default 0
total numeric(10,2) not null
status text default 'pending'         -- pending|paid|processing|shipped|delivered|cancelled
paystack_data jsonb
notes text
created_at timestamptz default now()
updated_at timestamptz default now()
```

#### `customers`
Auto-populated from orders via Paystack webhook.
```sql
id uuid primary key default gen_random_uuid()
email text unique not null
name text
phone text
total_orders integer default 0
total_spent numeric(10,2) default 0
first_order_at timestamptz
last_order_at timestamptz
```

#### `reviews`
```sql
id uuid primary key default gen_random_uuid()
product_id uuid references products(id)
customer_name text
rating integer check (rating between 1 and 5)
comment text
before_image text
after_image text
is_approved boolean default false
created_at timestamptz default now()
```

#### `blog_posts`
Schema created but unused in Sprint 1.

### RLS Policies
- `products` — public read (is_active=true), service role full access
- `orders` — service role only (no public read)
- `reviews` — public read (is_approved=true), public insert, service role full access
- `blog_posts` — public read (is_published=true)

---

## Store UI

### Homepage Sections

1. **Hero Slider** (Swiper.js)
   - Full-width, 80vh height
   - 3 slides: background image + dark overlay, Cormorant Garamond headline, gold "Shop Now" CTA
   - Autoplay 5s, fade transition, gold navigation arrows
   - Pulsing radial gold glow via CSS keyframe animation

2. **Product Highlights**
   - Top 4 latest active products from Supabase
   - 4-col desktop / 2-col mobile grid
   - `ProductCard`: hover zoom scale(1.05), gold "Add to Cart", discount ribbon if `compare_price` set
   - Blush background, ivory border

3. **Before/After Showcase**
   - `react-compare-image` component
   - "Real Results" heading — Cormorant Garamond 48px gold
   - 2 transformations side by side desktop, stacked mobile

4. **Testimonials Carousel** (Swiper.js)
   - Gold stars, quote, customer name + city
   - Blush cards, autoplay 4s, 3 visible desktop

5. **Floating Cart Button**
   - Fixed bottom-right, gold circle, item count badge
   - Opens `CartDrawer` on click

### Product Grid (`/products`)
- Filter sidebar: category checkboxes, price range slider, in-stock toggle
- Sort: Newest / Price Low-High / Price High-Low
- Responsive: 4 cols → 2 cols → 1 col
- `ProductCard` hover: image scales + "Quick Add" slides up
- "Only X left!" badge if inventory ≤ threshold
- Out of stock overlay if inventory = 0

### Product Detail (`/products/[slug]`)
- SSG via `generateStaticParams`
- Left: image gallery + `react-image-magnify` zoom (desktop), swipeable (mobile)
- Right: name, price, qty selector, gold "Add to Cart"
- Tabs: Description | Reviews | How to Care
- Reviews: star breakdown chart + individual cards (before/after via `react-compare-image`)
- Related products: 4 cards at bottom

### Cart
- Zustand store with localStorage persistence (no separate `/cart` page)
- `CartDrawer` slides in from right
- Items list: image, name, price, qty stepper, remove
- "Proceed to Checkout" → `/checkout`
- Empty state with bag icon

### Checkout (`/checkout`)
- `react-hook-form` + `zod` validation
- Fields: Full Name, Email, Phone (+254), Street, City, County, Postal Code, Notes
- Order summary panel: items, subtotal, KES 300 flat shipping, total
- Trust badges: padlock + Paystack logo
- On submit → POST `/api/paystack/initialize` → redirect to Paystack hosted page

### Payment Flow
```
POST /api/paystack/initialize
  1. Create order in Supabase (status: pending)
  2. Call Paystack initialize API
  3. Return { authorization_url, reference }
  → Client redirects to Paystack

POST /api/paystack/webhook
  1. Verify HMAC SHA512 signature
  2. On charge.success:
     - Update order status → paid
     - Decrement inventory_count per item
     - Upsert customer (total_orders, total_spent)
     - Store paystack_data on order
  3. Return 200

GET /checkout/success?reference=...
  - Fetch order by reference
  - Show confirmation + clear cart
```

---

## Theme

| Token | Value | Usage |
|-------|-------|-------|
| `gold` | `#C9A84C` | CTAs, active states, heading accents |
| `gold-light` | `#E8D5A3` | Hover states, subtle accents |
| `blush` | `#F5E6E0` | Card backgrounds, testimonials |
| `ivory` | `#FDFAF7` | Page backgrounds |
| `charcoal` | `#1A1A1A` | Body text |

**Fonts:** Cormorant Garamond (headings) · Inter (body) — via `next/font/google`

---

## Performance (Sprint 1)

- `next/image` with `avif`/`webp` formats, proper `sizes` prop
- `priority` on hero images only
- `blur` placeholder on product images
- Client-side compression before Supabase Storage upload (max 800px, 80KB target)
- SSG for all product pages via `generateStaticParams`

---

## SEO (Sprint 1)

- Title template: `%s | Luxeskinglow`
- `generateMetadata` per product page (name, description, og:image)
- JSON-LD Organization schema on root layout
- `sitemap.ts` for all active products
- `robots.ts`

---

## Seed Data

Script at `scripts/seed.ts`:
- 8 skincare products across 3 categories (Serums, Moisturisers, Bundles)
- 3 approved reviews with mock before/after URLs
- Run: `npx ts-node scripts/seed.ts`

---

## Sprint 2 (Out of Scope)

- Admin dashboard (auth, products CRUD, orders, analytics)
- Blog (MDX)
- Linear issue tracking (TechScrafts/TEC workspace — connect separately)

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Deployment (Post-Sprint 1)

1. Push to GitHub → connect Vercel
2. Set all env vars on Vercel
3. Switch Paystack to live keys
4. Set Paystack webhook URL: `https://yourdomain.com/api/paystack/webhook`
5. Configure Supabase Storage CORS for Vercel domain
6. Lighthouse audit: LCP < 2s, CLS < 0.1
