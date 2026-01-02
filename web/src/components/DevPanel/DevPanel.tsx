import React, { useMemo, useState } from 'react';
import styles from './DevPanel.module.css';
import { devOpen, devClose, isDevMode } from '../../dev/devTools';

export default function DevPanel() {
  const enabled = useMemo(() => isDevMode(), []);
  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState(false);
  const [name, setName] = useState('Miriam');

  if (!enabled) return null;

  return (
    <div className={styles.wrap}>
      <button className={styles.fab} onClick={() => setOpen((p) => !p)}>
        DEV
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.title}>Mode Dev (sans Lua)</div>

          <div className={styles.row}>
            <label>Nom joueur</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <label className={styles.check}>
            <input
              type="checkbox"
              checked={staff}
              onChange={(e) => setStaff(e.target.checked)}
            />
            isStaff (afficher onglet STAFF)
          </label>

          <div className={styles.actions}>
            <button
              className={styles.btn}
              onClick={() => devOpen({ playerName: name, isStaff: staff })}
            >
              Ouvrir UI
            </button>
            <button className={styles.btnDanger} onClick={() => devClose()}>
              Fermer UI
            </button>
          </div>

          <div className={styles.hint}>
            Astuce : lance <b>npm run dev</b> puis clique sur DEV → Ouvrir UI.
          </div>
        </div>
      )}
    </div>
  );
}
