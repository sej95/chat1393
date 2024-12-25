'use client';

import { Divider } from 'antd';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ModelProviderCard } from '@/types/llm';

import ModelList from '../../components/ModelList';
import ProviderConfig from '../../components/ProviderConfig';

const ProviderDetail = memo<ModelProviderCard>((card) => {
  return (
    <Flexbox gap={24} paddingBlock={8}>
      <ProviderConfig {...card} />
      <Divider dashed style={{ margin: 0 }} />
      <ModelList id={card.id} {...card.modelList} />
    </Flexbox>
  );
});

export default ProviderDetail;
