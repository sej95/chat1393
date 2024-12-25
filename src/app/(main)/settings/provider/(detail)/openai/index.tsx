import { memo } from 'react';

import { ModelProviderCard } from '@/types/llm';

import ProviderConfig from '../../components/ProviderConfig';
import ProviderModelListSelect from '../../components/ProviderModelList';

const ProviderDetail = memo<ModelProviderCard>((card) => {
  return (
    <>
      <ProviderConfig {...card} />
      <ProviderModelListSelect provider={card.id as any} />
    </>
  );
});

export default ProviderDetail;
