import React from 'react';
import { X, Home, UserRound, ShieldCheck } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ playerName, isStaff, onClose, onHome }:{
  playerName:string; isStaff:boolean; onClose:()=>void; onHome:()=>void;
}) {
  return (
    <header className={styles.header}>
      <button className={styles.iconBtn} onClick={onHome} title="Accueil"><Home size={18}/></button>
      <div className={styles.center}>
        <div className={styles.h1}>Tablette Entreprises</div>
        <div className={styles.h2}>Gestion & demandes</div>
      </div>
      <div className={styles.right}>
        <div className={styles.user}>
          <UserRound size={16}/>
          <span>{playerName}</span>
          {isStaff && <span className={styles.staff}><ShieldCheck size={14}/> STAFF</span>}
        </div>
        <button className={styles.close} onClick={onClose}><X size={18}/></button>
      </div>
    </header>
  );
}
