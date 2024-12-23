import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

import { useStyles } from './Item';

const ALL_PATH = '/settings/provider';

const All = memo(() => {
  const { styles, cx } = useStyles();
  const pathname = usePathname();

  return (
    <Link className={cx(styles.container, pathname === ALL_PATH && styles.active)} href={ALL_PATH}>
      全部
    </Link>
  );
});
export default All;
