import { useRef, useEffect } from 'react'
import styles from './MenuCard.module.css'

function imgUrl(keyword) {
  const tag = keyword.split(',')[0]
  const lock = Array.from(keyword).reduce((a, c) => a + c.charCodeAt(0), 0) % 97 + 1
  return `https://loremflickr.com/600/400/food,${encodeURIComponent(tag)}?lock=${lock}`
}

export default function MenuCard({ item, onAddToCart }) {
  const wrapRef = useRef(null)
  const imgRef  = useRef(null)

  useEffect(() => {
    if (imgRef.current?.complete) {
      wrapRef.current?.classList.add(styles.loaded)
    }
  }, [])

  function handleLoad() {
    if (wrapRef.current) wrapRef.current.classList.add(styles.loaded)
  }

  const hasVariants = item.variants && item.variants.length > 0

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap} ref={wrapRef}>
        {item.badge && <span className={styles.badge}>{item.badge}</span>}
        <img
          ref={imgRef}
          className={styles.img}
          src={imgUrl(item.img)}
          alt={item.name}
          loading="lazy"
          onLoad={handleLoad}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.desc}>{item.desc}</div>
        {hasVariants ? (
          <div className={styles.variants}>
            {item.variants.map(v => {
              const vAsk = v.askPrice || v.price === null
              const fullName = `${item.name} – ${v.name}`
              return (
                <button
                  key={v.name}
                  className={styles.variantRow}
                  onClick={() => onAddToCart(fullName, v.price, item.emoji, vAsk)}
                >
                  <span className={styles.variantName}>{v.name}</span>
                  <span className={styles.variantPrice}>
                    {vAsk ? 'Ask for price' : `Ksh ${v.price.toLocaleString()}`}
                  </span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className={styles.footer}>
            <span className={item.askPrice ? styles.priceAsk : styles.price}>
              {item.askPrice ? 'Ask for price' : `Ksh ${item.price.toLocaleString()}`}
            </span>
            <button
              className={styles.addBtn}
              onClick={() => onAddToCart(item.name, item.price, item.emoji, !!item.askPrice)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
