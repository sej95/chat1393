import ProviderConfig from '@/app/(main)/settings/provider/components/ProviderConfig';
import ProviderModelListSelect from '@/app/(main)/settings/provider/components/ProviderModelList';
import { serverFeatureFlags } from '@/config/featureFlags';
import { OpenAIProviderCard } from '@/config/modelProviders';

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
    <>
      <ProviderConfig {...card} />
      <ProviderModelListSelect provider={card.id as any} />
    </>
  );
};

export default Page;
