# About Us Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a dedicated `/about` page with restaurant story, team grid, photo gallery with lightbox, and Google Maps embed — connected via React Router v6.

**Architecture:** Install `react-router-dom`, wrap the app in `<BrowserRouter>`, define two routes (`/` and `/about`) in `App.jsx`. The About page is assembled from four focused sub-components inside `src/components/About/`. The Navbar gains an About link using React Router `<Link>`.

**Tech Stack:** React 19, Vite, CSS Modules, react-router-dom v6, plain JS (no TypeScript, no test framework)

---

## Context

- Project root: `src/` (Vite entry at `src/main.jsx`)
- All state lives in `App.jsx` — this feature adds no new global state
- CSS design tokens in `src/index.css`: `--bg #0e0b08`, `--surface #1a1410`, `--gold #d4a017`, `--amber #e07b24`, `--cream #f5ead8`, `--muted #8a7a68`, `--radius-card 16px`, `--radius-pill 100px`
- Fonts: Playfair Display (headings), Outfit (body) — already loaded in `index.html`
- Images: use `https://loremflickr.com/600/400/food,restaurant?lock=N` pattern (already used in MenuCard)
- No test framework — verify visually in browser with `npm run dev`

---

### Task 1: Install react-router-dom and fix vercel.json for SPA routing

**Files:**
- Modify: `vercel.json`

**Step 1: Install the package**

```bash
npm install react-router-dom
```

Expected: `react-router-dom` appears in `package.json` dependencies.

**Step 2: Update vercel.json to add SPA rewrite rule**

Replace the entire contents of `vercel.json` with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This ensures `/about` returns `index.html` on Vercel instead of a 404.

**Step 3: Verify dev server still starts**

```bash
npm run dev
```

Expected: Dev server starts, no errors. Home page renders normally at `http://localhost:5173`.

**Step 4: Commit**

```bash
git add package.json package-lock.json vercel.json
git commit -m "feat: install react-router-dom, add SPA rewrite to vercel.json"
```

---

