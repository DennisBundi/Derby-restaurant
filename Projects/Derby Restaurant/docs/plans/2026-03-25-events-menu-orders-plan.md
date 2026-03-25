# Derby Restaurant — Events, Images, Order Capture & Menu Expansion

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Private/Outdoor Events section, use real Derby photos on menu cards, capture customer name+phone before WhatsApp redirect (stored in Supabase), and expand menu with real Derby menu items.

**Architecture:** React 19 + Vite 8 frontend. New `Events` component added to homepage between Menu and Footer. `OrderModal` intercepts the WhatsApp send flow to collect name+phone, saves to Supabase `orders` table, then redirects. MenuCard updated to support local image paths. Menu data expanded to 4 tabs with real items and prices from Derby's physical menu.

**Tech Stack:** React 19, Vite 8, React Router DOM 7, @supabase/supabase-js, CSS Modules

---

## Task 1: Install Supabase and set up environment

**Files:**
- Create: `.env`
- Create: `.env.example`
- Create: `src/lib/supabase.js`

**Step 1: Install Supabase client**

```bash
npm install @supabase/supabase-js
```

Expected: `@supabase/supabase-js` appears in `package.json` dependencies.

**Step 2: Create `.env` with Supabase credentials**

Go to your Supabase project dashboard → Settings → API. Copy the Project URL and anon public key.

Create `.env` at the project root:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Step 3: Create `.env.example`**

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Step 4: Add `.env` to `.gitignore`**

Open `.gitignore` and confirm `.env` is listed (it usually is with Vite). If not, add it.

**Step 5: Create `src/lib/supabase.js`**

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**Step 6: Verify by running dev server**

```bash
npm run dev
```

Expected: Dev server starts with no errors.

**Step 7: Commit**

```bash
git add src/lib/supabase.js .env.example package.json package-lock.json
git commit -m "feat: add Supabase client setup"
```

---

## Task 2: Create the Supabase orders table

**Files:**
- Create: `supabase/migrations/001_create_orders.sql` (for reference only — run in Supabase dashboard)

**Step 1: Create the migration file (for documentation)**

```sql
-- supabase/migrations/001_create_orders.sql
create table orders (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  items      jsonb not null,
  total      integer not null default 0,
  has_tbc    boolean default false,
  notes      text,
  created_at timestamptz default now()
);
```

**Step 2: Run in Supabase dashboard**

Go to Supabase project → SQL Editor → New query. Paste the SQL above and click Run.

Expected: Table `orders` appears in the Table Editor.

**Step 3: Set Row Level Security (RLS)**

In Supabase dashboard → Table Editor → orders → RLS. Run this SQL to allow anonymous inserts:

```sql
alter table orders enable row level security;

create policy "Allow anonymous insert"
  on orders for insert
  to anon
  with check (true);
```

Expected: Anon users (website visitors) can insert rows but cannot read them.

**Step 4: Commit migration file**

```bash
mkdir -p supabase/migrations
git add supabase/migrations/001_create_orders.sql
git commit -m "feat: add orders table migration"
```

---

## Task 3: Expand menu data with real Derby items and assign real images

**Files:**
- Modify: `src/data/menu.js`

**Step 1: Replace the full contents of `src/data/menu.js`**

