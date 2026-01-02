import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Modal.module.css';

export default function Modal({ open, title, children, onClose, footer }:{
  open:boolean; title:string; children:React.ReactNode; onClose:()=>void; footer?:React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className={styles.backdrop} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <motion.div className={styles.modal} initial={{scale:0.96,opacity:0,y:10}} animate={{scale:1,opacity:1,y:0}} exit={{scale:0.96,opacity:0,y:10}}>
            <div className={styles.head}>
              <div className={styles.title}>{title}</div>
              <button className={styles.close} onClick={onClose}>✕</button>
            </div>
            <div className={styles.body}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
