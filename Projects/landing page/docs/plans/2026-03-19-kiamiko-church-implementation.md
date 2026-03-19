# Kiamiko Catholic Church Landing Page — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a beautiful, single-page static website for Kiamiko Catholic Church, Kenya, using glassmorphism design over a rich background image.

**Architecture:** Pure HTML5/CSS3/Vanilla JS — no build tools, no framework. CSS custom properties drive the design token system. Glassmorphism is achieved via `backdrop-filter: blur()` + semi-transparent backgrounds. Page deploys by opening `index.html` directly or dropping onto Netlify.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid, backdrop-filter), Vanilla JS, Google Fonts (Playfair Display + Inter)

---

## Design Tokens (reference throughout all tasks)

```css
--color-primary: #6B0F1A;       /* Deep burgundy */
--color-accent: #C9A84C;        /* Gold */
--color-text: #1a1a1a;
--color-text-light: #ffffff;
--glass-bg: rgba(255, 255, 255, 0.10);
--glass-border: rgba(255, 255, 255, 0.20);
--glass-blur: blur(12px);
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.30);
--font-heading: 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;
--radius: 16px;
--section-padding: 80px 20px;
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `js/main.js`
- Create: `assets/images/` (directory placeholder)

**Step 1: Create the folder structure**

```bash
mkdir -p css js assets/images
touch css/styles.css js/main.js
```

**Step 2: Create `index.html` with semantic shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kiamiko Catholic Church</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <!-- Navbar -->
  <nav id="navbar"></nav>

  <!-- Hero -->
  <section id="hero"></section>

  <!-- About -->
  <section id="about"></section>

  <!-- Mass Schedule -->
  <section id="mass-schedule"></section>

  <!-- Ministries -->
  <section id="ministries"></section>

  <!-- Events -->
  <section id="events"></section>

  <!-- Contact -->
  <section id="contact"></section>

  <!-- Footer -->
  <footer id="footer"></footer>

  <script src="js/main.js"></script>
</body>
</html>
```

**Step 3: Add CSS reset + design tokens to `css/styles.css`**

```css
/* === RESET === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  color: var(--color-text-light);
  min-height: 100vh;
}
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }

/* === DESIGN TOKENS === */
:root {
  --color-primary: #6B0F1A;
  --color-accent: #C9A84C;
  --color-text: #1a1a1a;
  --color-text-light: #ffffff;
  --glass-bg: rgba(255, 255, 255, 0.10);
  --glass-border: rgba(255, 255, 255, 0.20);
  --glass-blur: blur(12px);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.30);
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --radius: 16px;
  --section-padding: 80px 20px;
}

/* === GLASS UTILITY === */
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow);
}
```

**Step 4: Verify in browser — open `index.html`, confirm blank page with no console errors**

**Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: scaffold Kiamiko church landing page project"
```

---

### Task 2: Global Background

**Files:**
- Modify: `css/styles.css`

**Step 1: Add full-page background to `body` in `css/styles.css`**

Use a CSS gradient as fallback (a real photo can be swapped in later via `assets/images/hero-bg.jpg`):

```css
/* === BACKGROUND === */
body {
  background:
    linear-gradient(135deg, rgba(107, 15, 26, 0.85) 0%, rgba(0,0,0,0.70) 100%),
    url('../assets/images/hero-bg.jpg') center/cover fixed no-repeat;
  background-color: #2a0a10; /* fallback if no image */
}
```

**Step 2: Add a placeholder image note**

In `assets/images/`, add a `README.txt`:
```
Place a high-resolution church or Kenyan landscape photo here named: hero-bg.jpg
Recommended: 1920x1080px minimum, compressed to <500KB
Free sources: Unsplash (search "catholic church kenya" or "kenya landscape")
```

**Step 3: Verify — background gradient renders, no broken image errors in console**

**Step 4: Commit**

```bash
git add css/styles.css assets/images/README.txt
git commit -m "feat: add global glassmorphism background and fallback gradient"
```

---

### Task 3: Navbar

**Files:**
- Modify: `index.html` (fill `<nav id="navbar">`)
- Modify: `css/styles.css` (navbar styles)
- Modify: `js/main.js` (mobile toggle)

**Step 1: Fill in navbar HTML**

```html
<nav id="navbar">
  <div class="nav-container">
    <div class="nav-brand">
      <span class="nav-cross">✝</span>
      <span class="nav-name">Kiamiko Catholic Church</span>
    </div>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="navLinks">
      <li><a href="#about">About</a></li>
      <li><a href="#mass-schedule">Mass Times</a></li>
      <li><a href="#ministries">Ministries</a></li>
      <li><a href="#events">Events</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>
