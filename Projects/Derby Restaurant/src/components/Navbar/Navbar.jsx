import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar({ cartCount, onCartToggle }) {
  const { pathname } = useLocation()

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoDerby}>Derby</span>
          <span className={styles.logoRest}>Restaurant</span>
        </Link>
        <div className={styles.links}>
          <Link to="/about" className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}>
            About
          </Link>
          <a href="/#events" className={styles.navLink}>Events</a>
          <button className={styles.cartBtn} onClick={onCartToggle}>
            🛒 <span className={styles.badge}>{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
