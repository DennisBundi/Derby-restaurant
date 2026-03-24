# Derby Restaurant React MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Vite + React static SPA for Derby Restaurant with a full menu, cart, and WhatsApp ordering, deployable to Vercel.

**Architecture:** Single-page React app with all cart/tab state in App.jsx, passed as props to components. Each component has its own CSS Module. Menu data lives in src/data/menu.js. No routing, no backend, no auth.

**Tech Stack:** Vite 6, React 19, CSS Modules, plain JS (no TypeScript), Vercel deployment.

---

### Task 1: Clean up old work and scaffold Vite + React project

**Files:**
- Delete: `index.html` (old single-file version)
- Create: entire Vite project structure

**Step 1: Remove the old index.html**

```bash
cd "c:/Users/user/Projects/Derby Restaurant"
rm index.html
```

**Step 2: Scaffold Vite + React project in current directory**

```bash
cd "c:/Users/user/Projects/Derby Restaurant"
npm create vite@latest . -- --template react
```

When prompted "Current directory is not empty. Remove existing files and continue?" — type `y` (this keeps the git history and docs/ folder).

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Clean up Vite boilerplate**

Remove files we don't need:
```bash
rm src/App.css src/assets/react.svg public/vite.svg src/index.css
```

Remove the contents of `src/App.jsx` (we'll write it from scratch).

**Step 5: Add Google Fonts to `index.html`**

Replace the contents of `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Derby Restaurant — Kiambu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server running at http://localhost:5173. Page may be blank or show an error — that's fine, we haven't written App.jsx yet.

**Step 7: Add vercel.json**

Create `vercel.json` at project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React project, add vercel.json"
```

---

### Task 2: Global CSS tokens and resets

**Files:**
- Create: `src/index.css`
- Modify: `src/main.jsx` (import index.css)

**Step 1: Create `src/index.css`**

```css
/* === TOKENS === */
:root {
  --bg: #0e0b08;
  --surface: #1a1410;
  --gold: #d4a017;
  --amber: #e07b24;
  --cream: #f5ead8;
  --muted: #8a7a68;
  --wa: #25D366;
  --radius-card: 16px;
  --radius-pill: 100px;
}

/* === RESETS === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--cream);
  font-family: 'Outfit', sans-serif;
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 1.6;
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }
img { display: block; width: 100%; }
h1, h2, h3 { font-family: 'Playfair Display', serif; }

/* === ANIMATIONS === */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(8px); }
}
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}
```

**Step 2: Verify `src/main.jsx` imports index.css**

`src/main.jsx` should look like this:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Step 3: Write minimal App.jsx to verify styles load**

```jsx
export default function App() {
  return <h1 style={{ padding: '2rem' }}>Derby Restaurant</h1>
}
```

**Step 4: Check browser**

Run `npm run dev`. Expected: dark background (#0e0b08), "Derby Restaurant" in Playfair Display serif font, cream colour.

**Step 5: Commit**

```bash
git add src/index.css src/main.jsx src/App.jsx
git commit -m "feat: add global CSS tokens, resets, animations"
```

---

### Task 3: Menu data

**Files:**
- Create: `src/data/menu.js`

**Step 1: Create `src/data/menu.js`**

```js
export const MENU = {
  specials: [
    {
      name: 'Special Mega Platter', price: 5000, emoji: '🎉',
      img: 'grilled,meat,platter,kenya', badge: '⭐ Signature',
      desc: 'Chicken, Fries, Masala chips, Veg rice, Fish fingers, Chapati, Pilau, 1L Soda'
    },
    {
      name: 'Platter for 4', price: 5000, emoji: '👨‍👩‍👧‍👦',
      img: 'african,food,platter', badge: '👨‍👩‍👧‍👦 For 4',
      desc: 'Beef, Mutton dry fry, Veg rice, Chapati, Brown ugali, Pilau, Soda 1L'
    },
    {
      name: 'Mutton Sizzling', price: 2500, emoji: '🔥',
      img: 'sizzling,mutton,goat,meat', badge: '🔥 Sizzling',
      desc: 'Served with your choice of accompaniment'
    },
    {
      name: 'Wings Combo', price: 2500, emoji: '🍗',
      img: 'chicken,wings,drumsticks,fries', badge: '🍗 Combo',
      desc: 'Fries with drumsticks + Soda 1L'
    },
    {
      name: 'Whole Tilapia', price: 2500, emoji: '🐟',
      img: 'whole,grilled,tilapia,fish', badge: '🐟 Fresh',
      desc: 'Served with Ugali/Rice/Pilau + glass of wine/juice/soda'
    },
    {
      name: 'Shawarma Platter', price: 2500, emoji: '🌯',
      img: 'shawarma,wrap,plate', badge: '🌯 Popular',
      desc: 'Served with Soda 1L'
    },
    {
      name: 'Special Loaded Fries', price: null, emoji: '🍟',
      img: 'loaded,fries,toppings', badge: '🍟 Loaded', askPrice: true,
      desc: 'All served with Soda 500ml',
      variants: [
        { name: 'BBQ Beef',          price: null, askPrice: true },
        { name: 'BBQ Mutton',        price: null, askPrice: true },
        { name: 'Fish Fingers',      price: null, askPrice: true },
        { name: 'Sweet Chili Chicken', price: null, askPrice: true }
      ]
    },
    {
      name: 'Chicken Biriyani', price: null, emoji: '⭐',
      img: 'chicken,biryani,rice', badge: '⭐ Must Try', askPrice: true,
      desc: "Derby's most celebrated dish"
    },
    {
      name: 'Special Platter', price: 2500, emoji: '🥘',
      img: 'mixed,food,platter,restaurant', badge: '🥘 Special',
      desc: "Derby's signature curated platter"
    }
  ],
  crunchies: [
    {
      name: 'Pizza', price: null, emoji: '🍕',
      img: 'pizza,slice,crispy', badge: '🍕 4 Sizes',
      desc: 'Freshly made, choose your size',
      variants: [
        { name: 'XL',     price: 1500 },
        { name: 'Large',  price: 1300 },
        { name: 'Medium', price: 1000 },
        { name: 'Small',  price:  500 }
      ]
    },
    {
      name: 'Chicken Shawarma', price: null, emoji: '🌯',
      img: 'chicken,shawarma,wrap', badge: '🌯 3 Sizes',
      desc: 'Loaded chicken shawarma wrap',
      variants: [
        { name: 'Megah',   price: 600 },
        { name: 'Special', price: 400 },
        { name: 'Mini',    price: 300 }
      ]
    },
    { name: 'Chicken Pie',   price: 220, emoji: '🥧', img: 'chicken,pastry,pie',   desc: 'Golden pastry filled with spiced chicken' },
    { name: 'Meat Pie',      price: 200, emoji: '🥧', img: 'meat,pie,pastry',       desc: 'Classic savoury meat-filled pastry' },
    { name: 'Sausage Roll',  price: 150, emoji: '🌭', img: 'sausage,roll,pastry',   desc: 'Buttery pastry wrapped sausage' },
    { name: 'Hotdog',        price: 150, emoji: '🌭', img: 'hotdog,sausage,bun',    desc: 'Classic hotdog in a soft bun' },
    { name: 'Chicken Grill', price: 400, emoji: '🍗', img: 'grilled,chicken,whole', badge: '🔥 Grilled', desc: 'Whole grilled chicken, perfectly seasoned' }
  ],
  bakery: [
    { name: 'Chocolate Muffin', price: 150, emoji: '🧁', img: 'chocolate,muffin,bakery', desc: 'Rich chocolate muffin, freshly baked' },
    {
      name: 'Queencakes', price: null, emoji: '🧁',
      img: 'cupcakes,fairy,cakes', desc: 'Light, fluffy fairy cakes',
      variants: [
        { name: '3 pieces', price: 140 },
        { name: '1 piece',  price:  50 }
      ]
    },
    { name: 'Cookies', price: 60, emoji: '🍪', img: 'cookies,chocolate,chip', desc: 'Freshly baked chocolate chip cookies' }
  ],
  drinks: [
    { name: 'Soft Drinks / Soda', price: null, emoji: '🥤', img: 'cold,soda,cans,drinks',         askPrice: true, desc: 'Chilled sodas and soft drinks' },
    { name: 'Mocktails',          price: null, emoji: '🍹', img: 'colorful,mocktail,fruity,drink', askPrice: true, badge: '🍹 Non-Alcoholic', desc: 'Creative non-alcoholic cocktail blends' },
    { name: 'Milkshakes',         price: null, emoji: '🥛', img: 'thick,milkshake,glass',          askPrice: true, desc: 'Thick and creamy blended milkshakes' },
    { name: 'Hot Drinks',         price: null, emoji: '☕', img: 'hot,tea,coffee,mug',             askPrice: true, badge: '☕ Warm Up', desc: 'Tea, Coffee, Dawa — warming drinks' },
    { name: 'Juices & Water',     price: null, emoji: '🍊', img: 'fresh,orange,juice,glass',       askPrice: true, desc: 'Fresh juices and bottled water' }
  ]
}

export const TABS = [
  { id: 'specials',  label: '⭐ Derby Specials' },
  { id: 'crunchies', label: '🍕 Crunchies' },
  { id: 'bakery',    label: '🧁 Bakery & Sweets' },
  { id: 'drinks',    label: '🥤 Drinks' }
]
```

**Step 2: Commit**

```bash
git add src/data/menu.js
git commit -m "feat: add menu data — 4 categories, 24 items, variants"
```

---

### Task 4: Navbar component

**Files:**
- Create: `src/components/Navbar/Navbar.jsx`
- Create: `src/components/Navbar/Navbar.module.css`

**Step 1: Create `src/components/Navbar/Navbar.module.css`**

```css
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: rgba(14,11,8,0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(212,160,23,0.1);
}
.logo { font-family: 'Playfair Display', serif; font-size: 1.4rem; line-height: 1.1; }
.logoDerby { color: var(--gold); }
.logoRest  { display: block; color: var(--cream); font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; }
.cartBtn {
  position: relative;
  background: rgba(212,160,23,0.12);
  border: 1px solid rgba(212,160,23,0.3);
  color: var(--cream);
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background 0.2s;
}
.cartBtn:hover { background: rgba(212,160,23,0.2); }
.badge {
  position: absolute;
  top: -6px; right: -6px;
  background: var(--amber);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 18px; height: 18px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px;
}
@media (max-width: 600px) { .nav { padding: 14px 16px; } }
```

**Step 2: Create `src/components/Navbar/Navbar.jsx`**

```jsx
import styles from './Navbar.module.css'

export default function Navbar({ cartCount, onCartToggle }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.logoDerby}>Derby</span>
        <span className={styles.logoRest}>Restaurant</span>
      </div>
      <button className={styles.cartBtn} onClick={onCartToggle}>
        🛒 <span className={styles.badge}>{cartCount}</span>
      </button>
    </nav>
  )
}
```

**Step 3: Wire into App.jsx temporarily to verify**

```jsx
import Navbar from './components/Navbar/Navbar'
export default function App() {
  return <Navbar cartCount={3} onCartToggle={() => {}} />
}
```

Check browser: fixed dark nav with gold "Derby" logo and cart button with badge "3".

**Step 4: Commit**

```bash
git add src/components/Navbar/
git commit -m "feat: add Navbar component"
```

---

### Task 5: Hero component

**Files:**
- Create: `src/components/Hero/Hero.jsx`
- Create: `src/components/Hero/Hero.module.css`

**Step 1: Create `src/components/Hero/Hero.module.css`**

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 100px 24px 80px;
  overflow: hidden;
}
.bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 40%, rgba(212,160,23,0.18) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 60%, rgba(224,123,36,0.12) 0%, transparent 55%);
  z-index: 0;
}
.content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  animation: fadeUp 0.9s ease both;
}
.badge {
  display: inline-block;
  background: rgba(212,160,23,0.12);
  border: 1px solid rgba(212,160,23,0.35);
  color: var(--gold);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: var(--radius-pill);
  margin-bottom: 24px;
  letter-spacing: 0.05em;
}
.title {
  font-size: clamp(3.5rem, 10vw, 7rem);
  line-height: 1;
  margin-bottom: 20px;
}
.titleMain  { color: var(--cream); display: block; }
.titleGold  {
  background: linear-gradient(135deg, var(--gold), var(--amber));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}
