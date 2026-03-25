import { useState, useEffect } from 'react'
import styles from './Gallery.module.css'

const PHOTOS = [
  { src: 'https://loremflickr.com/600/400/food,restaurant?lock=1',  alt: 'Restaurant interior' },
  { src: 'https://loremflickr.com/600/400/grilled,meat,platter?lock=2', alt: 'Grilled platter' },
  { src: 'https://loremflickr.com/600/400/african,food,kenyan?lock=3',  alt: 'Kenyan cuisine' },
  { src: 'https://loremflickr.com/600/400/shawarma,wrap?lock=4',        alt: 'Shawarma wrap' },
  { src: 'https://loremflickr.com/600/400/pizza,restaurant?lock=5',     alt: 'Fresh pizza' },
  { src: 'https://loremflickr.com/600/400/dessert,cake,bakery?lock=6',  alt: 'Bakery & sweets' },
  { src: 'https://loremflickr.com/600/400/chicken,grilled?lock=7',      alt: 'Grilled chicken' },
  { src: 'https://loremflickr.com/600/400/mocktail,drinks?lock=8',      alt: 'Drinks & mocktails' },
]

export default function Gallery() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null) return
    function handleKey(e) {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active])

  return (
    <section className={styles.section}>
      <span className={styles.label}>A Taste of Derby</span>
      <h2 className={styles.heading}>Gallery</h2>
      <div className={styles.grid}>
        {PHOTOS.map((photo, i) => (
          <button
            key={i}
            className={styles.tile}
            onClick={() => setActive(photo)}
            aria-label={`View ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" className={styles.img} />
          </button>
        ))}
      </div>

      {active && (
        <div className={styles.lightbox} onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <button className={styles.close} onClick={() => setActive(null)} aria-label="Close">✕</button>
          <img
            src={active.src}
            alt={active.alt}
            className={styles.lightboxImg}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
