import styles from './Menu.module.css'
import TabBar from './TabBar'
import MenuCard from './MenuCard'
import { MENU } from '../../data/menu'

export default function Menu({ activeTab, onTabChange, onAddToCart }) {
  return (
    <section className={styles.section} id="menu">
      <span className={styles.label}>What We Serve</span>
      <h2 className={styles.heading}>Our Full Menu</h2>
      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
      <div className={styles.grid}>
        {MENU[activeTab].map(item => (
          <MenuCard key={item.name} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}
