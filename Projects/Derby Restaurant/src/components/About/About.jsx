import { Link } from 'react-router-dom'
import styles from './About.module.css'

const PILLS = ['🕐 Open Daily', '🍽️ Dine In & Takeaway', '📦 Group Platters', '☕ Bar & Beverages']

export default function About() {
  return (
    <section className={styles.about} id="about">
      <span className={styles.label}>Why Derby?</span>
      <h2 className={styles.heading}>Kiambu's Best <em>Platters</em></h2>
      <p className={styles.desc}>
        From sizzling meats to handcrafted crunchies, Derby Restaurant has been the heartbeat
        of Kiambu dining. Every dish is made with passion, fresh ingredients, and a commitment to flavour.
      </p>
      <div className={styles.pills}>
        {PILLS.map(p => <span key={p} className={styles.pill}>{p}</span>)}
      </div>
      <Link to="/about" className={styles.storyLink}>Read our full story →</Link>
    </section>
  )
}
