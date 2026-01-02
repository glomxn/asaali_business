import React from 'react';
import type { Business } from '../../types';
import Badge from '../Badge/Badge';
import styles from './BusinessCard.module.css';

function money(n:number){return n.toLocaleString('fr-FR')+' $';}

export default function BusinessCard({ business, onClick }:{ business:Business; onClick:()=>void }) {
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.top}>
        <div className={styles.title}>{business.label}</div>
        {business.isAvailable ? <Badge variant="success">Disponible</Badge> : <Badge variant="danger">Vendu</Badge>}
      </div>
      <div className={styles.meta}>
        <span className={styles.pill}>{business.type}</span>
        <span className={styles.addr}>{business.address}</span>
      </div>
      <div className={styles.grid}>
        <div><div className={styles.k}>Prix</div><div className={styles.v}>{money(business.price)}</div></div>
        <div><div className={styles.k}>Revenu</div><div className={styles.v}>{money(business.revenue)}</div></div>
        <div><div className={styles.k}>Upkeep</div><div className={styles.v}>{money(business.upkeep)}</div></div>
      </div>
    </button>
  );
}