```

**Step 2: Add navbar CSS**

```css
/* === NAVBAR === */
#navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(107, 15, 26, 0.30);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--glass-border);
}
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-accent);
}
.nav-cross { font-size: 1.4rem; }
.nav-links {
  list-style: none;
  display: flex;
  gap: 32px;
}
.nav-links a {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #fff;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--color-accent); }

/* Mobile toggle button */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: transform 0.3s;
}

/* Mobile menu */
@media (max-width: 768px) {
  .nav-toggle { display: flex; }
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0; right: 0;
    flex-direction: column;
    gap: 0;
    background: rgba(107, 15, 26, 0.95);
    backdrop-filter: blur(16px);
    padding: 16px 24px 24px;
  }
  .nav-links.open { display: flex; }
  .nav-links li { padding: 10px 0; border-bottom: 1px solid var(--glass-border); }
}
```

**Step 3: Add mobile toggle JS to `js/main.js`**

```js
// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
```

**Step 4: Verify — navbar renders, fixed to top, mobile hamburger works**

**Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: add glassmorphism navbar with mobile toggle"
```

---

### Task 4: Hero Section

**Files:**
- Modify: `index.html` (fill `<section id="hero">`)
- Modify: `css/styles.css`

**Step 1: Fill in hero HTML**

```html
<section id="hero">
  <div class="hero-content glass">
    <p class="hero-subtitle">Karibu — Welcome Home</p>
    <h1 class="hero-title">Kiamiko<br/>Catholic Church</h1>
    <p class="hero-tagline">A community of faith, hope, and love in the heart of Kenya</p>
    <a href="#mass-schedule" class="btn-primary">View Mass Times</a>
  </div>
</section>
```

**Step 2: Add hero CSS**

```css
/* === HERO === */
#hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 20px 80px;
}
.hero-content {
  max-width: 640px;
  padding: 56px 48px;
}
.hero-subtitle {
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 16px;
}
.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 20px;
  color: #fff;
}
.hero-tagline {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255,255,255,0.80);
  margin-bottom: 36px;
}
.btn-primary {
  display: inline-block;
  padding: 14px 36px;
  background: var(--color-accent);
  color: #1a1a1a;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  border-radius: 50px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201, 168, 76, 0.40);
}

@media (max-width: 480px) {
  .hero-content { padding: 40px 28px; }
}
```

**Step 3: Verify — hero fills viewport, glass card centered, button works**

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add hero section with glassmorphism card"
```

---

### Task 5: About Section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Step 1: Fill in about HTML**

```html
<section id="about">
  <div class="section-container">
    <div class="about-card glass">
      <div class="about-text">
        <p class="section-label">About Us — Kuhusu Sisi</p>
        <h2 class="section-title">A Parish Rooted in Faith</h2>
        <p>Kiamiko Catholic Church is a vibrant parish community dedicated to worshipping God, serving one another, and reaching out to the wider community. Guided by the teachings of the Catholic Church, we welcome all who seek grace, healing, and belonging.</p>
        <p>Tunakukaribisha kwa jina la Baba, na Mwana, na Roho Mtakatifu. Amen.</p>
      </div>
      <div class="about-icon">✝</div>
    </div>
  </div>
</section>
```

**Step 2: Add about CSS**

```css
/* === SHARED SECTION STYLES === */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--section-padding);
}
.section-label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 24px;
  color: #fff;
}

