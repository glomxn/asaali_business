import React from 'react';
import styles from './Badge.module.css';

export default function Badge({ variant, children }:{
  variant:'success'|'warning'|'danger'|'neutral'|'accent';
  children:React.ReactNode;
}) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
}
