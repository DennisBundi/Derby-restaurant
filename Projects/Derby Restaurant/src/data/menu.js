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
        { name: 'BBQ Beef',            price: null, askPrice: true },
        { name: 'BBQ Mutton',          price: null, askPrice: true },
        { name: 'Fish Fingers',        price: null, askPrice: true },
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
