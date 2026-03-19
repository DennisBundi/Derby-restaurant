import styles from './Ministries.module.css'

const ministries = [
  { icon: '🙏', name: 'Youth Group', desc: 'Empowering the next generation through faith, fellowship, and service. Meets every Saturday at 3 PM.' },
  { icon: '👑', name: "Women's Guild", desc: 'A sisterhood of prayer, charity, and support. Umoja wa Wanawake. Meets first Sunday monthly.' },
  { icon: '🎵', name: 'Parish Choir', desc: 'Lifting hearts through music and praise. Rehearsals every Friday at 6 PM. All voices welcome.' },
  { icon: '🤝', name: "Men's Fellowship", desc: 'Brotherhood rooted in faith and service to family and community. Meets second Sunday monthly.' },
]

export default function Ministries() {
  return (
    <section id="ministries" className={styles.section}>
      <div className={styles.container}>
        <p className="sectionLabel centered">Ministries — Huduma</p>
        <h2 className={`${styles.title} centered`}>Find Your Community</h2>
        <div className={styles.grid}>
          {ministries.map(({ icon, name, desc }) => (
            <div key={name} className={`glass ${styles.card}`}>
              <div className={styles.icon}>{icon}</div>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.desc}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
