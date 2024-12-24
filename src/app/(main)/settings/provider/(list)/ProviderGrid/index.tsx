'use client';

import { Typography } from 'antd';
import { createStyles } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';

import Card from './Card';

const useStyles = createStyles(({ css, responsive, token }) => ({
  container: css`
    display: grid;
    grid-gap: 12px;
    grid-template-columns: repeat(2, 1fr);

    width: 100%;
    ${responsive.mobile} {
      display: flex;
      flex-direction: column;
    }
  `,
  count: css`
    border-radius: 12px;
    background: ${token.colorFillSecondary};
    color: ${token.colorTextDescription};
    height: 20px;
    width: 20px;
  `,
}));

const List = memo(() => {
  const { styles, theme } = useStyles();
  const enabledList = useUserStore(modelProviderSelectors.enabledModelProviderList, isEqual);
  const disabledList = useUserStore(modelProviderSelectors.disabledModelProviderList, isEqual);

  return (
    <Flexbox gap={24} padding={'16px 0'}>
      <Flexbox gap={8}>
        <Flexbox align={'center'} gap={4} horizontal>
          <Typography.Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            已开启服务商
          </Typography.Text>
          <Center className={styles.count}>{enabledList.length}</Center>
        </Flexbox>
        <div className={styles.container}>
          {enabledList.map((item) => (
            <Card {...item} key={item.id} />
          ))}
        </div>
      </Flexbox>
      <Flexbox gap={8}>
        <Typography.Text style={{ fontSize: 16, fontWeight: 'bold' }}>待开启服务商</Typography.Text>
        <div className={styles.container}>
          {disabledList.map((item) => (
            <Card {...item} key={item.id} />
          ))}
        </div>
      </Flexbox>
    </Flexbox>
  );
});

export default List;