/* === ABOUT === */
.about-card {
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 56px 48px;
}
.about-text { flex: 1; }
.about-text p {
  line-height: 1.8;
  color: rgba(255,255,255,0.85);
  margin-bottom: 16px;
  font-size: 1rem;
}
.about-icon {
  font-size: 8rem;
  color: var(--color-accent);
  opacity: 0.4;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .about-card { flex-direction: column; gap: 24px; padding: 36px 28px; }
  .about-icon { font-size: 4rem; }
}
```

**Step 3: Verify section renders with glass card and readable text**

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add about section"
```

---

### Task 6: Mass Schedule Section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Step 1: Fill in mass schedule HTML**

```html
<section id="mass-schedule">
  <div class="section-container">
    <p class="section-label" style="text-align:center">Mass Times — Nyakati za Misa</p>
    <h2 class="section-title" style="text-align:center">Join Us in Worship</h2>
    <div class="mass-card glass">
      <table class="mass-table">
        <thead>
          <tr>
            <th>Day / Siku</th>
            <th>Time / Saa</th>
            <th>Language / Lugha</th>
          </tr>
        </thead>
        <tbody>
          <tr class="highlight">
            <td>Sunday / Jumapili</td>
            <td>7:00 AM</td>
            <td>Swahili</td>
          </tr>
          <tr class="highlight">
            <td>Sunday / Jumapili</td>
            <td>9:30 AM</td>
            <td>English</td>
          </tr>
          <tr class="highlight">
            <td>Sunday / Jumapili</td>
            <td>12:00 PM</td>
            <td>Swahili</td>
          </tr>
          <tr>
            <td>Monday – Friday / Jumatatu – Ijumaa</td>
            <td>6:30 AM</td>
            <td>Swahili</td>
          </tr>
          <tr>
            <td>Saturday / Jumamosi</td>
            <td>8:00 AM</td>
            <td>English</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

**Step 2: Add mass schedule CSS**

```css
/* === MASS SCHEDULE === */
.mass-card {
  padding: 40px;
  overflow-x: auto;
}
.mass-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}
.mass-table th {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  padding: 12px 20px;
  text-align: left;
  border-bottom: 1px solid var(--glass-border);
}
.mass-table td {
  padding: 16px 20px;
  color: rgba(255,255,255,0.85);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.mass-table tr.highlight td {
  color: #fff;
  font-weight: 500;
}
.mass-table tr.highlight { background: rgba(201, 168, 76, 0.08); }
.mass-table tbody tr:hover { background: rgba(255,255,255,0.05); }
```

**Step 3: Verify table renders, Sunday rows are highlighted, scrolls on mobile**

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add mass schedule section with glass table"
```

---

### Task 7: Ministries Section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Step 1: Fill in ministries HTML**

```html
<section id="ministries">
  <div class="section-container">
    <p class="section-label" style="text-align:center">Ministries — Huduma</p>
    <h2 class="section-title" style="text-align:center">Find Your Community</h2>
    <div class="ministries-grid">
      <div class="ministry-card glass">
        <div class="ministry-icon">🙏</div>
        <h3>Youth Group</h3>
        <p>Empowering the next generation through faith, fellowship, and service. Meets every Saturday at 3 PM.</p>
      </div>
      <div class="ministry-card glass">
        <div class="ministry-icon">👑</div>
        <h3>Women's Guild</h3>
        <p>A sisterhood of prayer, charity, and support. Umoja wa Wanawake. Meets first Sunday monthly.</p>
      </div>
      <div class="ministry-card glass">
        <div class="ministry-icon">🎵</div>
        <h3>Parish Choir</h3>
        <p>Lifting hearts through music and praise. Rehearsals every Friday evening at 6 PM. All voices welcome.</p>
      </div>
      <div class="ministry-card glass">
        <div class="ministry-icon">🤝</div>
        <h3>Men's Fellowship</h3>
        <p>Brotherhood rooted in faith and service to family and community. Meets second Sunday monthly.</p>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add ministries CSS**

```css
/* === MINISTRIES === */
.ministries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
.ministry-card {
  padding: 36px 28px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}
.ministry-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.40);
}
.ministry-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}
.ministry-card h3 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  color: var(--color-accent);
  margin-bottom: 12px;
}
.ministry-card p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.80);
}
```

**Step 3: Verify — 4 cards in grid, hover lift effect works**

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add ministries section with glass cards grid"
```

