import React from 'react';
import { motion } from 'framer-motion';
import styles from './TabletFrame.module.css';

export default function TabletFrame({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      className={styles.wrap}
      initial={{ opacity: 0, scale: 0.94, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <div className={styles.tablet}>
        <div className={styles.topGlow} />
        <div className={styles.content}>{children}</div>
      </div>
    </motion.div>
  );
}
