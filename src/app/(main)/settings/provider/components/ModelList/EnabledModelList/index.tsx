import isEqual from 'fast-deep-equal';

import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';

import OptionRender from './ModelItem';

const EnabledModelList = ({ id, showAzureDeployName }) => {
  const chatModelCards = useUserStore(modelProviderSelectors.getModelCardsById(id), isEqual);

  const defaultEnableModel = useUserStore(
    modelProviderSelectors.getDefaultEnabledModelsById(id),
    isEqual,
  );
  const enabledModels = useUserStore(modelProviderSelectors.getEnableModelsById(id), isEqual);

  return chatModelCards
    .filter((i) => enabledModels?.includes(i.id))
    .map(({ displayName, id }) => {
      const label = displayName || id;

      return (
        <OptionRender
          displayName={label as string}
          id={id as string}
          isAzure={showAzureDeployName}
          key={id}
          provider={id}
          // removed={enabledModels?.some((m) => id === m)}
        />
      );
    });
};
export default EnabledModelList;
