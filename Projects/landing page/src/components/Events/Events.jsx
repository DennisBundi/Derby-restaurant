import styles from './Events.module.css'

const events = [
  { day: '29', month: 'Mar', title: 'Palm Sunday Procession', desc: "Join us as we commemorate Jesus' triumphal entry into Jerusalem. Procession begins at 8:30 AM." },
  { day: '18', month: 'Apr', title: 'Easter Vigil Mass', desc: 'The pinnacle of the liturgical year. Holy Saturday at 7:30 PM. All parishioners and guests welcome.' },
  { day: '04', month: 'May', title: 'Parish Family Day', desc: 'A day of fun, food, and fellowship for the whole family. Grounds open from 10 AM. Karibu wote!' },
]

export default function Events() {
  return (
    <section id="events" className={styles.section}>
      <div className={styles.container}>
        <p className="sectionLabel centered">Events — Matukio</p>
        <h2 className={`${styles.title} centered`}>Upcoming Gatherings</h2>
        <div className={styles.list}>
          {events.map(({ day, month, title, desc }) => (
            <div key={title} className={`glass ${styles.card}`}>
              <div className={styles.dateBadge}>
                <span className={styles.day}>{day}</span>
                <span className={styles.month}>{month}</span>
              </div>
              <div className={styles.info}>
                <h3 className={styles.eventTitle}>{title}</h3>
                <p className={styles.eventDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
