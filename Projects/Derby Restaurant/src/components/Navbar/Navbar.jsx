import styles from './Navbar.module.css'

export default function Navbar({ cartCount, onCartToggle }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.logoDerby}>Derby</span>
        <span className={styles.logoRest}>Restaurant</span>
      </div>
      <button className={styles.cartBtn} onClick={onCartToggle}>
        🛒 <span className={styles.badge}>{cartCount}</span>
      </button>
    </nav>
  )
}
