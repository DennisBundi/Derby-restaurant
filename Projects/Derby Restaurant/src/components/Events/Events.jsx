import styles from './Events.module.css'

const WA_NUMBER = '254792981907'

function waLink(type) {
  const msg = `Hi Derby, I'd like to inquire about a ${type} event booking.`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

const EVENTS = [
  {
    icon: '🎉',
    title: 'Private Events',
    desc: 'Birthdays, corporate functions, family celebrations — we set the scene and handle everything. Full indoor venue, dedicated service, customised menu.',
    cta: 'Book a Private Event',
    type: 'Private'
  },
  {
    icon: '🌿',
    title: 'Outdoor Events',
    desc: "Garden parties, open-air celebrations and outdoor catering. We bring Derby's quality food and service to your outdoor venue.",
    cta: 'Book an Outdoor Event',
    type: 'Outdoor'
  }
]

export default function Events() {
  return (
    <section className={styles.section} id="events">
      <span className={styles.label}>Host With Us</span>
      <h2 className={styles.heading}>Private & <em>Outdoor</em> Events</h2>
      <p className={styles.sub}>
        Make your next celebration unforgettable. Derby handles the food, the setup, and the service — you just enjoy the moment.
      </p>
      <div className={styles.cards}>
        {EVENTS.map(ev => (
          <div key={ev.type} className={styles.card}>
            <span className={styles.icon}>{ev.icon}</span>
            <h3 className={styles.cardTitle}>{ev.title}</h3>
            <p className={styles.cardDesc}>{ev.desc}</p>
            <a
              href={waLink(ev.type)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookBtn}
            >
              📲 {ev.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
