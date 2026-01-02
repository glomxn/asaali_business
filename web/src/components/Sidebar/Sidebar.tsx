import React from 'react';
import { Store, FilePlus2, Inbox, Briefcase, Shield } from 'lucide-react';
import styles from './Sidebar.module.css';

const icons = { Store, FilePlus2, Inbox, Briefcase, Shield };

export default function Sidebar({ items, activeId, onSelect }:{
  items:{id:string; label:string; icon:keyof typeof icons}[];
  activeId:string;
  onSelect:(id:string)=>void;
}) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>BE</div>
        <div>
          <div className={styles.title}>Bureau</div>
          <div className={styles.sub}>Des Entreprises</div>
        </div>
      </div>
      <div className={styles.nav}>
        {items.map((it)=>{
          const Icon = icons[it.icon];
          const active = it.id===activeId;
          return (
            <button key={it.id} className={`${styles.item} ${active?styles.active:''}`} onClick={()=>onSelect(it.id)}>
              <Icon size={18}/>
              <span>{it.label}</span>
            </button>
          )
        })}
      </div>
      <div className={styles.footer}>v1.0 • RP</div>
    </aside>
  );
}
