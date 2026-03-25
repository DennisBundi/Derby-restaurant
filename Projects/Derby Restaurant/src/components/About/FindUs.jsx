import styles from './FindUs.module.css'

export default function FindUs() {
  return (
    <section className={styles.section}>
      <span className={styles.label}>Where to Find Us</span>
      <h2 className={styles.heading}>Find Us</h2>
      <div className={styles.mapWrap}>
        <iframe
          title="Derby Restaurant Location"
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d36.8358!3d-1.1712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTAnMTYuMyJTIDM2wrA1MCcwOC45IkU!5e0!3m2!1sen!2ske!4v1"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className={styles.info}>
        <p className={styles.address}>📍 Kiambu Town, Kiambu County, Kenya</p>
        <a href="https://wa.me/254792981907" className={styles.waLink}>
          📱 +254 792 981 907 — Order on WhatsApp
        </a>
        <p className={styles.hours}>🕐 Open Daily · 8:00 AM – 10:00 PM</p>
      </div>
    </section>
  )
}
