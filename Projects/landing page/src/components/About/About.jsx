import { useFadeIn } from '../../hooks/useFadeIn'
import styles from './About.module.css'

export default function About() {
  const ref = useFadeIn()
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div ref={ref} className={`glass ${styles.card}`}>
          <div className={styles.text}>
            <p className="sectionLabel">About Us — Kuhusu Sisi</p>
            <h2 className={styles.title}>A Parish Rooted in Faith</h2>
            <p>
              Kiamiko Catholic Church is a vibrant parish community dedicated to worshipping God,
              serving one another, and reaching out to the wider community. Guided by the teachings
              of the Catholic Church, we welcome all who seek grace, healing, and belonging.
            </p>
            <p>
              Tunakukaribisha kwa jina la Baba, na Mwana, na Roho Mtakatifu. Amen.
            </p>
          </div>
          <div className={styles.icon}>✝</div>
        </div>
      </div>
    </section>
  )
}