The `img` field now supports two formats:
- A string starting with `/` → used directly as a local image path
- A keyword string → passed to loremflickr as before

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
      img: '/Screenshot 2026-03-25 081704.png', badge: '👨‍👩‍👧‍👦 For 4',
      desc: 'Beef, Mutton dry fry, Veg rice, Chapati, Brown ugali, Pilau, Soda 1L'
    },
    {
      name: 'Derby Chicken Special', price: 400, emoji: '🍗',
      img: '/Screenshot 2026-03-25 081704.png', badge: '🍗 Chef Pick',
      desc: "Derby's signature chicken — ask your waiter for today's preparation"
    },
    {
      name: 'Sizzling Mutton', price: 800, emoji: '🔥',
      img: 'sizzling,mutton,goat,meat', badge: '🔥 Sizzling',
      desc: 'Served with your choice of accompaniment'
    },
    {
      name: 'Whole Tilapia Wet Fry', price: 750, emoji: '🐟',
      img: 'whole,grilled,tilapia,fish', badge: '🐟 Fresh',
      desc: 'Served with Ugali/Rice/Pilau + glass of juice/soda'
    },
    {
      name: 'Derby Freaky Shake', price: 550, emoji: '🥤',
      img: '/Screenshot 2026-03-25 081634.png', badge: '🥤 Iconic',
      desc: "Derby's over-the-top signature milkshake — a must-try"
    },
    {
      name: 'Chicken Biriyani', price: null, emoji: '⭐',
      img: 'chicken,biryani,rice', badge: '⭐ Must Try', askPrice: true,
      desc: "Derby's most celebrated dish — half or full, ask for price"
    },
    {
      name: 'Honey Glazed Chicken', price: 800, emoji: '🍯',
      img: 'honey,glazed,chicken', badge: '🍯 Chef Special',
      desc: 'Half chicken, honey glazed — Chef\'s Special'
    }
  ],

  mains: [
    // --- BEEF CORNER ---
    { name: 'Beef Gulash',   price: 400,  emoji: '🥩', img: 'beef,stew,kenyan',       badge: '🥩 Beef', desc: 'Classic Kenyan beef gulash' },
    { name: 'Beef Curry',    price: 500,  emoji: '🥩', img: 'beef,curry,spiced',       desc: 'Spiced beef curry' },
    { name: 'Beef Fry',      price: 450,  emoji: '🥩', img: 'beef,dry,fry,kenya',      desc: 'Kenyan-style beef dry fry' },
    { name: 'Beef 1KG',      price: 1750, emoji: '🥩', img: 'beef,grilled,kilogram',   badge: '🥩 1KG', desc: 'Full kilogram of beef, your choice of preparation' },
    // --- CHICKEN BROILER ---
    { name: 'Chicken Marinate ¼',   price: 350,  emoji: '🍗', img: 'marinated,chicken,quarter', desc: 'Quarter chicken, beautifully marinated' },
    { name: 'Chicken Curry ¼',      price: 450,  emoji: '🍗', img: 'chicken,curry,quarter',     desc: 'Quarter chicken in rich curry sauce' },
    { name: 'Chicken Fry ¼',        price: 400,  emoji: '🍗', img: 'fried,chicken,quarter',     desc: 'Quarter fried chicken' },
    { name: 'Chicken with Chips',   price: 550,  emoji: '🍗', img: 'chicken,chips,fries',       badge: '🍟 + Chips', desc: 'Chicken served with chips' },
    { name: 'Full Chicken Marinated', price: 1300, emoji: '🍗', img: 'whole,marinated,chicken', badge: '🍗 Full', desc: 'Whole marinated chicken' },
    { name: 'Drumstick Combo',      price: 450,  emoji: '🍗', img: 'drumstick,chicken,combo',   desc: 'Drumstick combo platter' },
    // --- CHICKEN KIENYEJI ---
    { name: 'Kienyeji Full Chicken',    price: 1800, emoji: '🐓', img: 'kienyeji,chicken,whole',    badge: '🐓 Kienyeji', desc: 'Full free-range chicken, Mama\'s way' },
    { name: 'Kienyeji Chicken ¼',       price: 450,  emoji: '🐓', img: 'kienyeji,chicken,quarter',  desc: 'Quarter free-range chicken, Mama\'s way' },
    { name: 'Kienyeji Chicken ½',       price: 900,  emoji: '🐓', img: 'kienyeji,chicken,half',     desc: 'Half free-range chicken' },
    // --- MUTTON CORNER ---
    { name: 'Mutton Wet Fry',  price: 400,  emoji: '🐑', img: 'mutton,wet,fry,kenya',   badge: '🐑 Mutton', desc: 'Mutton wet fry' },
    { name: 'Mutton Dry Fry',  price: 450,  emoji: '🐑', img: 'mutton,dry,fry,kenya',   desc: 'Mutton dry fry' },
    { name: 'Mutton 1KG',      price: 1900, emoji: '🐑', img: 'mutton,roasted,kilogram', badge: '🐑 1KG', desc: 'Full kilogram of mutton' },
    // --- FISH CORNER ---
    { name: 'Fish Fillet',   price: 500, emoji: '🐟', img: 'fish,fillet,chips',    badge: '🐟 Fish', desc: 'Fish fillet with chips etc.' },
    { name: 'Fish Fingers',  price: 550, emoji: '🐟', img: 'fish,fingers,crispy',  desc: 'Crispy fish fingers with chips etc.' },
    // --- MAIN DISHES ---
    { name: 'Garden Peas',               price: 200, emoji: '🫛', img: 'garden,peas,kenyan',       desc: 'Garden peas' },
    { name: 'Minji with Chapati',        price: 250, emoji: '🫛', img: 'peas,chapati,kenyan',       desc: 'Peas served with chapati' },
    { name: 'Minji Special',             price: 350, emoji: '🫛', img: 'peas,special,kenyan',       badge: '⭐ Special', desc: 'Minji Special' },
    { name: 'Minji Special with Chapati',price: 400, emoji: '🫛', img: 'peas,chapati,special',      desc: 'Minji Special with chapati' },
    { name: 'Matumbo',                   price: 250, emoji: '🍲', img: 'matumbo,tripe,kenyan',      desc: 'Kenyan-style matumbo' },
    { name: 'Matumbo Wet with Ugali',    price: 300, emoji: '🍲', img: 'matumbo,ugali,kenya',       desc: 'Matumbo wet fry with ugali' },
    { name: 'Matumbo Wet with Chapati',  price: 300, emoji: '🍲', img: 'matumbo,chapati,kenya',     desc: 'Matumbo wet fry with chapati' },
    { name: 'Liver Fry',                 price: 350, emoji: '🍲', img: 'liver,fry,kenyan',          desc: 'Fried liver' },
    { name: 'Liver Fry with Ugali',      price: 400, emoji: '🍲', img: 'liver,ugali,kenya',         desc: 'Fried liver served with ugali' },
    { name: 'Vegetable Rice',            price: 200, emoji: '🍚', img: 'vegetable,rice,kenyan',     desc: 'Vegetable fried rice' },
    { name: 'Pilau (Swahili Style)',     price: 300, emoji: '🍚', img: 'pilau,swahili,rice',        badge: '🌟 Swahili', desc: 'Authentic Swahili-style pilau' },
    // --- SIDE DISHES ---
    { name: 'Chips',               price: 200, emoji: '🍟', img: 'chips,fries,plate',          desc: 'Golden crispy chips' },
    { name: 'Ugali',               price:  50, emoji: '🍽️', img: 'ugali,kenyan,white',         desc: 'Traditional white ugali' },
    { name: 'Brown Ugali',         price: 100, emoji: '🍽️', img: 'brown,ugali,kenyan',         desc: 'Wholemeal brown ugali' },
    { name: 'Rice',                price: 100, emoji: '🍚', img: 'steamed,white,rice',         desc: 'Steamed white rice' },
    { name: 'Potato Wedges',       price: 250, emoji: '🥔', img: 'potato,wedges,seasoned',     desc: 'Seasoned potato wedges' },
    { name: 'Mokimo',              price: 150, emoji: '🥔', img: 'mokimo,kenyan,potato',       desc: 'Traditional Kikuyu mokimo' },
    { name: 'Kienyeji Vegetables', price: 100, emoji: '🥬', img: 'kienyeji,vegetables,greens', desc: 'Fresh kienyeji greens' },
    { name: 'Sweet & Sour Wings',  price: 250, emoji: '🍗', img: 'sweet,sour,wings',           badge: '🔥 Wings', desc: 'Sweet & sour chicken wings' },
    { name: 'Buffalo Wings',       price: 300, emoji: '🍗', img: 'buffalo,wings,spicy',        desc: 'Spicy buffalo chicken wings' },
    { name: 'Yellow Beans',        price: 150, emoji: '🫘', img: 'yellow,beans,kenyan',        desc: 'Yellow beans' },
    { name: 'Yellow Beans Special',price: 300, emoji: '🫘', img: 'yellow,beans,special',      badge: '⭐ Special', desc: 'Yellow beans, special preparation' },
    { name: 'Githeri',             price:  70, emoji: '🫘', img: 'githeri,kenyan,beans',       desc: 'Traditional Kenyan githeri' },
    { name: 'Stir-Fry Mixed Veg',  price: 200, emoji: '🥦', img: 'stir,fry,vegetables',        desc: 'Stir-fried mixed vegetables' }
  ],

  crunchies: [
    {
      name: 'Pizza', price: null, emoji: '🍕',
      img: 'pizza,slice,crispy', badge: '🍕 4 Sizes',
      desc: 'Freshly made, choose your size',
      variants: [
        { name: 'Large',  price: 1300 },
        { name: 'Medium', price: 1000 },
        { name: 'Small',  price:  600 }
      ]
    },
    {
      name: 'Chicken Shawarma', price: null, emoji: '🌯',
      img: '/Screenshot 2026-03-25 081523.png', badge: '🌯 3 Sizes',
      desc: 'Loaded chicken shawarma wrap',
      variants: [
        { name: 'Mega',    price: 600 },
        { name: 'Special', price: 400 },
        { name: 'Mini',    price: 300 }
      ]
    },
    { name: 'Mega Shawarma',      price: 600, emoji: '🌯', img: 'mega,shawarma,wrap',        badge: '🌯 Mega', desc: 'Loaded mega shawarma' },
    { name: 'Beef Burger',        price: 450, emoji: '🍔', img: 'beef,burger,bun',            desc: 'Juicy beef burger' },
    { name: 'Chicken Burger',     price: 450, emoji: '🍔', img: 'chicken,burger,bun',         desc: 'Crispy chicken burger' },
    { name: 'Cheese Burger',      price: 600, emoji: '🍔', img: 'cheese,burger,melted',       badge: '🧀 Cheese', desc: 'Double cheese burger' },
    { name: 'Chips Chicken',      price: 550, emoji: '🍟', img: 'chips,chicken,plate',        desc: 'Chips + chicken combo' },
    { name: 'Masala Chips',       price: 250, emoji: '🍟', img: 'masala,chips,spiced',        desc: 'Chips tossed in masala spices' },
    { name: 'Loaded Fries',       price: 600, emoji: '🍟', img: 'loaded,fries,toppings',      badge: '🔥 Loaded', desc: 'Fries loaded with toppings + 500ml Soda' },
    { name: 'Fish Nuggets',       price: 650, emoji: '🐟', img: 'fish,nuggets,crispy',        desc: 'Crispy fish nuggets' },
    { name: 'BBQ Beef',           price: 550, emoji: '🔥', img: 'bbq,beef,grilled',           badge: '🔥 BBQ', desc: 'BBQ beef with fries' },
    { name: 'Sweet Chilli Chicken',price: 600,emoji: '🌶️', img: 'sweet,chilli,chicken',       desc: 'Sweet chilli chicken with fries' },
    { name: 'Mutton BBQ',         price: 700, emoji: '🔥', img: 'bbq,mutton,grilled',         desc: 'BBQ mutton' },
    { name: 'Wraps',              price: 400, emoji: '🌯', img: 'wrap,tortilla,filling',      desc: 'Freshly made wraps' },
    { name: 'Spring Roll (Beef)',  price: 150, emoji: '🥟', img: 'spring,roll,beef',           desc: 'Beef spring roll' },
    { name: 'Spring Roll (Chicken)',price:150, emoji: '🥟', img: 'spring,roll,chicken',        desc: 'Chicken spring roll' },
    { name: 'Bhajia',             price: 250, emoji: '🧅', img: 'bhajia,onion,crispy',        desc: 'Crispy bhajia' },
    { name: 'Chicken Sandwich',   price: 300, emoji: '🥪', img: 'chicken,sandwich,bread',     desc: 'Chicken sandwich' },
    { name: 'Veggie Sandwich',    price: 200, emoji: '🥪', img: 'veggie,sandwich,bread',      desc: 'Vegetarian sandwich' },
    { name: 'Sausage Roll',       price: 150, emoji: '🌭', img: 'sausage,roll,pastry',        desc: 'Buttery pastry wrapped sausage' },
    { name: 'Hotdog',             price: 150, emoji: '🌭', img: 'hotdog,sausage,bun',         desc: 'Classic hotdog in a soft bun' },
    { name: 'Doughnuts',          price:  50, emoji: '🍩', img: 'doughnuts,fried,sweet',      desc: 'Fresh fried doughnuts' },
    { name: 'Half Cake',          price:  50, emoji: '🍰', img: 'cake,slice,sweet',            desc: 'Slice of cake' },
    { name: 'Chocolate Muffin',   price: 150, emoji: '🧁', img: 'chocolate,muffin,bakery',    desc: 'Rich chocolate muffin, freshly baked' },
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
    // --- SMOOTHIES ---
    { name: 'Strawberry Smoothie',     price: 400, emoji: '🍓', img: 'strawberry,smoothie,pink',     badge: '🍓 Smoothie', desc: 'Fresh strawberry smoothie' },
    { name: 'Chocolate Smoothie',      price: 400, emoji: '🍫', img: 'chocolate,smoothie,thick',     desc: 'Rich chocolate smoothie' },
    { name: 'Oreo Smoothie',           price: 450, emoji: '🍪', img: 'oreo,smoothie,cookie',         desc: 'Oreo blended smoothie' },
    { name: 'Blueberry Smoothie',      price: 400, emoji: '🫐', img: 'blueberry,smoothie,purple',    desc: 'Fresh blueberry smoothie' },
    { name: 'Passion Fruit Smoothie',  price: 450, emoji: '🍊', img: 'passion,fruit,smoothie',       desc: 'Tropical passion fruit smoothie' },
    // --- MILKSHAKES ---
    { name: 'Vanilla Shake',    price: 350, emoji: '🥛', img: 'vanilla,milkshake,glass',      badge: '🥛 Shake', desc: 'Classic vanilla milkshake' },
    { name: 'Chocolate Shake',  price: 350, emoji: '🍫', img: 'chocolate,milkshake,thick',    desc: 'Rich chocolate milkshake' },
    { name: 'Strawberry Shake', price: 350, emoji: '🍓', img: '/Screenshot 2026-03-25 081555.png', desc: 'Fresh strawberry milkshake' },
    { name: 'Mocha Shake',      price: 400, emoji: '☕', img: 'mocha,milkshake,coffee',       desc: 'Coffee mocha milkshake' },
    { name: 'Mango Shake',      price: 350, emoji: '🥭', img: 'mango,milkshake,tropical',     desc: 'Tropical mango milkshake' },
    { name: 'Banana Shake',     price: 350, emoji: '🍌', img: 'banana,milkshake,creamy',      desc: 'Creamy banana milkshake' },
    { name: 'Tropical Shake',   price: 400, emoji: '🍹', img: 'tropical,milkshake,fruit',     desc: 'Tropical fruit milkshake' },
    // --- MOCKTAILS ---
    { name: 'Passion Fruit Mojito', price: 450, emoji: '🍹', img: '/Screenshot 2026-03-25 081440.png', badge: '🍹 Mocktail', desc: 'Fresh passion fruit mojito' },
    { name: 'Cola Mojito',          price: 450, emoji: '🍹', img: 'cola,mojito,mint',              desc: 'Cola mojito' },
    { name: 'Blue Lagoon',          price: 450, emoji: '💙', img: 'blue,lagoon,mocktail',           desc: 'Blue lagoon mocktail' },
    { name: 'Sunset Mojito',        price: 450, emoji: '🌅', img: 'sunset,mojito,colorful',         desc: 'Sunset mojito' },
    { name: 'Virgin Mojito',        price: 450, emoji: '🍃', img: 'virgin,mojito,mint,lime',        desc: 'Classic virgin mojito' },
    // --- CLASSIC LEMONADE ---
    { name: 'Strawberry Lemonade',      price: 300, emoji: '🍓', img: 'strawberry,lemonade,pink',  badge: '🍋 Lemonade', desc: 'Fresh strawberry lemonade' },
    { name: 'Sparkling Berry Lemonade', price: 300, emoji: '✨', img: 'sparkling,berry,lemonade',  desc: 'Sparkling berry lemonade' },
    { name: 'Spicy Lemonade',           price: 300, emoji: '🌶️', img: 'spicy,lemonade,chilli',    desc: 'Lemonade with a spicy kick' },
    // --- BARISTA CORNER ---
    {
      name: 'Cappuccino', price: null, emoji: '☕',
      img: 'cappuccino,coffee,foam', badge: '☕ Coffee',
      desc: 'Classic cappuccino — single or double shot',
      variants: [
        { name: 'Single', price: 250 },
        { name: 'Double', price: 350 }
      ]
    },
    {
      name: 'Latte', price: null, emoji: '☕',
      img: 'latte,coffee,milk',
      desc: 'Smooth latte — single or double shot',
      variants: [
        { name: 'Single', price: 250 },
        { name: 'Double', price: 350 }
      ]
    },
    {
      name: 'Americano', price: null, emoji: '☕',
      img: 'americano,black,coffee',
      desc: 'Americano — single or double shot',
      variants: [
        { name: 'Single', price: 250 },
        { name: 'Double', price: 350 }
      ]
    },
    {
      name: 'Café Mocha', price: null, emoji: '☕',
      img: 'cafe,mocha,coffee,chocolate',
      desc: 'Café mocha — single or double shot',
      variants: [
        { name: 'Single', price: 250 },
        { name: 'Double', price: 400 }
      ]
    },
    { name: 'Iced Latte',       price: 300, emoji: '🧊', img: 'iced,latte,cold,coffee',   badge: '🧊 Iced', desc: 'Cold iced latte' },
    { name: 'Iced Cappuccino',  price: 300, emoji: '🧊', img: 'iced,cappuccino,cold',      desc: 'Cold iced cappuccino' },
    { name: 'Iced Americano',   price: 250, emoji: '🧊', img: 'iced,americano,cold',       desc: 'Cold iced americano' },
    { name: 'Dawa',             price: 200, emoji: '🍋', img: 'dawa,kenyan,drink,honey',   badge: '🍋 Kenyan', desc: 'Traditional Kenyan dawa — lemon, honey, vodka alternative' },
    // --- JUICES & SOFT DRINKS ---
    { name: 'Mango Juice',      price: 200, emoji: '🥭', img: 'mango,juice,fresh',          badge: '🍊 Juice', desc: 'Fresh mango juice' },
    { name: 'Watermelon Juice', price: 250, emoji: '🍉', img: 'watermelon,juice,fresh',     desc: 'Fresh watermelon juice' },
    { name: 'Pineapple Juice',  price: 200, emoji: '🍍', img: 'pineapple,juice,tropical',   desc: 'Fresh pineapple juice' },
    { name: 'Delmonte Juice',   price: 350, emoji: '🍊', img: 'delmonte,juice,bottle',      desc: 'Bottled Delmonte juice' },
    { name: 'Minute Maid',      price: 150, emoji: '🍊', img: 'minute,maid,juice,pack',     desc: 'Minute Maid juice pack' },
    { name: 'Fruit Salad',      price: 450, emoji: '🍱', img: 'fruit,salad,honey,bowl',     desc: 'Fresh fruit salad with honey' },
    { name: 'Yogurt',           price: 200, emoji: '🥛', img: 'yogurt,cup,fresh',            desc: 'Fresh yogurt' },
    { name: 'Soda (350ml)',     price: 100, emoji: '🥤', img: 'cold,soda,can,chilled',      desc: 'Chilled soda 350ml' },
    { name: 'Soda (1L)',        price: 250, emoji: '🥤', img: 'soda,bottle,1litre',          desc: 'Soda 1L bottle' },
    { name: 'Keringet Water',   price: 150, emoji: '💧', img: 'keringet,water,bottle',      desc: 'Keringet mineral water 1L' },
    { name: 'Dasani Water',     price: 120, emoji: '💧', img: 'dasani,water,bottle',         desc: 'Dasani water 1L' }
  ]
}