### Task 2: Add BrowserRouter to main.jsx and Routes to App.jsx

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/App.jsx`
- Create: `src/pages/AboutPage.jsx` (stub only — full content in later tasks)

**Step 1: Create a stub AboutPage so imports don't break**

Create `src/pages/AboutPage.jsx`:

```jsx
export default function AboutPage() {
  return (
    <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--cream)' }}>
      About page coming soon
    </div>
  )
}
```

**Step 2: Wrap app in BrowserRouter in main.jsx**

Replace `src/main.jsx` with:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

**Step 3: Add Routes to App.jsx**

Replace the return statement in `src/App.jsx` with:

```jsx
import { Routes, Route } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
```

Add the import at the top, then replace the return:

```jsx
return (
  <div className={styles.app}>
    <Navbar cartCount={cartCount} onCartToggle={() => setCartOpen(o => !o)} />
    <Routes>
      <Route path="/" element={
        <>
          <Hero />
          <About />
          <Menu activeTab={activeTab} onTabChange={setActiveTab} onAddToCart={addToCart} />
          <Footer />
        </>
      } />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
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
```

Note: `Footer` stays inside the `/` route. `AboutPage` will render its own footer.

**Step 4: Verify in browser**

```bash
npm run dev
```

- Visit `http://localhost:5173` — home page renders normally
- Visit `http://localhost:5173/about` — shows "About page coming soon"
- No console errors

**Step 5: Commit**

```bash
git add src/main.jsx src/App.jsx src/pages/AboutPage.jsx
git commit -m "feat: add BrowserRouter and /about route stub"
```

---

### Task 3: Update Navbar with About link

**Files:**
- Modify: `src/components/Navbar/Navbar.jsx`
- Modify: `src/components/Navbar/Navbar.module.css`

**Step 1: Add Link to Navbar.jsx**

Replace `src/components/Navbar/Navbar.jsx` with:

```jsx
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar({ cartCount, onCartToggle }) {
  const { pathname } = useLocation()

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoDerby}>Derby</span>
        <span className={styles.logoRest}>Restaurant</span>
      </Link>
      <div className={styles.links}>
        <Link to="/about" className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}>
          About
        </Link>
        <button className={styles.cartBtn} onClick={onCartToggle}>
          🛒 <span className={styles.badge}>{cartCount}</span>
        </button>
      </div>
    </nav>
  )
}
```

**Step 2: Add link styles to Navbar.module.css**

Append to `src/components/Navbar/Navbar.module.css`:

```css
.links { display: flex; align-items: center; gap: 24px; }
.navLink {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}
.navLink:hover { color: var(--cream); }
.navLink.active { color: var(--gold); }
```

Also update the `.logo` rule — it needs to be an `<a>` style now (remove underline):

```css
.logo { font-family: 'Playfair Display', serif; font-size: 1.4rem; line-height: 1.1; text-decoration: none; }
```

**Step 3: Verify in browser**

- "About" link appears in navbar between logo and cart button
- Clicking "About" navigates to `/about` instantly (no page reload)
- "About" text turns gold when on `/about` page
- Clicking logo navigates back to home

**Step 4: Commit**

```bash
git add src/components/Navbar/Navbar.jsx src/components/Navbar/Navbar.module.css
git commit -m "feat: add About nav link with active state"
```

---

### Task 4: OurStory component

**Files:**
- Create: `src/components/About/OurStory.jsx`
- Create: `src/components/About/OurStory.module.css`

**Step 1: Create OurStory.jsx**

```jsx
import styles from './OurStory.module.css'

export default function OurStory() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.label}>Est. in Kiambu</span>
        <h1 className={styles.heading}>The Derby Story</h1>
        <p className={styles.text}>
          Derby Restaurant was born out of a simple belief: that great food brings people together.
          Nestled in the heart of Kiambu Town, we set out to create a place where families, friends,
          and colleagues could share honest, flavourful meals without compromise.
        </p>
        <p className={styles.text}>
          From our signature mega platters to handcrafted crunchies and freshly baked pastries,
          every item on our menu is prepared fresh daily. We source local ingredients where we can
          and take pride in every plate that leaves our kitchen.
        </p>
        <p className={styles.text}>
          Today, Derby is Kiambu's go-to spot for sizzling meats, shawarma, biriyani, and so much more.
          Whether you dine in, take away, or order via WhatsApp — we treat every meal as an occasion.
        </p>
      </div>
    </section>
  )
}
```

**Step 2: Create OurStory.module.css**

```css
.section {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 24px 80px;
  overflow: hidden;
}
.section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(14,11,8,0.8) 0%, rgba(14,11,8,0.85) 100%),
    url('/hero-bg.jpg') center/cover no-repeat;
  z-index: 0;
}
.overlay { display: none; }
.content {
  position: relative;
  z-index: 1;
  max-width: 720px;
  animation: fadeUp 0.9s ease both;
}
.label {
  display: inline-block;
  color: var(--gold);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.heading {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  color: var(--cream);
  margin-bottom: 32px;
  line-height: 1.1;
}
.text {
  color: var(--muted);
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.8;
  margin-bottom: 20px;
}
```

---

### Task 5: TeamGrid component

**Files:**
- Create: `src/components/About/TeamGrid.jsx`
- Create: `src/components/About/TeamGrid.module.css`

**Step 1: Create TeamGrid.jsx**

```jsx
import styles from './TeamGrid.module.css'

const TEAM = [
  { name: 'Chef Daniel', role: 'Head Chef', lock: 10 },
  { name: 'Amina Wanjiku', role: 'Pastry & Bakery', lock: 22 },
  { name: 'Brian Kamau', role: 'Grill Master', lock: 35 },
  { name: 'Faith Njeri', role: 'Front of House', lock: 47 },
]

export default function TeamGrid() {
  return (
    <section className={styles.section}>
      <span className={styles.label}>The People Behind the Plates</span>
      <h2 className={styles.heading}>Meet the Team</h2>
      <div className={styles.grid}>
        {TEAM.map(member => (
          <div key={member.name} className={styles.card}>
            <img
              className={styles.photo}
              src={`https://loremflickr.com/300/300/person,portrait?lock=${member.lock}`}
              alt={member.name}
              loading="lazy"
            />
            <div className={styles.name}>{member.name}</div>
            <div className={styles.role}>{member.role}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

**Step 2: Create TeamGrid.module.css**

```css
.section {
  padding: 80px 32px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}
.label {
  display: inline-block;
  color: var(--gold);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.heading {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: var(--cream);
  margin-bottom: 48px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  animation: fadeUp 0.7s ease both;
}
.photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(212,160,23,0.3);
}
.name {
  color: var(--cream);
  font-weight: 600;
  font-size: 1rem;
}
.role {
  color: var(--gold);
  font-size: 0.85rem;
}
```

---

### Task 6: Gallery component with lightbox

**Files:**
- Create: `src/components/About/Gallery.jsx`
- Create: `src/components/About/Gallery.module.css`

**Step 1: Create Gallery.jsx**

```jsx
import { useState, useEffect } from 'react'
import styles from './Gallery.module.css'

const PHOTOS = [
  { src: 'https://loremflickr.com/600/400/food,restaurant?lock=1',  alt: 'Restaurant interior' },
  { src: 'https://loremflickr.com/600/400/grilled,meat,platter?lock=2', alt: 'Grilled platter' },
  { src: 'https://loremflickr.com/600/400/african,food,kenyan?lock=3',  alt: 'Kenyan cuisine' },
  { src: 'https://loremflickr.com/600/400/shawarma,wrap?lock=4',        alt: 'Shawarma wrap' },
  { src: 'https://loremflickr.com/600/400/pizza,restaurant?lock=5',     alt: 'Fresh pizza' },
  { src: 'https://loremflickr.com/600/400/dessert,cake,bakery?lock=6',  alt: 'Bakery & sweets' },
  { src: 'https://loremflickr.com/600/400/chicken,grilled?lock=7',      alt: 'Grilled chicken' },
  { src: 'https://loremflickr.com/600/400/mocktail,drinks?lock=8',      alt: 'Drinks & mocktails' },
]

export default function Gallery() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null) return
    function handleKey(e) {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active])

  return (
    <section className={styles.section}>
      <span className={styles.label}>A Taste of Derby</span>
      <h2 className={styles.heading}>Gallery</h2>
      <div className={styles.grid}>
        {PHOTOS.map((photo, i) => (
          <button
            key={i}
            className={styles.tile}
            onClick={() => setActive(photo)}
            aria-label={`View ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" className={styles.img} />
          </button>
        ))}
      </div>

      {active && (
        <div className={styles.lightbox} onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <button className={styles.close} onClick={() => setActive(null)} aria-label="Close">✕</button>
          <img
            src={active.src}
            alt={active.alt}
            className={styles.lightboxImg}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
```

**Step 2: Create Gallery.module.css**

```css
.section {
  padding: 80px 32px;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
.label {
  display: inline-block;
  color: var(--gold);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.heading {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: var(--cream);
  margin-bottom: 40px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.tile {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: var(--radius-card);
  overflow: hidden;
  aspect-ratio: 3/2;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  display: block;
}
.tile:hover .img { transform: scale(1.05); }

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(14,11,8,0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeUp 0.2s ease both;
}
.lightboxImg {
  max-width: 90vw;
  max-height: 85vh;
  border-radius: var(--radius-card);
  object-fit: contain;
  box-shadow: 0 24px 80px rgba(0,0,0,0.6);
}
.close {
  position: absolute;
  top: 24px; right: 24px;
  background: rgba(245,234,216,0.1);
  border: 1px solid rgba(245,234,216,0.2);
  color: var(--cream);
  font-size: 1.2rem;
  width: 44px; height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}
.close:hover { background: rgba(245,234,216,0.2); }
```

---

### Task 7: FindUs component

**Files:**
- Create: `src/components/About/FindUs.jsx`
- Create: `src/components/About/FindUs.module.css`

**Step 1: Create FindUs.jsx**

```jsx
import styles from './FindUs.module.css'

export default function FindUs() {
  return (
    <section className={styles.section}>
      <span className={styles.label}>Where to Find Us</span>
      <h2 className={styles.heading}>Find Us</h2>
      <div className={styles.mapWrap}>
        <iframe
          title="Derby Restaurant Location"
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d36.8358!3d-1.1712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTAnMTYuMyJTIDM2wrA1MCcwOC45IkU!5e0!3m2!1sen!2ske!4v1"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className={styles.info}>
        <p className={styles.address}>📍 Kiambu Town, Kiambu County, Kenya</p>
        <a href="https://wa.me/254792981907" className={styles.waLink}>
          📱 +254 792 981 907 — Order on WhatsApp
        </a>
        <p className={styles.hours}>🕐 Open Daily · 8:00 AM – 10:00 PM</p>
      </div>
    </section>
  )
}
```

**Step 2: Create FindUs.module.css**

```css
.section {
  padding: 80px 32px 100px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.label {
  display: inline-block;
  color: var(--gold);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.heading {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: var(--cream);
  margin-bottom: 40px;
}
.mapWrap {
  border-radius: var(--radius-card);
  overflow: hidden;
  border: 1px solid rgba(212,160,23,0.15);
  margin-bottom: 40px;
}
.map {
  width: 100%;
  height: 380px;
  border: none;
  display: block;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.address { color: var(--muted); font-size: 1rem; }
.waLink {
  color: var(--wa, #25D366);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: opacity 0.2s;
}
.waLink:hover { opacity: 0.8; }
.hours { color: var(--muted); font-size: 0.9rem; }
```

---

### Task 8: Assemble AboutPage and add footer

**Files:**
- Modify: `src/pages/AboutPage.jsx` (replace stub)

**Step 1: Replace stub with full AboutPage**

```jsx
import OurStory  from '../components/About/OurStory'
import TeamGrid  from '../components/About/TeamGrid'
import Gallery   from '../components/About/Gallery'
import FindUs    from '../components/About/FindUs'
import Footer    from '../components/Footer/Footer'

export default function AboutPage() {
  return (
    <>
      <OurStory />
      <TeamGrid />
      <Gallery />
      <FindUs />
      <Footer />
    </>
  )
}
```

**Step 2: Verify the full About page in browser**

Visit `http://localhost:5173/about` and confirm:
- Story banner renders with the hero-bg.jpg background and dark overlay
- Team grid shows 4 circular photo cards
- Gallery shows 8 photo tiles in a responsive grid
- Clicking a gallery tile opens lightbox; pressing ESC or clicking outside closes it
- Map iframe renders (may show generic map — that is fine for now)
- Footer renders at the bottom
- No console errors

**Step 3: Commit**

```bash
git add src/pages/AboutPage.jsx src/components/About/
git commit -m "feat: add About page with story, team, gallery and map"
```

---

### Task 9: Add "Read our full story" link to homepage About section

**Files:**
- Modify: `src/components/About/About.jsx`
- Modify: `src/components/About/About.module.css`

**Step 1: Add Link to About.jsx**

```jsx
import { Link } from 'react-router-dom'
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
      <Link to="/about" className={styles.storyLink}>Read our full story →</Link>
    </section>
  )
}
```

**Step 2: Add storyLink style to About.module.css**

Append to `src/components/About/About.module.css`:

```css
.storyLink {
  display: inline-block;
  margin-top: 32px;
  color: var(--gold);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: opacity 0.2s;
}
.storyLink:hover { opacity: 0.7; }
```

**Step 3: Verify in browser**

- Home page About section shows "Read our full story →" link below the pills
- Clicking it navigates to `/about` instantly

**Step 4: Commit**

```bash
git add src/components/About/About.jsx src/components/About/About.module.css
git commit -m "feat: add full story link on homepage About section"
```

---

### Task 10: Push to GitHub

**Step 1: Push all commits**

```bash
git push origin main
```

**Step 2: Confirm on Vercel**

After pushing, Vercel will auto-deploy (if GitHub integration is connected). Visit the live URL and verify:
- `/` loads home page normally
- `/about` loads the full About page (not a 404)
- Navbar About link works on the live site
