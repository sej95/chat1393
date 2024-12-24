'use client';

import { Icon, SearchBar } from '@lobehub/ui';
import { Button, Dropdown } from 'antd';
import { useTheme } from 'antd-style';
import { ArrowDownAZ, ArrowUpDown, GripVertical, PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DEFAULT_MODEL_PROVIDER_LIST } from '@/config/modelProviders';

import All from './All';
import ProviderItem from './Item';

const ProviderMenu = () => {
  const { t } = useTranslation('modelProvider');
  const [searchKeyword, setSearchKeyword] = useState('');
  const theme = useTheme();
  // 使用 useMemo 优化过滤性能
  const filteredProviders = useMemo(() => {
    const keyword = searchKeyword.toLowerCase().trim();

    if (!keyword) return DEFAULT_MODEL_PROVIDER_LIST;

    return DEFAULT_MODEL_PROVIDER_LIST.filter((provider) => {
      return (
        provider.id.toLowerCase().includes(keyword) || provider.name.toLowerCase().includes(keyword)
      );
    });
  }, [searchKeyword]);

  return (
    <Flexbox style={{ minWidth: 280, overflow: 'scroll' }} width={280}>
      <Flexbox
        horizontal
        justify={'space-between'}
        padding={'16px 12px 12px'}
        style={{ background: theme.colorBgLayout, position: 'sticky', top: 0, zIndex: 50 }}
        width={'100%'}
      >
        <SearchBar
          allowClear
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder={t('menu.searchProviders')}
          type={'block'}
          value={searchKeyword}
        />
        <Dropdown
          menu={{
            items: [
              {
                icon: <Icon icon={ArrowUpDown} />,
                key: 'default',
                label: t('menu.sort.default'),
              },
              {
                icon: <Icon icon={ArrowDownAZ} />,
                key: 'alphabet',
                label: t('menu.sort.alphabet'),
              },
              {
                icon: <Icon icon={GripVertical} />,
                key: 'custom-order',
                label: t('menu.sort.customOrder'),
              },
            ],
          }}
        >
          <Button color={'default'} icon={<Icon icon={ArrowUpDown} />} variant={'filled'} />
        </Dropdown>
      </Flexbox>
      <Flexbox gap={4} padding={'0 12px'}>
        {/* 当没有搜索关键词时才显示 All 选项 */}
        {!searchKeyword && <All />}
        {filteredProviders.map((item) => (
          <ProviderItem {...item} key={item.id} />
        ))}
        {/* 当搜索无结果时显示提示信息 */}
        {searchKeyword && filteredProviders.length === 0 && (
          <Flexbox align="center" justify="center" padding={16}>
            {t('menu.notFound')}
          </Flexbox>
        )}
      </Flexbox>
      <Flexbox
        padding={'12px 12px'}
        style={{ background: theme.colorBgLayout, bottom: 0, position: 'sticky', zIndex: 50 }}
      >
        <Button icon={<Icon icon={PlusIcon} />}>自定义服务商</Button>
      </Flexbox>
    </Flexbox>
  );
};

export default ProviderMenu;
