import React, { useMemo, useState } from 'react';
import type { Business, BusinessType } from '../../types';
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import styles from './Market.module.css';

const TYPES: { value: BusinessType | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'bar', label: 'Bar' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'station', label: 'Station-service' },
  { value: 'concession', label: 'Concession' },
  { value: 'club', label: 'Club' },
  { value: 'garage', label: 'Garage' },
  { value: 'autre', label: 'Autre' },
];

export default function Market({ businesses, onOpenBusiness, onRefresh }:{
  businesses:Business[]; onOpenBusiness:(id:string)=>void; onRefresh:()=>Promise<void>; pushToast:any;
}) {
  const [q,setQ]=useState('');
  const [type,setType]=useState<'all'|BusinessType>('all');
  const [onlyAvailable,setOnlyAvailable]=useState(true);

  const filtered = useMemo(()=>{
    let arr=[...businesses];
    const qq=q.trim().toLowerCase();
    if(qq) arr=arr.filter(b=>b.label.toLowerCase().includes(qq)||b.address.toLowerCase().includes(qq));
    if(type!=='all') arr=arr.filter(b=>b.type===type);
    if(onlyAvailable) arr=arr.filter(b=>b.isAvailable);
    return arr;
  },[businesses,q,type,onlyAvailable]);

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <div className={styles.h1}>🏪 Commerces à vendre</div>
          <div className={styles.h2}>Cliquez sur un commerce pour voir les détails.</div>
        </div>
        <button className={styles.refresh} onClick={onRefresh}>Rafraîchir</button>
      </div>

      <div className={styles.filters}>
        <input className={styles.input} placeholder="Rechercher (nom / adresse)" value={q} onChange={e=>setQ(e.target.value)}/>
        <select className={styles.select} value={type} onChange={e=>setType(e.target.value as any)}>
          {TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <label className={styles.check}>
          <input type="checkbox" checked={onlyAvailable} onChange={e=>setOnlyAvailable(e.target.checked)}/>
          Dispo
        </label>
      </div>

      <div className={styles.grid}>
        {filtered.map(b=><BusinessCard key={b.id} business={b} onClick={()=>onOpenBusiness(b.id)}/>)}
        {filtered.length===0 && <div className={styles.empty}>Aucun commerce trouvé.</div>}
      </div>
    </div>
  );
}
