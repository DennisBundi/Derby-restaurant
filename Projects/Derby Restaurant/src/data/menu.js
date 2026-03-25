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
      desc: "Half chicken, honey glazed — Chef's Special"
    }
  ],

  mains: [
    { name: 'Beef Gulash',   price: 400,  emoji: '🥩', img: 'beef,stew,kenyan',       badge: '🥩 Beef', desc: 'Classic Kenyan beef gulash' },
    { name: 'Beef Curry',    price: 500,  emoji: '🥩', img: 'beef,curry,spiced',       desc: 'Spiced beef curry' },
    { name: 'Beef Fry',      price: 450,  emoji: '🥩', img: 'beef,dry,fry,kenya',      desc: 'Kenyan-style beef dry fry' },
    { name: 'Beef 1KG',      price: 1750, emoji: '🥩', img: 'beef,grilled,kilogram',   badge: '🥩 1KG', desc: 'Full kilogram of beef, your choice of preparation' },
    { name: 'Chicken Marinate ¼',     price: 350,  emoji: '🍗', img: 'marinated,chicken,quarter', desc: 'Quarter chicken, beautifully marinated' },
    { name: 'Chicken Curry ¼',        price: 450,  emoji: '🍗', img: 'chicken,curry,quarter',     desc: 'Quarter chicken in rich curry sauce' },
    { name: 'Chicken Fry ¼',          price: 400,  emoji: '🍗', img: 'fried,chicken,quarter',     desc: 'Quarter fried chicken' },
    { name: 'Chicken with Chips',     price: 550,  emoji: '🍗', img: 'chicken,chips,fries',       badge: '🍟 + Chips', desc: 'Chicken served with chips' },
    { name: 'Full Chicken Marinated', price: 1300, emoji: '🍗', img: 'whole,marinated,chicken',   badge: '🍗 Full', desc: 'Whole marinated chicken' },
    { name: 'Drumstick Combo',        price: 450,  emoji: '🍗', img: 'drumstick,chicken,combo',   desc: 'Drumstick combo platter' },
    { name: 'Kienyeji Full Chicken',  price: 1800, emoji: '🐓', img: 'kienyeji,chicken,whole',    badge: '🐓 Kienyeji', desc: "Full free-range chicken, Mama's way" },
    { name: 'Kienyeji Chicken ¼',     price: 450,  emoji: '🐓', img: 'kienyeji,chicken,quarter',  desc: "Quarter free-range chicken, Mama's way" },
    { name: 'Kienyeji Chicken ½',     price: 900,  emoji: '🐓', img: 'kienyeji,chicken,half',     desc: 'Half free-range chicken' },
    { name: 'Mutton Wet Fry',  price: 400,  emoji: '🐑', img: 'mutton,wet,fry,kenya',    badge: '🐑 Mutton', desc: 'Mutton wet fry' },
    { name: 'Mutton Dry Fry',  price: 450,  emoji: '🐑', img: 'mutton,dry,fry,kenya',    desc: 'Mutton dry fry' },
    { name: 'Mutton 1KG',      price: 1900, emoji: '🐑', img: 'mutton,roasted,kilogram', badge: '🐑 1KG', desc: 'Full kilogram of mutton' },
    { name: 'Fish Fillet',     price: 500,  emoji: '🐟', img: 'fish,fillet,chips',       badge: '🐟 Fish', desc: 'Fish fillet with chips etc.' },
    { name: 'Fish Fingers',    price: 550,  emoji: '🐟', img: 'fish,fingers,crispy',     desc: 'Crispy fish fingers with chips etc.' },
    { name: 'Garden Peas',                price: 200, emoji: '🫛', img: 'garden,peas,kenyan',      desc: 'Garden peas' },
    { name: 'Minji with Chapati',         price: 250, emoji: '🫛', img: 'peas,chapati,kenyan',      desc: 'Peas served with chapati' },
    { name: 'Minji Special',              price: 350, emoji: '🫛', img: 'peas,special,kenyan',      badge: '⭐ Special', desc: 'Minji Special' },
    { name: 'Minji Special with Chapati', price: 400, emoji: '🫛', img: 'peas,chapati,special',     desc: 'Minji Special with chapati' },
    { name: 'Matumbo',                    price: 250, emoji: '🍲', img: 'matumbo,tripe,kenyan',     desc: 'Kenyan-style matumbo' },
    { name: 'Matumbo Wet with Ugali',     price: 300, emoji: '🍲', img: 'matumbo,ugali,kenya',      desc: 'Matumbo wet fry with ugali' },
    { name: 'Matumbo Wet with Chapati',   price: 300, emoji: '🍲', img: 'matumbo,chapati,kenya',    desc: 'Matumbo wet fry with chapati' },
    { name: 'Liver Fry',                  price: 350, emoji: '🍲', img: 'liver,fry,kenyan',         desc: 'Fried liver' },
    { name: 'Liver Fry with Ugali',       price: 400, emoji: '🍲', img: 'liver,ugali,kenya',        desc: 'Fried liver served with ugali' },
    { name: 'Vegetable Rice',             price: 200, emoji: '🍚', img: 'vegetable,rice,kenyan',    desc: 'Vegetable fried rice' },
    { name: 'Pilau (Swahili Style)',      price: 300, emoji: '🍚', img: 'pilau,swahili,rice',       badge: '🌟 Swahili', desc: 'Authentic Swahili-style pilau' },
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
    { name: 'Yellow Beans Special',price: 300, emoji: '🫘', img: 'yellow,beans,special',       badge: '⭐ Special', desc: 'Yellow beans, special preparation' },
    { name: 'Githeri',             price:  70, emoji: '🫘', img: 'githeri,kenyan,beans',       desc: 'Traditional Kenyan githeri' },
    { name: 'Stir-Fry Mixed Veg',  price: 200, emoji: '🥦', img: 'stir,fry,vegetables',        desc: 'Stir-fried mixed vegetables' }
  ],

  crunchies: [
    {
      name: 'Pizza', price: null, emoji: '🍕',
      img: 'pizza,slice,crispy', badge: '🍕 3 Sizes',
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
    { name: 'Mega Shawarma',        price: 600, emoji: '🌯', img: 'mega,shawarma,wrap',       badge: '🌯 Mega', desc: 'Loaded mega shawarma' },
    { name: 'Beef Burger',          price: 450, emoji: '🍔', img: 'beef,burger,bun',           desc: 'Juicy beef burger' },
    { name: 'Chicken Burger',       price: 450, emoji: '🍔', img: 'chicken,burger,bun',        desc: 'Crispy chicken burger' },
    { name: 'Cheese Burger',        price: 600, emoji: '🍔', img: 'cheese,burger,melted',      badge: '🧀 Cheese', desc: 'Double cheese burger' },
    { name: 'Chips Chicken',        price: 550, emoji: '🍟', img: 'chips,chicken,plate',       desc: 'Chips + chicken combo' },
    { name: 'Masala Chips',         price: 250, emoji: '🍟', img: 'masala,chips,spiced',       desc: 'Chips tossed in masala spices' },
    { name: 'Loaded Fries',         price: 600, emoji: '🍟', img: 'loaded,fries,toppings',     badge: '🔥 Loaded', desc: 'Fries loaded with toppings + 500ml Soda' },
    { name: 'Fish Nuggets',         price: 650, emoji: '🐟', img: 'fish,nuggets,crispy',       desc: 'Crispy fish nuggets' },
    { name: 'BBQ Beef',             price: 550, emoji: '🔥', img: 'bbq,beef,grilled',          badge: '🔥 BBQ', desc: 'BBQ beef with fries' },
    { name: 'Sweet Chilli Chicken', price: 600, emoji: '🌶️', img: 'sweet,chilli,chicken',      desc: 'Sweet chilli chicken with fries' },
    { name: 'Mutton BBQ',           price: 700, emoji: '🔥', img: 'bbq,mutton,grilled',        desc: 'BBQ mutton' },
    { name: 'Wraps',                price: 400, emoji: '🌯', img: 'wrap,tortilla,filling',     desc: 'Freshly made wraps' },
    { name: 'Spring Roll (Beef)',   price: 150, emoji: '🥟', img: 'spring,roll,beef',          desc: 'Beef spring roll' },
    { name: 'Spring Roll (Chicken)',price: 150, emoji: '🥟', img: 'spring,roll,chicken',       desc: 'Chicken spring roll' },
    { name: 'Bhajia',               price: 250, emoji: '🧅', img: 'bhajia,onion,crispy',       desc: 'Crispy bhajia' },
    { name: 'Chicken Sandwich',     price: 300, emoji: '🥪', img: 'chicken,sandwich,bread',    desc: 'Chicken sandwich' },
    { name: 'Veggie Sandwich',      price: 200, emoji: '🥪', img: 'veggie,sandwich,bread',     desc: 'Vegetarian sandwich' },
    { name: 'Sausage Roll',         price: 150, emoji: '🌭', img: 'sausage,roll,pastry',       desc: 'Buttery pastry wrapped sausage' },
    { name: 'Hotdog',               price: 150, emoji: '🌭', img: 'hotdog,sausage,bun',        desc: 'Classic hotdog in a soft bun' },
    { name: 'Doughnuts',            price:  50, emoji: '🍩', img: 'doughnuts,fried,sweet',     desc: 'Fresh fried doughnuts' },
    { name: 'Half Cake',            price:  50, emoji: '🍰', img: 'cake,slice,sweet',           desc: 'Slice of cake' },
    { name: 'Chocolate Muffin',     price: 150, emoji: '🧁', img: 'chocolate,muffin,bakery',   desc: 'Rich chocolate muffin, freshly baked' },
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
    { name: 'Strawberry Smoothie',     price: 400, emoji: '🍓', img: 'strawberry,smoothie,pink',    badge: '🍓 Smoothie', desc: 'Fresh strawberry smoothie' },
    { name: 'Chocolate Smoothie',      price: 400, emoji: '🍫', img: 'chocolate,smoothie,thick',    desc: 'Rich chocolate smoothie' },
    { name: 'Oreo Smoothie',           price: 450, emoji: '🍪', img: 'oreo,smoothie,cookie',        desc: 'Oreo blended smoothie' },
    { name: 'Blueberry Smoothie',      price: 400, emoji: '🫐', img: 'blueberry,smoothie,purple',   desc: 'Fresh blueberry smoothie' },
    { name: 'Passion Fruit Smoothie',  price: 450, emoji: '🍊', img: 'passion,fruit,smoothie',      desc: 'Tropical passion fruit smoothie' },
    { name: 'Vanilla Shake',    price: 350, emoji: '🥛', img: 'vanilla,milkshake,glass',     badge: '🥛 Shake', desc: 'Classic vanilla milkshake' },
    { name: 'Chocolate Shake',  price: 350, emoji: '🍫', img: 'chocolate,milkshake,thick',   desc: 'Rich chocolate milkshake' },
    { name: 'Strawberry Shake', price: 350, emoji: '🍓', img: '/Screenshot 2026-03-25 081555.png', desc: 'Fresh strawberry milkshake' },
    { name: 'Mocha Shake',      price: 400, emoji: '☕', img: 'mocha,milkshake,coffee',      desc: 'Coffee mocha milkshake' },
    { name: 'Mango Shake',      price: 350, emoji: '🥭', img: 'mango,milkshake,tropical',    desc: 'Tropical mango milkshake' },
    { name: 'Banana Shake',     price: 350, emoji: '🍌', img: 'banana,milkshake,creamy',     desc: 'Creamy banana milkshake' },
    { name: 'Tropical Shake',   price: 400, emoji: '🍹', img: 'tropical,milkshake,fruit',    desc: 'Tropical fruit milkshake' },
    { name: 'Passion Fruit Mojito',     price: 450, emoji: '🍹', img: '/Screenshot 2026-03-25 081440.png', badge: '🍹 Mocktail', desc: 'Fresh passion fruit mojito' },
    { name: 'Cola Mojito',              price: 450, emoji: '🍹', img: 'cola,mojito,mint',              desc: 'Cola mojito' },
    { name: 'Blue Lagoon',              price: 450, emoji: '💙', img: 'blue,lagoon,mocktail',           desc: 'Blue lagoon mocktail' },
    { name: 'Sunset Mojito',            price: 450, emoji: '🌅', img: 'sunset,mojito,colorful',         desc: 'Sunset mojito' },
    { name: 'Virgin Mojito',            price: 450, emoji: '🍃', img: 'virgin,mojito,mint,lime',        desc: 'Classic virgin mojito' },
    { name: 'Strawberry Lemonade',      price: 300, emoji: '🍓', img: 'strawberry,lemonade,pink',  badge: '🍋 Lemonade', desc: 'Fresh strawberry lemonade' },
    { name: 'Sparkling Berry Lemonade', price: 300, emoji: '✨', img: 'sparkling,berry,lemonade',  desc: 'Sparkling berry lemonade' },
    { name: 'Spicy Lemonade',           price: 300, emoji: '🌶️', img: 'spicy,lemonade,chilli',    desc: 'Lemonade with a spicy kick' },
    {
      name: 'Cappuccino', price: null, emoji: '☕',
      img: 'cappuccino,coffee,foam', badge: '☕ Coffee',
      desc: 'Classic cappuccino — single or double shot',
      variants: [{ name: 'Single', price: 250 }, { name: 'Double', price: 350 }]
    },
    {
      name: 'Latte', price: null, emoji: '☕',
      img: 'latte,coffee,milk',
      desc: 'Smooth latte — single or double shot',
      variants: [{ name: 'Single', price: 250 }, { name: 'Double', price: 350 }]
    },
    {
      name: 'Americano', price: null, emoji: '☕',
      img: 'americano,black,coffee',
      desc: 'Americano — single or double shot',
      variants: [{ name: 'Single', price: 250 }, { name: 'Double', price: 350 }]
    },
    {
      name: 'Café Mocha', price: null, emoji: '☕',
      img: 'cafe,mocha,coffee,chocolate',
      desc: 'Café mocha — single or double shot',
      variants: [{ name: 'Single', price: 250 }, { name: 'Double', price: 400 }]
    },
    { name: 'Iced Latte',      price: 300, emoji: '🧊', img: 'iced,latte,cold,coffee',  badge: '🧊 Iced', desc: 'Cold iced latte' },
    { name: 'Iced Cappuccino', price: 300, emoji: '🧊', img: 'iced,cappuccino,cold',     desc: 'Cold iced cappuccino' },
    { name: 'Iced Americano',  price: 250, emoji: '🧊', img: 'iced,americano,cold',      desc: 'Cold iced americano' },
    { name: 'Dawa',            price: 200, emoji: '🍋', img: 'dawa,kenyan,drink,honey',  badge: '🍋 Kenyan', desc: 'Traditional Kenyan dawa — lemon, honey & ginger' },
    { name: 'Mango Juice',      price: 200, emoji: '🥭', img: 'mango,juice,fresh',        badge: '🍊 Juice', desc: 'Fresh mango juice' },
    { name: 'Watermelon Juice', price: 250, emoji: '🍉', img: 'watermelon,juice,fresh',   desc: 'Fresh watermelon juice' },
    { name: 'Pineapple Juice',  price: 200, emoji: '🍍', img: 'pineapple,juice,tropical', desc: 'Fresh pineapple juice' },
    { name: 'Delmonte Juice',   price: 350, emoji: '🍊', img: 'delmonte,juice,bottle',    desc: 'Bottled Delmonte juice' },
    { name: 'Minute Maid',      price: 150, emoji: '🍊', img: 'minute,maid,juice,pack',   desc: 'Minute Maid juice pack' },
    { name: 'Fruit Salad',      price: 450, emoji: '🍱', img: 'fruit,salad,honey,bowl',   desc: 'Fresh fruit salad with honey' },
    { name: 'Yogurt',           price: 200, emoji: '🥛', img: 'yogurt,cup,fresh',          desc: 'Fresh yogurt' },
    { name: 'Soda (350ml)',     price: 100, emoji: '🥤', img: 'cold,soda,can,chilled',    desc: 'Chilled soda 350ml' },
    { name: 'Soda (1L)',        price: 250, emoji: '🥤', img: 'soda,bottle,1litre',        desc: 'Soda 1L bottle' },
    { name: 'Keringet Water',   price: 150, emoji: '💧', img: 'keringet,water,bottle',    desc: 'Keringet mineral water 1L' },
    { name: 'Dasani Water',     price: 120, emoji: '💧', img: 'dasani,water,bottle',       desc: 'Dasani water 1L' }
  ]
}

export const TABS = [
  { id: 'specials',  label: '⭐ Derby Specials' },
  { id: 'mains',     label: '🍖 Mains'          },
  { id: 'crunchies', label: '🍕 Crunchies'      },
  { id: 'drinks',    label: '🥤 Drinks'         }
]
