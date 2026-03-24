import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg} />
      <div className={styles.content}>
        <span className={styles.badge}>📍 Kiambu's Hidden Gem</span>
        <h1 className={styles.title}>
          <span className={styles.titleMain}>Derby</span>
          <span className={styles.titleGold}>Restaurant</span>
        </h1>
        <p className={styles.sub}>
          Authentic platters, sizzling meats &amp; irresistible crunchies.
          Sit back and let us serve you excellence on every plate.
        </p>
        <div className={styles.ctas}>
          <a href="#menu" className={styles.btnGold}>View Menu</a>
          <a href="https://wa.me/254792981907" className={styles.btnGhost} target="_blank" rel="noopener">
            📞 Call Us
          </a>
        </div>
      </div>
      <div className={styles.scrollIndicator}>↓</div>
    </section>
  )
}
