import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.name}>Derby Restaurant</p>
      <address className={styles.loc}>
        📍 Kiambu, Kenya &nbsp;|&nbsp;
        <a href="https://wa.me/254792981907">📱 +254 792 981 907</a>
      </address>
      <p className={styles.tag}>Sit back, relax, and allow us to serve you excellence on every plate.</p>
    </footer>
  )
}
