# Derby Restaurant — Events, Menu Images & Order Capture Design

**Date:** 2026-03-25
**Status:** Approved

---

## Overview

Four improvements to the Derby Restaurant website:
1. Private & Outdoor Events section on homepage
2. Real Derby photos on menu cards (replacing loremflickr for matched items)
3. Phone number capture modal before WhatsApp redirect, with Supabase order storage
4. Menu data expanded to reflect real Derby menu with proper categories

---

## Section 1 — Events Section

**Component:** `src/components/Events/Events.jsx`
**Placement:** Between `<Menu />` and `<Footer />` in `App.jsx`

Two side-by-side cards:

| Card | Title | Description | CTA |
|---|---|---|---|
| Left | 🎉 Private Events | Birthdays, corporate functions, celebrations — we handle everything indoors | "Book via WhatsApp" |
| Right | 🌿 Outdoor Events | Garden parties, outdoor catering, open-air celebrations | "Book via WhatsApp" |

Each button opens WhatsApp with pre-filled message:
- Private: `"Hi Derby, I'd like to inquire about a Private Event booking."`
- Outdoor: `"Hi Derby, I'd like to inquire about an Outdoor Event booking."`

WhatsApp number: `254792981907` (existing)

Navbar gets a new link: `Events` scrolling to `#events` anchor.

---

## Section 2 — Real Images on Menu Cards

**File:** `src/components/Menu/MenuCard.jsx`

`imgUrl()` helper updated: if `item.img` starts with `/`, use it directly as a local path. Otherwise fall back to loremflickr as before. This makes the component admin-dashboard-ready — when photos are uploaded via admin, they'll use local/CDN paths.

**Image assignments in `src/data/menu.js`:**

| Image File | Menu Item |
|---|---|
| `/Screenshot 2026-03-25 081523.png` | Chicken Shawarma (Crunchies) |
| `/Screenshot 2026-03-25 081634.png` | Derby Freaky Shake (Drinks) |
| `/Screenshot 2026-03-25 081440.png` | Mocktails (Drinks) |
| `/Screenshot 2026-03-25 081704.png` | Derby Chicken Special (Specials) — also replaces "Platter for 4" |
| `/Screenshot 2026-03-25 081555.png` | Milkshakes (Drinks) |

"Platter for 4" item gets `081704.png` assigned, replacing the loremflickr keyword that was returning a bicycle image.

---

## Section 3 — Phone Capture Modal & Supabase Order Storage

### Flow
1. Customer builds cart → clicks "Send Order via WhatsApp"
2. **Modal opens** (instead of immediate WhatsApp redirect)
3. Customer enters **Name** + **Phone Number**
4. On submit → record saved to Supabase → WhatsApp opens with order message
5. Modal closes, cart clears as before

### Component
`src/components/Cart/OrderModal.jsx` — rendered inside `Cart.jsx`, shown when `onSendWhatsApp` is triggered.

### Supabase Table
```sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  items jsonb not null,
  total integer not null,
  has_tbc boolean default false,
  notes text,
  created_at timestamptz default now()
);
```

### Supabase Client
`src/lib/supabase.js` — initialised with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from `.env`.

### Data Saved Per Order
```json
{
  "name": "John",
  "phone": "0712345678",
  "items": [{ "name": "Chicken Shawarma – Megah", "qty": 1, "price": 600 }],
  "total": 600,
  "has_tbc": false,
  "notes": "Extra sauce please"
}
```

---

## Section 4 — Menu Data Expansion

**File:** `src/data/menu.js`

New tab structure:

| Tab ID | Label | Contents |
|---|---|---|
| `specials` | ⭐ Derby Specials | Signature platters, Sizzling Mutton, Freaky Shake, Biriyani |
| `mains` | 🍖 Mains | Beef Corner, Chicken (Broiler + Kienyeji), Fish Corner, Mutton Corner, Main Dishes (Matumbo, Minji, Liver, Pilau) |
| `crunchies` | 🍕 Crunchies & Fast Food | Pizza, Shawarma, Burgers, Chips, Spring Rolls, Wraps, Bakery |
| `drinks` | 🥤 Drinks | Smoothies, Mocktails, Lemonade, Milkshakes, Barista Corner, Juices, Soda |

Key real prices from menu photos applied throughout (KES).

---

## Out of Scope (Next Phase)

- Admin dashboard for menu management and photo uploads
- Order status tracking (pending / confirmed / complete)
- Customer CRM / marketing campaigns
- Full order history page
