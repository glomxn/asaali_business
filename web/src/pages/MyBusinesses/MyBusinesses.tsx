import React, { useMemo, useState } from 'react';
import type { Business } from '../../types';
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import styles from './MyBusinesses.module.css';

export default function MyBusinesses({
  businesses,
  onOpenBusiness,
  pushToast,
  onRefresh,
}: {
  businesses: Business[];
  onOpenBusiness: (id: string) => void;
  pushToast: any;
  onRefresh: () => Promise<void>;
}) {
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    let arr = [...businesses];
    const qq = q.trim().toLowerCase();
    if (qq) {
      arr = arr.filter(
        (b) =>
          b.label.toLowerCase().includes(qq) || b.address.toLowerCase().includes(qq)
      );
    }
    if (typeFilter !== 'all') {
      arr = arr.filter((b) => b.type === typeFilter);
    }
    return arr;
  }, [businesses, q, typeFilter]);

  const totalRevenue = useMemo(
    () => businesses.reduce((sum, b) => sum + b.revenue, 0),
    [businesses]
  );
  const totalUpkeep = useMemo(
    () => businesses.reduce((sum, b) => sum + b.upkeep, 0),
    [businesses]
  );
  const netProfit = totalRevenue - totalUpkeep;

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <div className={styles.h1}>💼 Mes entreprises</div>
          <div className={styles.h2}>
            Gérez vos entreprises et consultez leurs performances.
          </div>
        </div>
        <button className={styles.refresh} onClick={onRefresh}>
          Rafraîchir
        </button>
      </div>

      {businesses.length > 0 && (
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Revenu total</div>
            <div className={styles.statValue}>{totalRevenue.toLocaleString('fr-FR')} $</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Coûts totaux</div>
            <div className={styles.statValue}>{totalUpkeep.toLocaleString('fr-FR')} $</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Bénéfice net</div>
            <div
              className={`${styles.statValue} ${
                netProfit >= 0 ? styles.positive : styles.negative
              }`}
            >
              {netProfit >= 0 ? '+' : ''}
              {netProfit.toLocaleString('fr-FR')} $
            </div>
          </div>
        </div>
      )}

      <div className={styles.filters}>
        <input
          className={styles.input}
          placeholder="Rechercher (nom / adresse)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className={styles.select}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">Tous les types</option>
          <option value="bar">Bar</option>
          <option value="restaurant">Restaurant</option>
          <option value="station">Station-service</option>
          <option value="concession">Concession</option>
          <option value="club">Club</option>
          <option value="garage">Garage</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div className={styles.grid}>
        {filtered.map((b) => (
          <BusinessCard key={b.id} business={b} onClick={() => onOpenBusiness(b.id)} />
        ))}
        {filtered.length === 0 && (
          <div className={styles.empty}>
            {businesses.length === 0
              ? "Vous n'avez pas encore d'entreprise."
              : 'Aucune entreprise trouvée.'}
          </div>
        )}
      </div>
    </div>
  );
}
