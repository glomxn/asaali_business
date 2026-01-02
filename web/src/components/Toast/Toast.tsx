import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';
import type { ToastItem } from '../../types';
import styles from './Toast.module.css';

const icons = {success:CheckCircle2,error:XCircle,info:Info,warning:AlertTriangle};

export default function Toast({ items }:{ items:ToastItem[] }) {
  return (
    <div className={styles.wrap}>
      <AnimatePresence>
        {items.map((t)=>{
          const Icon = icons[t.variant];
          return (
            <motion.div key={t.id} className={`${styles.toast} ${styles[t.variant]}`}
              initial={{opacity:0,y:10,scale:0.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10,scale:0.98}}>
              <Icon size={18}/>
              <div className={styles.text}>
                <div className={styles.title}>{t.title}</div>
                {t.message && <div className={styles.msg}>{t.message}</div>}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  );
}