export const TABS = [
  { id: 'specials', label: '⭐ Derby Specials' },
  { id: 'mains',    label: '🍖 Mains'         },
  { id: 'crunchies',label: '🍕 Crunchies'     },
  { id: 'drinks',   label: '🥤 Drinks'        }
]
```

**Step 2: Verify in browser**

Run `npm run dev`, open the Menu section. Confirm all 4 tabs appear and items load without errors.

**Step 3: Commit**

```bash
git add src/data/menu.js
git commit -m "feat: expand menu with real Derby items, prices and local images"
```

---

## Task 4: Update MenuCard to support local image paths

**Files:**
- Modify: `src/components/Menu/MenuCard.jsx`

**Step 1: Update the `imgUrl` helper**

Replace lines 4–8 in `MenuCard.jsx`:

```js
function imgUrl(keyword) {
  if (keyword.startsWith('/')) return keyword
  const tag  = keyword.split(',')[0]
  const lock = Array.from(keyword).reduce((a, c) => a + c.charCodeAt(0), 0) % 97 + 1
  return `https://loremflickr.com/600/400/food,${encodeURIComponent(tag)}?lock=${lock}`
}
```

**Step 2: Verify in browser**

Open Menu → Derby Specials tab. "Platter for 4" should show the real chicken dish photo. "Derby Freaky Shake" should show the elaborate shake photo. Mocktails tab should show the mojito photo.

**Step 3: Commit**

```bash
git add src/components/Menu/MenuCard.jsx
git commit -m "feat: support local image paths in MenuCard"
```

---

## Task 5: Build the OrderModal component

**Files:**
- Create: `src/components/Cart/OrderModal.jsx`
- Create: `src/components/Cart/OrderModal.module.css`

**Step 1: Create `OrderModal.jsx`**

```jsx
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import styles from './OrderModal.module.css'

