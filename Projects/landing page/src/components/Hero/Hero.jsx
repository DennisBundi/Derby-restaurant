import { useFadeIn } from '../../hooks/useFadeIn'
import styles from './Hero.module.css'

export default function Hero() {
  const ref = useFadeIn()
  return (
    <section id="hero" className={styles.hero}>
      <div ref={ref} className={`glass ${styles.card}`}>
        <p className={styles.subtitle}>Karibu — Welcome Home</p>
        <h1 className={styles.title}>
          Kiamiko<br />Catholic Church
        </h1>
        <p className={styles.tagline}>
          A community of faith, hope, and love in the heart of Kenya
        </p>
        <a href="#mass-schedule" className={styles.btn}>View Mass Times</a>
      </div>
    </section>
  )
}