---

### Task 8: Upcoming Events Section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Step 1: Fill in events HTML**

```html
<section id="events">
  <div class="section-container">
    <p class="section-label" style="text-align:center">Events — Matukio</p>
    <h2 class="section-title" style="text-align:center">Upcoming Gatherings</h2>
    <div class="events-list">
      <div class="event-card glass">
        <div class="event-date">
          <span class="event-day">29</span>
          <span class="event-month">Mar</span>
        </div>
        <div class="event-info">
          <h3>Palm Sunday Procession</h3>
          <p>Join us as we commemorate Jesus' triumphal entry into Jerusalem. Procession begins at 8:30 AM.</p>
        </div>
      </div>
      <div class="event-card glass">
        <div class="event-date">
          <span class="event-day">18</span>
          <span class="event-month">Apr</span>
        </div>
        <div class="event-info">
          <h3>Easter Vigil Mass</h3>
          <p>The pinnacle of the liturgical year. Holy Saturday at 7:30 PM. All parishioners and guests welcome.</p>
        </div>
      </div>
      <div class="event-card glass">
        <div class="event-date">
          <span class="event-day">04</span>
          <span class="event-month">May</span>
        </div>
        <div class="event-info">
          <h3>Parish Family Day</h3>
          <p>A day of fun, food, and fellowship for the whole family. Grounds open from 10 AM. Karibu wote!</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add events CSS**

```css
/* === EVENTS === */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.event-card {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 28px 36px;
  transition: transform 0.2s;
}
.event-card:hover { transform: translateX(6px); }
.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 64px;
  background: rgba(201, 168, 76, 0.15);
  border: 1px solid rgba(201, 168, 76, 0.30);
  border-radius: 12px;
  padding: 12px 16px;
}
.event-day {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
}
.event-month {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.80);
}
.event-info h3 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  color: #fff;
  margin-bottom: 8px;
}
.event-info p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.75);
}

@media (max-width: 480px) {
  .event-card { flex-direction: column; align-items: flex-start; gap: 16px; padding: 24px; }
}
```

**Step 3: Verify — event cards stack vertically, date badges render in gold**

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add upcoming events section"
```

---

### Task 9: Contact & Location Section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Step 1: Fill in contact HTML**

Replace the placeholder Google Maps src with an actual embed URL from Google Maps (search "Kiamiko" and use the embed link).

```html
<section id="contact">
  <div class="section-container">
    <p class="section-label" style="text-align:center">Contact — Wasiliana Nasi</p>
    <h2 class="section-title" style="text-align:center">Find Us</h2>
    <div class="contact-grid">
      <div class="contact-info glass">
        <div class="contact-item">
          <span class="contact-icon">📍</span>
          <div>
            <strong>Address</strong>
            <p>Kiamiko, Murang'a County<br/>Kenya</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="contact-icon">📞</span>
          <div>
            <strong>Phone</strong>
            <p>+254 700 000 000</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="contact-icon">✉️</span>
          <div>
            <strong>Email</strong>
            <p>info@kiamikocatholic.co.ke</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="contact-icon">🕐</span>
          <div>
            <strong>Office Hours</strong>
            <p>Mon – Fri: 8:00 AM – 5:00 PM<br/>Sat: 9:00 AM – 1:00 PM</p>
          </div>
        </div>
      </div>
      <div class="map-container glass">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d37.0!3d-0.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zKiQ!5e0!3m2!1sen!2ske!4v0"
          width="100%"
          height="100%"
          style="border:0; border-radius: 12px;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Kiamiko Catholic Church location">
        </iframe>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add contact CSS**

```css
/* === CONTACT === */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: stretch;
}
.contact-info {
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.contact-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }
.contact-item strong {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 4px;
}
.contact-item p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.80);
}
.map-container {
  min-height: 380px;
  overflow: hidden;
  padding: 8px;
}
.map-container iframe { height: 100%; min-height: 360px; }

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
  .map-container { min-height: 280px; }
}
```

**Step 3: Verify — contact info and map render side by side, responsive stacks on mobile**

**Note:** The placeholder map coordinates should be updated by the client with the real church location embed URL from Google Maps.

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add contact and location section with map embed"
```