.sub {
  color: var(--muted);
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  max-width: 520px;
  margin: 0 auto 36px;
}
.ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.btnGold {
  background: linear-gradient(135deg, var(--gold), var(--amber));
  color: #0e0b08;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 14px 32px;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  display: inline-block;
}
.btnGold:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,160,23,0.35); }
.btnGhost {
  background: transparent;
  color: var(--cream);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 13px 32px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(245,234,216,0.3);
  transition: border-color 0.2s, background 0.2s;
  text-decoration: none;
  display: inline-block;
}
.btnGhost:hover { border-color: var(--cream); background: rgba(245,234,216,0.06); }
.scrollIndicator {
  position: absolute;
  bottom: 32px; left: 50%;
  transform: translateX(-50%);
  color: var(--gold);
  font-size: 1.4rem;
  animation: bounce 1.8s ease-in-out infinite;
  z-index: 2;
}
@media (max-width: 600px) { .hero { padding: 90px 16px 60px; } }
```

**Step 2: Create `src/components/Hero/Hero.jsx`**

```jsx
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg} />
      <div className={styles.content}>
        <span className={styles.badge}>📍 Kiambu's Hidden Gem</span>
        <h1 className={styles.title}>
          <span className={styles.titleMain}>Derby</span>
          <span className={styles.titleGold}>Restaurant</span>
        </h1>
        <p className={styles.sub}>
          Authentic platters, sizzling meats &amp; irresistible crunchies.
          Sit back and let us serve you excellence on every plate.
        </p>
        <div className={styles.ctas}>
          <a href="#menu" className={styles.btnGold}>View Menu</a>
          <a href="https://wa.me/254792981907" className={styles.btnGhost} target="_blank" rel="noopener">
            📞 Call Us
          </a>
        </div>
      </div>
      <div className={styles.scrollIndicator}>↓</div>
    </section>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/Hero/
