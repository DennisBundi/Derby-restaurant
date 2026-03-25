import styles from './TeamGrid.module.css'

const TEAM = [
  { name: 'Chef Daniel', role: 'Head Chef', lock: 10 },
  { name: 'Amina Wanjiku', role: 'Pastry & Bakery', lock: 22 },
  { name: 'Brian Kamau', role: 'Grill Master', lock: 35 },
  { name: 'Faith Njeri', role: 'Front of House', lock: 47 },
]

export default function TeamGrid() {
  return (
    <section className={styles.section}>
      <span className={styles.label}>The People Behind the Plates</span>
      <h2 className={styles.heading}>Meet the Team</h2>
      <div className={styles.grid}>
        {TEAM.map(member => (
          <div key={member.name} className={styles.card}>
            <img
              className={styles.photo}
              src={`https://loremflickr.com/300/300/person,portrait?lock=${member.lock}`}
              alt={member.name}
              loading="lazy"
            />
            <div className={styles.name}>{member.name}</div>
            <div className={styles.role}>{member.role}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
