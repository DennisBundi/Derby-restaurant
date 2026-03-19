import { useFadeIn } from '../../hooks/useFadeIn'
import styles from './Contact.module.css'

const details = [
  { icon: '📍', label: 'Address', value: "Kiamiko, Murang'a County\nKenya" },
  { icon: '📞', label: 'Phone', value: '+254 700 000 000' },
  { icon: '✉️', label: 'Email', value: 'info@kiamikocatholic.co.ke' },
  { icon: '🕐', label: 'Office Hours', value: 'Mon – Fri: 8:00 AM – 5:00 PM\nSat: 9:00 AM – 1:00 PM' },
]

export default function Contact() {
  const ref = useFadeIn()
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <p className="sectionLabel centered">Contact — Wasiliana Nasi</p>
        <h2 className={`${styles.title} centered`}>Find Us</h2>
        <div ref={ref} className={styles.grid}>
          <div className={`glass ${styles.info}`}>
            {details.map(({ icon, label, value }) => (
              <div key={label} className={styles.item}>
                <span className={styles.icon}>{icon}</span>
                <div>
                  <strong className={styles.label}>{label}</strong>
                  <p className={styles.value}>{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={`glass ${styles.mapWrap}`}>
            <iframe
              title="Kiamiko Catholic Church location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d37.15!3d-0.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMCowMCJOIDM3wrAwOScwMCJF!5e0!3m2!1sen!2ske!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px', minHeight: '360px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