export default function OrderModal({ cart, notes, onConfirm, onClose }) {
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const subtotal = cart.filter(i => !i.askPrice).reduce((s, i) => s + i.price * i.qty, 0)
  const hasTBC   = cart.some(i => i.askPrice)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError('Please enter your name and phone number.')
      return
    }
    setLoading(true)
    setError('')

    const items = cart.map(i => ({
      name:     i.name,
      qty:      i.qty,
      price:    i.price,
      askPrice: !!i.askPrice
    }))

    const { error: dbError } = await supabase
      .from('orders')
      .insert({ name: name.trim(), phone: phone.trim(), items, total: subtotal, has_tbc: hasTBC, notes })

    if (dbError) {
      console.error('Order save failed:', dbError)
      // Don't block the customer — still proceed to WhatsApp
    }

    setLoading(false)
    onConfirm(name.trim(), phone.trim())
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 className={styles.title}>Almost there!</h2>
        <p className={styles.sub}>Enter your details so we can follow up on your order.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Your Name
            <input
              className={styles.input}
              type="text"
              placeholder="e.g. John Kamau"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>
          <label className={styles.label}>
            Phone Number
            <input
              className={styles.input}
              type="tel"
              placeholder="e.g. 0712 345 678"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Saving...' : '📲 Continue to WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