git commit -m "feat: add Hero component"
```

---

### Task 6: About component

**Files:**
- Create: `src/components/About/About.jsx`
- Create: `src/components/About/About.module.css`

**Step 1: Create `src/components/About/About.module.css`**

```css
.about {
  padding: 100px 32px;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}
.label {
  display: inline-block;
  color: var(--gold);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.heading { font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 16px; }
.heading em { color: var(--gold); font-style: italic; }
.desc { color: var(--muted); max-width: 560px; margin: 0 auto 36px; }
.pills { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
.pill {
  background: var(--surface);
  border: 1px solid rgba(212,160,23,0.15);
  color: var(--cream);
  font-size: 0.85rem;
  padding: 8px 20px;
  border-radius: var(--radius-pill);
}
@media (max-width: 600px) { .about { padding-left: 16px; padding-right: 16px; } }
```

**Step 2: Create `src/components/About/About.jsx`**

```jsx
import styles from './About.module.css'

const PILLS = ['🕐 Open Daily', '🍽️ Dine In & Takeaway', '📦 Group Platters', '☕ Bar & Beverages']

export default function About() {
  return (
    <section className={styles.about} id="about">
      <span className={styles.label}>Why Derby?</span>
      <h2 className={styles.heading}>Kiambu's Best <em>Platters</em></h2>
      <p className={styles.desc}>
        From sizzling meats to handcrafted crunchies, Derby Restaurant has been the heartbeat
        of Kiambu dining. Every dish is made with passion, fresh ingredients, and a commitment to flavour.
      </p>
      <div className={styles.pills}>
        {PILLS.map(p => <span key={p} className={styles.pill}>{p}</span>)}
      </div>
    </section>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/About/
git commit -m "feat: add About component"
```

---

### Task 7: MenuCard component

**Files:**
- Create: `src/components/Menu/MenuCard.jsx`
- Create: `src/components/Menu/MenuCard.module.css`

**Step 1: Create `src/components/Menu/MenuCard.module.css`**

```css
.card {
  background: var(--surface);
  border: 1px solid rgba(212,160,23,0.08);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}
.card:hover {
  transform: translateY(-4px);
  border-color: rgba(212,160,23,0.4);
  box-shadow: 0 8px 32px rgba(212,160,23,0.12);
}
.imgWrap {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: var(--surface);
}
.imgWrap::before {
  content: '';
  position: absolute; inset: 0;
  z-index: 1;
  background: linear-gradient(90deg, #1a1410 25%, #241c15 50%, #1a1410 75%);
  background-size: 600px 100%;
  animation: shimmer 1.4s infinite linear;
  transition: opacity 0.3s;
}
.imgWrap.loaded::before { opacity: 0; pointer-events: none; animation: none; }
.img {
  position: relative; z-index: 2;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.card:hover .img { transform: scale(1.06); }
.badge {
  position: absolute; top: 12px; left: 12px; z-index: 3;
  background: rgba(14,11,8,0.82);
  border: 1px solid rgba(212,160,23,0.3);
  color: var(--gold);
  font-size: 0.72rem; font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  letter-spacing: 0.05em;
}
.body { padding: 20px; display: flex; flex-direction: column; gap: 6px; }
.name { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: var(--cream); }
.desc { font-size: 0.8rem; color: var(--muted); line-height: 1.5; flex: 1; }
.footer { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
.price { font-size: 1.1rem; font-weight: 700; color: var(--gold); }
.priceAsk { font-size: 0.85rem; color: var(--muted); }
.addBtn {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), var(--amber));
  border: none; color: #0e0b08;
  font-size: 1.3rem; font-weight: 700;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.15s, box-shadow 0.15s;
}
.addBtn:hover { transform: scale(1.12); box-shadow: 0 4px 12px rgba(212,160,23,0.4); }
.variants { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
.variantRow {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px;
  background: rgba(212,160,23,0.06);
  border: 1px solid rgba(212,160,23,0.12);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s;
}
.variantRow:hover { background: rgba(212,160,23,0.14); border-color: rgba(212,160,23,0.3); }
.variantName  { font-size: 0.82rem; color: var(--cream); }
.variantPrice { font-size: 0.82rem; color: var(--gold); font-weight: 600; }
```

**Step 2: Create `src/components/Menu/MenuCard.jsx`**

```jsx
import { useRef } from 'react'
import styles from './MenuCard.module.css'

function imgUrl(keyword) {
  return `https://source.unsplash.com/600x400/?${keyword}`
}

export default function MenuCard({ item, onAddToCart }) {
  const wrapRef = useRef(null)

  function handleLoad() {
    if (wrapRef.current) wrapRef.current.classList.add(styles.loaded)
  }

  const hasVariants = item.variants && item.variants.length > 0

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap} ref={wrapRef}>
        {item.badge && <span className={styles.badge}>{item.badge}</span>}
        <img
          className={styles.img}
          src={imgUrl(item.img)}
          alt={item.name}
          loading="lazy"
          onLoad={handleLoad}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.desc}>{item.desc}</div>
        {hasVariants ? (
          <div className={styles.variants}>
            {item.variants.map(v => {
              const vAsk = v.askPrice || v.price === null
              const fullName = `${item.name} – ${v.name}`
              return (
                <div
                  key={v.name}
                  className={styles.variantRow}
                  onClick={() => onAddToCart(fullName, v.price, item.emoji, vAsk)}
                >
                  <span className={styles.variantName}>{v.name}</span>
                  <span className={styles.variantPrice}>
                    {vAsk ? 'Ask for price' : `Ksh ${v.price.toLocaleString()}`}
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <div className={styles.footer}>
            <span className={item.askPrice ? styles.priceAsk : styles.price}>
              {item.askPrice ? 'Ask for price' : `Ksh ${item.price.toLocaleString()}`}
            </span>
            <button
              className={styles.addBtn}
              onClick={() => onAddToCart(item.name, item.price, item.emoji, !!item.askPrice)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/Menu/
git commit -m "feat: add MenuCard component with shimmer, variants, add-to-cart"
```

---

### Task 8: Menu section (TabBar + grid)

**Files:**
- Create: `src/components/Menu/TabBar.jsx`
- Create: `src/components/Menu/TabBar.module.css`
- Create: `src/components/Menu/Menu.jsx`
- Create: `src/components/Menu/Menu.module.css`

**Step 1: Create `src/components/Menu/TabBar.module.css`**

```css
.bar { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px; }
.btn {
  background: var(--surface);
  border: 1px solid rgba(212,160,23,0.15);
  color: var(--muted);
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem; font-weight: 600;
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background-color 0.2s;
}
.btn:hover { color: var(--cream); border-color: rgba(212,160,23,0.4); }
.active {
  background: linear-gradient(135deg, var(--gold), var(--amber));
  border-color: transparent;
  color: #0e0b08;
}
@media (max-width: 600px) { .btn { font-size: 0.78rem; padding: 8px 14px; } }
```

**Step 2: Create `src/components/Menu/TabBar.jsx`**

```jsx
import styles from './TabBar.module.css'
import { MENU, TABS } from '../../data/menu'

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div className={styles.bar}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.btn} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label} ({MENU[tab.id].length})
        </button>
      ))}
    </div>
  )
}
```

**Step 3: Create `src/components/Menu/Menu.module.css`**

```css
.section {
  padding: 80px 32px 120px;
  max-width: 1200px;
  margin: 0 auto;
}
.label {
  display: inline-block;
  color: var(--gold);
  font-size: 0.8rem; font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.heading { font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 32px; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
@media (max-width: 600px) {
  .section { padding-left: 16px; padding-right: 16px; }
  .grid { grid-template-columns: 1fr; }
}
```

**Step 4: Create `src/components/Menu/Menu.jsx`**

```jsx
import styles from './Menu.module.css'
import TabBar from './TabBar'
import MenuCard from './MenuCard'
import { MENU } from '../../data/menu'

export default function Menu({ activeTab, onTabChange, onAddToCart }) {
  return (
    <section className={styles.section} id="menu">
      <span className={styles.label}>What We Serve</span>
      <h2 className={styles.heading}>Our Full Menu</h2>
      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
      <div className={styles.grid}>
        {MENU[activeTab].map(item => (
          <MenuCard key={item.name} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}
```

**Step 5: Commit**

```bash
git add src/components/Menu/TabBar.jsx src/components/Menu/TabBar.module.css src/components/Menu/Menu.jsx src/components/Menu/Menu.module.css
git commit -m "feat: add Menu section with TabBar and card grid"
```

---

### Task 9: Cart component

**Files:**
- Create: `src/components/Cart/CartItem.jsx`
- Create: `src/components/Cart/CartItem.module.css`
- Create: `src/components/Cart/Cart.jsx`
- Create: `src/components/Cart/Cart.module.css`

**Step 1: Create `src/components/Cart/CartItem.module.css`**

```css
.item {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(212,160,23,0.07);
  font-size: 0.85rem;
}
.emoji { font-size: 1.2rem; flex-shrink: 0; }
.info  { flex: 1; }
.name    { font-weight: 600; color: var(--cream); }
.variant { color: var(--muted); font-size: 0.75rem; }
.price { color: var(--gold); font-weight: 700; white-space: nowrap; }
.qtyControls { display: flex; align-items: center; gap: 6px; }
.qtyBtn {
  width: 26px; height: 26px;
  border-radius: 50%;
  background: rgba(212,160,23,0.12);
  border: 1px solid rgba(212,160,23,0.25);
  color: var(--cream);
  font-size: 0.9rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.qtyBtn:hover { background: rgba(212,160,23,0.25); }
.qtyCount { min-width: 18px; text-align: center; font-weight: 600; }
```

**Step 2: Create `src/components/Cart/CartItem.jsx`**

```jsx
import styles from './CartItem.module.css'

export default function CartItem({ item, onUpdateQty }) {
  const parts = item.name.split(' – ')
  const mainName = parts[0]
  const variant  = parts[1]
  const linePrice = item.askPrice ? null : item.price * item.qty

  return (
    <div className={styles.item}>
      <span className={styles.emoji}>{item.emoji}</span>
      <div className={styles.info}>
        <div className={styles.name}>{mainName}</div>
        {variant && <div className={styles.variant}>{variant}</div>}
      </div>
      <div className={styles.qtyControls}>
        <button className={styles.qtyBtn} onClick={() => onUpdateQty(item.name, -1)}>−</button>
        <span className={styles.qtyCount}>{item.qty}</span>
        <button className={styles.qtyBtn} onClick={() => onUpdateQty(item.name, +1)}>+</button>
      </div>
      <span className={styles.price}>
        {item.askPrice ? '(TBC)' : `Ksh ${linePrice.toLocaleString()}`}
      </span>
    </div>
  )
}
```

**Step 3: Create `src/components/Cart/Cart.module.css`**

```css
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 200;
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s;
}
.overlay.open { opacity: 1; pointer-events: auto; }
.panel {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: min(420px, 100vw);
  background: var(--surface);
  border-left: 1px solid rgba(212,160,23,0.12);
  z-index: 201;
  display: flex; flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
}
.panel.open { transform: translateX(0); }
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(212,160,23,0.1);
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
}
.headerActions { display: flex; gap: 8px; align-items: center; }
.closeBtn {
  background: none; border: none;
  color: var(--muted); font-size: 1.1rem;
  cursor: pointer; padding: 4px 8px;
  border-radius: 6px;
  transition: color 0.2s;
}
.closeBtn:hover { color: var(--cream); }
.clearBtn {
  background: none;
  border: 1px solid rgba(212,160,23,0.2);
  color: var(--muted);
  font-size: 0.75rem; font-family: 'Outfit', sans-serif;
  padding: 4px 10px; border-radius: 6px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.clearBtn:hover { color: var(--cream); border-color: rgba(212,160,23,0.4); }
.items { flex: 1; overflow-y: auto; padding: 16px 24px; }
.empty { text-align: center; color: var(--muted); padding: 60px 0; font-size: 0.95rem; }
.footer {
  padding: 16px 24px 24px;
  border-top: 1px solid rgba(212,160,23,0.1);
  display: flex; flex-direction: column; gap: 12px;
}
.total { font-size: 0.9rem; color: var(--muted); }
.totalAmt { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--gold); margin-left: 6px; }
.notes {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(212,160,23,0.15);
  border-radius: 10px;
  color: var(--cream);
  font-family: 'Outfit', sans-serif; font-size: 0.82rem;
  padding: 10px 14px; resize: none; height: 72px;
  outline: none; transition: border-color 0.2s;
}
.notes:focus { border-color: rgba(212,160,23,0.4); }
.waBtn {
  background: var(--wa); color: #fff;
  font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.95rem;
  padding: 14px; border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
}
.waBtn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.waBtn:disabled { opacity: 0.35; cursor: not-allowed; }
```

**Step 4: Create `src/components/Cart/Cart.jsx`**

```jsx
import { useRef } from 'react'
import styles from './Cart.module.css'
import CartItem from './CartItem'

export default function Cart({ cart, isOpen, onClose, onUpdateQty, onClearCart, onSendWhatsApp }) {
  const notesRef = useRef(null)

  const subtotal = cart.filter(i => !i.askPrice).reduce((s, i) => s + i.price * i.qty, 0)
  const hasTBC   = cart.some(i => i.askPrice)
  const totalQty = cart.reduce((s, i) => s + i.qty, 0)

  function handleSend() {
    onSendWhatsApp(notesRef.current?.value || '')
  }

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
      <aside className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <span>🛒 Your Order</span>
          <div className={styles.headerActions}>
            <button className={styles.clearBtn} onClick={onClearCart}>🗑️ Clear</button>
            <button className={styles.closeBtn} onClick={onClose}>✕</button>
          </div>
        </div>

        <div className={styles.items}>
          {cart.length === 0
            ? <div className={styles.empty}>🍽️ Your plate is empty</div>
            : cart.map(item => (
                <CartItem key={item.name} item={item} onUpdateQty={onUpdateQty} />
              ))
          }
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>
            Total:
            <span className={styles.totalAmt}>
              {hasTBC
                ? `Ksh ${subtotal.toLocaleString()} + TBC`
                : `Ksh ${subtotal.toLocaleString()}`}
            </span>
          </div>
          <textarea
            ref={notesRef}
            className={styles.notes}
            placeholder="e.g. Less spice, extra chapati, deliver to gate 3..."
          />
          <button
            className={styles.waBtn}
            disabled={cart.length === 0}
            onClick={handleSend}
          >
            📲 Order via WhatsApp
          </button>
        </div>
      </aside>
    </>
  )
}
```

**Step 5: Commit**

```bash
git add src/components/Cart/
git commit -m "feat: add Cart panel and CartItem components"
```

---

### Task 10: Footer and Toast components

**Files:**
- Create: `src/components/Footer/Footer.jsx`
- Create: `src/components/Footer/Footer.module.css`
- Create: `src/components/Toast/Toast.jsx`
- Create: `src/components/Toast/Toast.module.css`

**Step 1: Create `src/components/Footer/Footer.module.css`**

```css
.footer {
  text-align: center;
  padding: 60px 24px;
  border-top: 1px solid rgba(212,160,23,0.1);
}
.name { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--gold); margin-bottom: 10px; }
.loc  { color: var(--muted); font-size: 0.85rem; margin-bottom: 10px; }
.loc a { color: var(--gold); }
.tag  { color: var(--muted); font-size: 0.8rem; font-style: italic; max-width: 440px; margin: 0 auto; }
```

**Step 2: Create `src/components/Footer/Footer.jsx`**

```jsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.name}>Derby Restaurant</p>
      <p className={styles.loc}>
        📍 Kiambu, Kenya &nbsp;|&nbsp;
        <a href="https://wa.me/254792981907">📱 +254 792 981 907</a>
      </p>
      <p className={styles.tag}>Sit back, relax, and allow us to serve you excellence on every plate.</p>
    </footer>
  )
}
```

**Step 3: Create `src/components/Toast/Toast.module.css`**

```css
.toast {
  position: fixed;
  bottom: 32px; left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: var(--surface);
  border: 1px solid rgba(212,160,23,0.25);
  color: var(--cream);
  font-size: 0.88rem;
  padding: 12px 24px;
  border-radius: var(--radius-pill);
  z-index: 999;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
}
.show { transform: translateX(-50%) translateY(0); opacity: 1; }
```

**Step 4: Create `src/components/Toast/Toast.jsx`**

```jsx
import styles from './Toast.module.css'

export default function Toast({ message }) {
  return (
    <div className={`${styles.toast} ${message ? styles.show : ''}`}>
      {message}
    </div>
  )
}
```

**Step 5: Commit**

```bash
git add src/components/Footer/ src/components/Toast/
git commit -m "feat: add Footer and Toast components"
```

---

### Task 11: Wire everything together in App.jsx

**Files:**
- Modify: `src/App.jsx`
- Create: `src/App.module.css`

**Step 1: Create `src/App.module.css`**

```css
.app { min-height: 100vh; }
```

**Step 2: Write the complete `src/App.jsx`**

```jsx
import { useState, useEffect, useCallback } from 'react'
import styles from './App.module.css'

import Navbar  from './components/Navbar/Navbar'
import Hero    from './components/Hero/Hero'
import About   from './components/About/About'
import Menu    from './components/Menu/Menu'
import Cart    from './components/Cart/Cart'
import Footer  from './components/Footer/Footer'
import Toast   from './components/Toast/Toast'

export default function App() {
  const [cart, setCart]           = useState([])
  const [activeTab, setActiveTab] = useState('specials')
  const [cartOpen, setCartOpen]   = useState(false)
  const [toastMsg, setToastMsg]   = useState('')

  // Lock body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
  }, [cartOpen])

  function showToast(msg) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2200)
  }

  const addToCart = useCallback((name, price, emoji, askPrice = false) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name)
      if (existing) {
        return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { name, price, emoji, askPrice, qty: 1 }]
    })
    showToast('🍽️ Added to your order!')
    setCartOpen(true)
  }, [])

  const updateQty = useCallback((name, delta) => {
    setCart(prev => {
      const updated = prev.map(i => i.name === name ? { ...i, qty: i.qty + delta } : i)
      return updated.filter(i => i.qty > 0)
    })
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  function sendWhatsApp(notes) {
    if (cart.length === 0) return
    const lines = cart.map(item => {
      const priceStr = item.askPrice ? '(price TBC)' : `Ksh ${(item.price * item.qty).toLocaleString()}`
      return `• ${item.emoji} ${item.name} x${item.qty} — ${priceStr}`
    })
    const subtotal = cart.filter(i => !i.askPrice).reduce((s, i) => s + i.price * i.qty, 0)
    const hasTBC   = cart.some(i => i.askPrice)

    let msg = `🍽️ *NEW ORDER — Derby Restaurant*\n\n📋 *Order Details:*\n${lines.join('\n')}\n\n`
    msg += `💰 *Subtotal: Ksh ${subtotal.toLocaleString()}*\n`
    if (hasTBC) msg += `_(Prices TBC items to be confirmed by restaurant)_\n`
    if (notes)  msg += `\n📝 *Notes:* ${notes}\n`
    msg += `\n_Ordered via Derby Restaurant website_`

    window.open('https://wa.me/254792981907?text=' + encodeURIComponent(msg), '_blank')
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div className={styles.app}>
      <Navbar cartCount={cartCount} onCartToggle={() => setCartOpen(o => !o)} />
      <Hero />
      <About />
      <Menu activeTab={activeTab} onTabChange={setActiveTab} onAddToCart={addToCart} />
      <Footer />
      <Cart
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onClearCart={clearCart}
        onSendWhatsApp={sendWhatsApp}
      />
      <Toast message={toastMsg} />
    </div>
  )
}
```

**Step 3: Start dev server and verify full site**

```bash
npm run dev
```

Walk through:
- Dark hero with gold text loads ✓
- Menu tabs switch categories ✓
- Click + on a card → toast appears, cart badge increments ✓
- Open cart → item listed with qty controls ✓
- WhatsApp button disabled when empty ✓
- Click WhatsApp button → opens wa.me link with formatted message ✓

**Step 4: Commit**

```bash
git add src/App.jsx src/App.module.css
git commit -m "feat: wire all components in App.jsx — cart state, tab state, WhatsApp ordering"
```

---

### Task 12: Vercel deployment and quality verification

**Files:**
- Verify: `vercel.json` (already created in Task 1)

**Step 1: Run production build**

```bash
npm run build
```

Expected: `dist/` folder created, no build errors.

**Step 2: Preview the production build locally**

```bash
npm run preview
```

Check at http://localhost:4173. Verify it looks identical to dev.

**Step 3: Quality checklist**

- [ ] All 24 items render across 4 tabs (9 specials, 7 crunchies, 3 bakery, 5 drinks)
- [ ] All prices correct
- [ ] Variant rows work (Pizza 4 sizes, Shawarma 3 sizes, Loaded Fries 4 flavours, Queencakes 2 sizes)
- [ ] Cart slides in/out smoothly
- [ ] Adding same item increments qty (no duplicates)
- [ ] Removing last qty hides item
- [ ] Empty cart shows "Your plate is empty"
- [ ] WhatsApp button disabled when cart empty
- [ ] WhatsApp message correctly formatted
- [ ] Toast appears on add-to-cart
- [ ] Nav badge updates on every change
- [ ] All images have alt text and loading="lazy"
- [ ] Site works at 375px width (DevTools mobile)
- [ ] No console errors

**Step 4: Deploy to Vercel**

Option A — Vercel CLI:
```bash
npx vercel
```

Option B — GitHub: Push to GitHub and connect repo at vercel.com dashboard. Vercel will auto-detect Vite and use the settings in `vercel.json`.

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: Derby Restaurant React site complete — all features verified"
```
