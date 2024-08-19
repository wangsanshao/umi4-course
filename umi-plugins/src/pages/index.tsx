import React from 'react';
import styles from './index.less';
import Md from './md/index.md'

console.log('Md', Md)
export default function Page() {
  return (
    <div>
      <Md />
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
