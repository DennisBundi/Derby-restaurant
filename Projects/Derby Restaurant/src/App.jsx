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
    return () => { document.body.style.overflow = '' }
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