---

### Task 10: Footer

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Step 1: Fill in footer HTML**

```html
<footer id="footer">
  <div class="footer-container">
    <div class="footer-brand">
      <span class="footer-cross">✝</span>
      <span>Kiamiko Catholic Church</span>
    </div>
    <div class="footer-socials">
      <a href="#" aria-label="Facebook">&#xFB;</a>
      <a href="#" aria-label="YouTube">&#x25B6;</a>
      <a href="#" aria-label="WhatsApp">&#x2709;</a>
    </div>
    <p class="footer-copy">&copy; 2026 Kiamiko Catholic Church. All rights reserved.</p>
  </div>
</footer>
```

**Step 2: Add footer CSS**

```css
/* === FOOTER === */
#footer {
  background: rgba(107, 15, 26, 0.50);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--glass-border);
  padding: 40px 24px;
  text-align: center;
}
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.footer-brand {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-accent);
  display: flex;
  align-items: center;
  gap: 10px;
}
.footer-cross { font-size: 1.3rem; }
.footer-socials {
  display: flex;
  gap: 20px;
  font-size: 1.2rem;
}
.footer-socials a {
  color: rgba(255,255,255,0.60);
  transition: color 0.2s;
}
.footer-socials a:hover { color: var(--color-accent); }
.footer-copy {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.45);
}
```

**Step 3: Verify — footer renders at bottom of page**

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add footer"
```

---

### Task 11: Scroll Animations + Polish

**Files:**
- Modify: `css/styles.css`
- Modify: `js/main.js`

**Step 1: Add fade-in-on-scroll CSS**

```css
/* === SCROLL ANIMATIONS === */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 2: Add Intersection Observer to `js/main.js`**

```js
// Fade-in on scroll
const fadeEls = document.querySelectorAll(
  '.glass, .ministry-card, .event-card, .section-title, .section-label'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));
```

**Step 3: Add navbar scroll shrink effect in `js/main.js`**

```js
// Navbar shrink on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.padding = '8px 0';
  } else {
    navbar.style.padding = '';
  }
});
```

**Step 4: Test in browser — elements fade in as you scroll, navbar shrinks on scroll**

**Step 5: Commit**

```bash
git add css/styles.css js/main.js
git commit -m "feat: add scroll fade-in animations and navbar shrink"
```

---

### Task 12: Final Review & Responsive QA

**Step 1: Open Chrome DevTools → toggle device toolbar → test at:**
- 375px (iPhone SE)
- 768px (iPad)
- 1280px (Desktop)

**Step 2: Check each section:**
- [ ] Navbar: hamburger works on mobile, links close on click
- [ ] Hero: card readable, button tappable
- [ ] About: stacks vertically on mobile
- [ ] Mass schedule: table scrolls horizontally on small screens
- [ ] Ministries: grid collapses to 1-col on mobile
- [ ] Events: cards stack, date badge above text on mobile
- [ ] Contact: stacks to 1 col, map still renders
- [ ] Footer: centered and readable

**Step 3: Check `backdrop-filter` in Firefox** (may need `-webkit-backdrop-filter` — already included, verify it works)

**Step 4: Lighthouse audit** — open DevTools → Lighthouse → run for Performance and Accessibility. Target: Performance > 90.

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Kiamiko Catholic Church landing page v1.0"
```

---

## Deployment (Optional)

Drop the project folder onto [Netlify Drop](https://app.netlify.com/drop) for instant free hosting. No build step needed — it serves `index.html` directly.
