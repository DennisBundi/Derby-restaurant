import styles from './TabBar.module.css'
import { MENU, TABS } from '../../data/menu'

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div className={styles.bar}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.btn} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label} ({MENU[tab.id].length})
        </button>
      ))}
    </div>
  )
}
