# Derby Restaurant — React Rewrite Design

**Date:** 2026-03-24
**Status:** Approved

---

## Overview

Single-page React application for Derby Restaurant (Kiambu, Kenya). Showcases the full menu, lets customers build an order, and sends it to WhatsApp. Deployed to Vercel as a static build.

---

## Tech Stack

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | Vite + React | Lightweight SPA, static build, no SSR needed |
| Styling | CSS Modules | Scoped per component, reuses existing CSS design system |
| Language | Plain JavaScript (ES6+) | Simple site, no complex types needed |
| State | useState in App.jsx | Cart is simple, no external state library needed |
| Deployment | Vercel | Auto-detects Vite, zero config |

---

## Design System (unchanged from spec)

- Background: `#0e0b08`, Surface: `#1a1410`
- Gold: `#d4a017`, Amber: `#e07b24`, Cream: `#f5ead8`, Muted: `#8a7a68`
- WhatsApp green: `#25D366`
- Fonts: Playfair Display (headings) + Outfit (body) via Google Fonts CDN
- Border radius: 16px cards, 100px pills

---

## Project Structure

```
derby-restaurant/
├── public/
├── src/
│   ├── App.jsx              ← root: cart state, tab state, cartOpen state
│   ├── App.module.css
│   ├── main.jsx
│   ├── index.css            ← global resets, tokens, fonts
│   ├── data/
│   │   └── menu.js          ← MENU object (4 categories, 24 items)
│   └── components/
│       ├── Navbar/
│       │   ├── Navbar.jsx
│       │   └── Navbar.module.css
│       ├── Hero/
│       │   ├── Hero.jsx
│       │   └── Hero.module.css
│       ├── About/
│       │   ├── About.jsx
│       │   └── About.module.css
│       ├── Menu/
│       │   ├── Menu.jsx
│       │   ├── Menu.module.css
│       │   ├── TabBar.jsx
│       │   ├── TabBar.module.css
│       │   ├── MenuCard.jsx
│       │   └── MenuCard.module.css
│       ├── Cart/
│       │   ├── Cart.jsx
│       │   ├── Cart.module.css
│       │   ├── CartItem.jsx
│       │   └── CartItem.module.css
│       ├── Footer/
│       │   ├── Footer.jsx
│       │   └── Footer.module.css
│       └── Toast/
│           ├── Toast.jsx
│           └── Toast.module.css
├── vercel.json
├── vite.config.js
└── index.html               ← Vite entry (Google Fonts link here)
```

---

## Component Responsibilities

### App.jsx
- State: `cart[]`, `activeTab`, `cartOpen`, `toastMsg`
- Functions: `addToCart`, `updateQty`, `clearCart`, `sendWhatsApp`, `showToast`
- Renders all top-level components, passes props down

### Navbar
- Props: `cartCount`, `onCartToggle`
- Shows logo + cart button with badge

### Hero
- No props — static content
- "View Menu" scrolls to `#menu`, "Call Us" opens WhatsApp

### About
- No props — static content

### Menu
- Props: `activeTab`, `onTabChange`, `onAddToCart`
- Renders TabBar + grid of MenuCards for active category

### TabBar
- Props: `activeTab`, `onTabChange`, `counts`
- Pill buttons, active state gold

### MenuCard
- Props: `item`, `onAddToCart`
- Image with shimmer loading, badge, name, desc, price/variants

### Cart
- Props: `cart`, `isOpen`, `onClose`, `onUpdateQty`, `onClearCart`, `onSendWhatsApp`
- Slides in from right, overlay behind it

### CartItem
- Props: `item`, `onUpdateQty`
- Emoji, name, variant note, qty controls, line total

### Footer
- No props — static content

### Toast
- Props: `message` — shows for 2.2s when message is set

---

## Data Flow

```
App.jsx (cart state)
  ├── Navbar ← cartCount (badge)
  ├── Menu   ← addToCart (passed to MenuCard)
  └── Cart   ← cart items, qty handlers, sendWhatsApp
```

Cart item shape: `{ name, price, emoji, askPrice, qty }`

---

## WhatsApp Order Format

```
🍽️ *NEW ORDER — Derby Restaurant*

📋 *Order Details:*
• 🎉 Special Mega Platter x1 — Ksh 5,000
• 🌯 Chicken Shawarma – Megah x2 — Ksh 1,200
• 🍟 Loaded Fries – BBQ Beef x1 — (price TBC)

💰 *Subtotal: Ksh 6,200*
_(Prices TBC items to be confirmed by restaurant)_

📝 *Notes:* Extra chapati please

_Ordered via Derby Restaurant website_
```

Opens via: `window.open('https://wa.me/254792981907?text=' + encodeURIComponent(msg), '_blank')`

---

## Deployment

`vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

Vercel auto-detects Vite. No environment variables needed.