**Step 2: Create `OrderModal.module.css`**

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  padding: 16px;
}
.modal {
  background: var(--surface);
  border: 1px solid rgba(212,160,23,0.2);
  border-radius: 16px;
  padding: 36px 28px;
  max-width: 420px;
  width: 100%;
  position: relative;
}
.closeBtn {
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 1.1rem;
  cursor: pointer;
}
.title {
  font-size: 1.4rem;
  margin-bottom: 8px;
  color: var(--cream);
}
.sub {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 24px;
}
.form { display: flex; flex-direction: column; gap: 16px; }
.label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.input {
  background: var(--bg);
  border: 1px solid rgba(212,160,23,0.2);
  border-radius: 8px;
  padding: 12px 14px;
  color: var(--cream);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.input:focus { border-color: var(--gold); }
.error { color: #e55; font-size: 0.85rem; }
.submitBtn {
  background: var(--gold);
  color: #1a0e00;
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 8px;
}
.submitBtn:hover { opacity: 0.85; }
.submitBtn:disabled { opacity: 0.5; cursor: not-allowed; }
```

**Step 3: Commit**

```bash
git add src/components/Cart/OrderModal.jsx src/components/Cart/OrderModal.module.css
git commit -m "feat: add OrderModal with name/phone capture and Supabase save"
```

---

## Task 6: Wire OrderModal into Cart

**Files:**
- Modify: `src/components/Cart/Cart.jsx`

**Step 1: Replace Cart.jsx contents**

```jsx
import { useRef, useState } from 'react'
import styles from './Cart.module.css'
import CartItem from './CartItem'
import OrderModal from './OrderModal'

export default function Cart({ cart, isOpen, onClose, onUpdateQty, onClearCart, onSendWhatsApp }) {
  const notesRef   = useRef(null)
  const [showModal, setShowModal] = useState(false)

  const subtotal = cart.filter(i => !i.askPrice).reduce((s, i) => s + i.price * i.qty, 0)
  const hasTBC   = cart.some(i => i.askPrice)

  function handleSendClick() {
    if (cart.length === 0) return
    setShowModal(true)
  }

  function handleModalConfirm(name, phone) {
    setShowModal(false)
    onSendWhatsApp(notesRef.current?.value || '', name, phone)
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
            onClick={handleSendClick}
          >
            📲 Order via WhatsApp
          </button>
        </div>
      </aside>

      {showModal && (
        <OrderModal
          cart={cart}
          notes={notesRef.current?.value || ''}
          onConfirm={handleModalConfirm}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
```

**Step 2: Update `sendWhatsApp` in App.jsx to accept name and phone**

In `src/App.jsx`, update the `sendWhatsApp` function signature (lines 52–68):

```js
const sendWhatsApp = useCallback((notes, name, phone) => {
  if (cart.length === 0) return
  const lines = cart.map(item => {
    const priceStr = item.askPrice ? '(price TBC)' : `Ksh ${(item.price * item.qty).toLocaleString()}`
    return `• ${item.emoji} ${item.name} x${item.qty} — ${priceStr}`
  })
  const subtotal = cart.filter(i => !i.askPrice).reduce((s, i) => s + i.price * i.qty, 0)
  const hasTBC   = cart.some(i => i.askPrice)

  let msg = `🍽️ *NEW ORDER — Derby Restaurant*\n\n`
  msg += `👤 *Customer:* ${name}\n📱 *Phone:* ${phone}\n\n`
  msg += `📋 *Order Details:*\n${lines.join('\n')}\n\n`
  msg += `💰 *Subtotal: Ksh ${subtotal.toLocaleString()}*\n`
  if (hasTBC) msg += `_(Prices TBC items to be confirmed by restaurant)_\n`
  if (notes)  msg += `\n📝 *Notes:* ${notes}\n`
  msg += `\n_Ordered via Derby Restaurant website_`

  window.open('https://wa.me/254792981907?text=' + encodeURIComponent(msg), '_blank')
}, [cart])
```

**Step 3: Verify flow in browser**

1. Add an item to cart
2. Click "Order via WhatsApp"
3. Modal should appear asking for Name + Phone
4. Fill in details and submit
5. Should redirect to WhatsApp with customer name/phone in the message
6. Check Supabase Table Editor — a row should appear in the `orders` table

**Step 4: Commit**

```bash
git add src/components/Cart/Cart.jsx src/App.jsx
git commit -m "feat: wire OrderModal into cart flow, include customer name/phone in WhatsApp message"
```

---

## Task 7: Build the Events section

**Files:**
- Create: `src/components/Events/Events.jsx`
- Create: `src/components/Events/Events.module.css`

**Step 1: Create `Events.jsx`**

```jsx
import styles from './Events.module.css'

const WA_NUMBER = '254792981907'

function waLink(type) {
  const msg = `Hi Derby, I'd like to inquire about a ${type} event booking.`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

const EVENTS = [
  {
    icon: '🎉',
    title: 'Private Events',
    desc: 'Birthdays, corporate functions, family celebrations — we set the scene and handle everything. Full indoor venue, dedicated service, customised menu.',
    cta: 'Book a Private Event',
    type: 'Private'
  },
  {
    icon: '🌿',
    title: 'Outdoor Events',
    desc: 'Garden parties, open-air celebrations and outdoor catering. We bring Derby\'s quality food and service to your outdoor venue.',
    cta: 'Book an Outdoor Event',
    type: 'Outdoor'
  }
]

export default function Events() {
  return (
    <section className={styles.section} id="events">
      <span className={styles.label}>Host With Us</span>
      <h2 className={styles.heading}>Private & <em>Outdoor</em> Events</h2>
      <p className={styles.sub}>
        Make your next celebration unforgettable. Derby handles the food, the setup, and the service — you just enjoy the moment.
      </p>
      <div className={styles.cards}>
        {EVENTS.map(ev => (
          <div key={ev.type} className={styles.card}>
            <span className={styles.icon}>{ev.icon}</span>
            <h3 className={styles.cardTitle}>{ev.title}</h3>
            <p className={styles.cardDesc}>{ev.desc}</p>
            <a
              href={waLink(ev.type)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookBtn}
            >
              📲 {ev.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
```

**Step 2: Create `Events.module.css`**

```css
.section {
  padding: 100px 32px;
  max-width: 1000px;
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
.sub { color: var(--muted); max-width: 560px; margin: 0 auto 56px; }
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.card {
  background: var(--surface);
  border: 1px solid rgba(212,160,23,0.15);
  border-radius: 16px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transition: border-color 0.2s, transform 0.2s;
}
.card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
}
.icon { font-size: 2.8rem; }
.cardTitle { font-size: 1.3rem; font-weight: 700; color: var(--cream); }
.cardDesc { color: var(--muted); font-size: 0.95rem; line-height: 1.6; text-align: center; }
.bookBtn {
  display: inline-block;
  margin-top: 8px;
  background: var(--gold);
  color: #1a0e00;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 12px 28px;
  border-radius: var(--radius-pill);
  text-decoration: none;
  transition: opacity 0.2s;
}
.bookBtn:hover { opacity: 0.85; }
@media (max-width: 640px) {
  .section { padding-left: 16px; padding-right: 16px; }
  .cards { grid-template-columns: 1fr; }
}
```

**Step 3: Commit**

```bash
git add src/components/Events/Events.jsx src/components/Events/Events.module.css
git commit -m "feat: add Events section with Private and Outdoor event cards"
```

---

## Task 8: Wire Events into App.jsx and update Navbar

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Navbar/Navbar.jsx`

**Step 1: Import and render Events in App.jsx**

In `src/App.jsx`, add the import at the top:
```js
import Events from './components/Events/Events'
```

In the home route JSX, add `<Events />` between `<Menu />` and `<Footer />`:
```jsx
<Hero />
<About />
<Menu activeTab={activeTab} onTabChange={setActiveTab} onAddToCart={addToCart} />
<Events />
<Footer />
```

**Step 2: Add Events nav link to Navbar.jsx**

In `src/components/Navbar/Navbar.jsx`, add an anchor link to `#events` inside the `.links` div, before the cart button:

```jsx
<div className={styles.links}>
  <Link to="/about" className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}>
    About
  </Link>
  <a href="/#events" className={styles.navLink}>
    Events
  </a>
  <button className={styles.cartBtn} onClick={onCartToggle}>
    🛒 <span className={styles.badge}>{cartCount}</span>
  </button>
</div>
```

**Step 3: Also update the About section pills to mention events**

In `src/components/About/About.jsx`, update `PILLS`:

```js
const PILLS = ['🕐 Open Daily', '🍽️ Dine In & Takeaway', '📦 Group Platters', '☕ Bar & Beverages', '🎉 Private Events', '🌿 Outdoor Events']
```

**Step 4: Verify in browser**

- Homepage shows Events section between Menu and Footer
- Two event cards render side by side (stacked on mobile)
- "Book a Private Event" button opens WhatsApp with correct message
- Navbar has an "Events" link that scrolls to the events section

**Step 5: Commit**

```bash
git add src/App.jsx src/components/Navbar/Navbar.jsx src/components/About/About.jsx
git commit -m "feat: wire Events section into homepage and add Events link to navbar"
```

---

## Final Verification Checklist

- [ ] Menu shows 4 tabs: Specials, Mains, Crunchies, Drinks
- [ ] "Platter for 4" shows the real chicken dish photo
- [ ] "Derby Freaky Shake" shows the elaborate shake photo
- [ ] "Chicken Shawarma" shows the wrap+chips photo
- [ ] Mocktail items show the mojito photo
- [ ] "Add to cart" → cart opens → "Order via WhatsApp" → modal appears asking Name + Phone
- [ ] After submitting modal → WhatsApp opens with customer name and phone in message
- [ ] Supabase `orders` table has a new row with the order details
- [ ] Homepage shows Events section with two cards
- [ ] Events "Book" buttons open WhatsApp with the correct pre-filled messages
- [ ] Navbar shows "Events" link
- [ ] Mobile layout: event cards stack vertically
