# About Us Page — Design Document

**Date:** 2026-03-25
**Feature:** Dedicated `/about` route with full restaurant story, team, gallery, and map

---

## Goal

Add a dedicated About Us page at `/about` that tells the Derby Restaurant story, showcases the team, displays a food/restaurant photo gallery with a lightbox, and embeds a Google Maps location — all matching the existing dark gold theme.

---

## Architecture

**Routing:** Add `react-router-dom` v6. Wrap the app in `<BrowserRouter>` in `main.jsx`. Define two routes in `App.jsx`:
- `/` — existing home page (Hero + About snippet + Menu + Footer)
- `/about` — new dedicated About page

**Vercel SPA fix:** Add a rewrite rule in `vercel.json` so that refreshing `/about` returns `index.html` instead of a 404.

**Navbar:** Add an "About" `<Link>` next to the existing nav items. Uses React Router `<Link>` for instant client-side navigation (no page reload).

**Existing About section on homepage:** Kept as-is but gets a "Read our full story →" link pointing to `/about`.

---

## About Page Sections

### 1. Our Story
- Full-width hero banner with a dark-overlaid background image (reuses `hero-bg.jpg`)
- Headline: "The Derby Story"
- 2–3 paragraphs: restaurant founding, mission, commitment to Kiambu community
- Matches Hero section visual style

### 2. Meet the Team
- Grid of team member cards (2–3 columns on desktop, 1 on mobile)
- Each card: circular photo (loremflickr `person` image), name, role
- Placeholder data defined as a plain array inside `TeamGrid.jsx` — easy to update with real names/photos later

### 3. Gallery
- Masonry-style responsive grid, 6–8 food/restaurant images (loremflickr `food,restaurant`)
- Clicking an image opens a full-screen lightbox overlay with close button
- Lightbox: dark backdrop, centered image, ESC key closes it

### 4. Find Us
- Google Maps iframe embed centered on Kiambu Town (`-1.1712, 36.8358`)
- Address and WhatsApp number displayed below the map
- WhatsApp link opens `wa.me/254792981907`

---

## New Files

```
src/pages/AboutPage.jsx
src/components/About/OurStory.jsx
src/components/About/TeamGrid.jsx
src/components/About/Gallery.jsx
src/components/About/FindUs.jsx
src/components/About/AboutPage.module.css
```

## Modified Files

| File | Change |
|------|--------|
| `src/main.jsx` | Wrap in `<BrowserRouter>` |
| `src/App.jsx` | Add `<Routes>` with `/` and `/about` routes |
| `src/components/Navbar/Navbar.jsx` | Add `<Link to="/about">About</Link>` |
| `src/components/About/About.jsx` | Add "Read our full story →" link |
| `vercel.json` | Add SPA rewrite rule |

---

## Dependencies

```
react-router-dom  (v6)
```

No other new dependencies. Gallery lightbox is plain CSS + state — no library needed.

---

## Design Tokens

Reuses all existing CSS variables from `src/index.css`:
- `--bg`, `--surface`, `--gold`, `--amber`, `--cream`, `--muted`
- `--radius-card`, `--radius-pill`
- `fadeUp` keyframe animation for section entrances
