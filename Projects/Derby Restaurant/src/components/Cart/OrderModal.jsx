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
