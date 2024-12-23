'use client';

import { SearchBar } from '@lobehub/ui';
import { useMemo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { DEFAULT_MODEL_PROVIDER_LIST } from '@/config/modelProviders';

import All from './All';
import ProviderItem from './Item';

const ProviderMenu = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

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
    <Flexbox padding={'16px 12px'} style={{ minWidth: 280, overflow: 'scroll' }} width={280}>
      <SearchBar
        allowClear
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search providers..."
        style={{ marginBottom: 8 }}
        type={'block'}
        value={searchKeyword}
      />
      <Flexbox gap={4}>
        {/* 当没有搜索关键词时才显示 All 选项 */}
        {!searchKeyword && <All />}
        {filteredProviders.map((item) => (
          <ProviderItem {...item} key={item.id} />
        ))}
        {/* 当搜索无结果时显示提示信息 */}
        {searchKeyword && filteredProviders.length === 0 && (
          <Flexbox align="center" justify="center" padding={16}>
            No providers found
          </Flexbox>
        )}
      </Flexbox>
    </Flexbox>
  );
};

export default ProviderMenu;
