import styles from './foo.less';
import { Link, useSearchParams, createSearchParams, useLocation } from "umi";

export default function Page() {
  return (
    <div>
      <h1 className={styles.title}>Page foo</h1>
    </div>
  );
}
