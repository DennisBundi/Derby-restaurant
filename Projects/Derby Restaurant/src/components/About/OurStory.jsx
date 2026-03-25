import styles from './OurStory.module.css'

export default function OurStory() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.label}>Est. in Kiambu</span>
        <h1 className={styles.heading}>The Derby Story</h1>
        <p className={styles.text}>
          Derby Restaurant was born out of a simple belief: that great food brings people together.
          Nestled in the heart of Kiambu Town, we set out to create a place where families, friends,
          and colleagues could share honest, flavourful meals without compromise.
        </p>
        <p className={styles.text}>
          From our signature mega platters to handcrafted crunchies and freshly baked pastries,
          every item on our menu is prepared fresh daily. We source local ingredients where we can
          and take pride in every plate that leaves our kitchen.
        </p>
        <p className={styles.text}>
          Today, Derby is Kiambu's go-to spot for sizzling meats, shawarma, biriyani, and so much more.
          Whether you dine in, take away, or order via WhatsApp — we treat every meal as an occasion.
        </p>
      </div>
    </section>
  )
}
