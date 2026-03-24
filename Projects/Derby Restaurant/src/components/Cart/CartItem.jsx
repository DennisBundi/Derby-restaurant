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
