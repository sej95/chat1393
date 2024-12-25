import { serverFeatureFlags } from '@/config/featureFlags';
import { OpenAIProviderCard } from '@/config/modelProviders';

import Index from './index';

const Page = async () => {
  const { showOpenAIProxyUrl, showOpenAIApiKey } = serverFeatureFlags();
  const card = {
    ...OpenAIProviderCard,
    proxyUrl: showOpenAIProxyUrl && {
      placeholder: 'https://api.openai.com/v1',
    },
    showApiKey: showOpenAIApiKey,
  };

  return (
    <Index {...card} />
  );
};

export default Page;
