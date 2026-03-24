import { useRef } from 'react'
import styles from './Cart.module.css'
import CartItem from './CartItem'

export default function Cart({ cart, isOpen, onClose, onUpdateQty, onClearCart, onSendWhatsApp }) {
  const notesRef = useRef(null)

  const subtotal = cart.filter(i => !i.askPrice).reduce((s, i) => s + i.price * i.qty, 0)
  const hasTBC   = cart.some(i => i.askPrice)

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
