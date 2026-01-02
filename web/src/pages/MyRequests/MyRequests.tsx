import React, { useMemo, useState } from 'react';
import type { BusinessRequest, RequestStatus } from '../../types';
import Badge from '../../components/Badge/Badge';
import styles from './MyRequests.module.css';

function money(n: number) {
  return n.toLocaleString('fr-FR') + ' $';
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function getStatusBadge(status: RequestStatus) {
  switch (status) {
    case 'pending':
      return <Badge variant="warning">En attente</Badge>;
    case 'accepted':
      return <Badge variant="success">Acceptée</Badge>;
    case 'refused':
      return <Badge variant="danger">Refusée</Badge>;
    case 'cancelled':
      return <Badge variant="neutral">Annulée</Badge>;
  }
}

export default function MyRequests({
  requests,
  onOpenRequest,
  pushToast,
  onRefresh,
}: {
  requests: BusinessRequest[];
  onOpenRequest: (id: number) => void;
  pushToast: any;
  onRefresh: () => Promise<void>;
}) {
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    let arr = [...requests];
    const qq = q.trim().toLowerCase();
    if (qq) {
      arr = arr.filter(
        (r) =>
          r.name.toLowerCase().includes(qq) ||
          r.location.toLowerCase().includes(qq) ||
          r.type.toLowerCase().includes(qq)
      );
    }
    if (statusFilter !== 'all') {
      arr = arr.filter((r) => r.status === statusFilter);
    }
    return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [requests, q, statusFilter]);

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <div className={styles.h1}>📋 Mes demandes</div>
          <div className={styles.h2}>
            Suivez l'état de vos demandes de création d'entreprise.
          </div>
        </div>
        <button className={styles.refresh} onClick={onRefresh}>
          Rafraîchir
        </button>
      </div>

      <div className={styles.filters}>
        <input
          className={styles.input}
          placeholder="Rechercher (nom / lieu / type)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className={styles.select}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'all')}
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="accepted">Acceptées</option>
          <option value="refused">Refusées</option>
          <option value="cancelled">Annulées</option>
        </select>
      </div>

      <div className={styles.list}>
        {filtered.map((req) => (
          <button
            key={req.id}
            className={styles.card}
            onClick={() => onOpenRequest(req.id)}
          >
            <div className={styles.top}>
              <div className={styles.title}>{req.name}</div>
              {getStatusBadge(req.status)}
            </div>
            <div className={styles.meta}>
              <span className={styles.pill}>{req.type}</span>
              <span className={styles.location}>📍 {req.location}</span>
            </div>
            <div className={styles.info}>
              <div>
                <span className={styles.label}>Budget:</span>
                <span className={styles.value}>{money(req.budget)}</span>
              </div>
              {req.revenueEstimate && (
                <div>
                  <span className={styles.label}>Revenu estimé:</span>
                  <span className={styles.value}>{money(req.revenueEstimate)}</span>
                </div>
              )}
              <div>
                <span className={styles.label}>Créée le:</span>
                <span className={styles.value}>{formatDate(req.createdAt)}</span>
              </div>
            </div>
            {req.staffComment && req.status === 'refused' && (
              <div className={styles.comment}>
                <strong>Commentaire staff:</strong> {req.staffComment}
              </div>
            )}
          </button>
        ))}
        {filtered.length === 0 && (
          <div className={styles.empty}>Aucune demande trouvée.</div>
        )}
      </div>
    </div>
  );
}
