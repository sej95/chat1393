'use client';

import { Typography } from 'antd';
import { useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';
import { GlobalLLMProviderKey } from '@/types/user/settings';

import EnabledModelList from './EnabledModelList';
import ModelConfigModal from './ModelConfigModal';
import OptionRender from './ModelItem';
import ModelTitle from './ModelTitle';

interface ModelListProps {
  id: GlobalLLMProviderKey;
  notFoundContent?: ReactNode;
  placeholder?: string;
  showAzureDeployName?: boolean;
  showModelFetcher?: boolean;
}

const ModelList = memo<ModelListProps>(({ showModelFetcher = false, id, showAzureDeployName }) => {
  const { t } = useTranslation('common');
  const { t: transSetting } = useTranslation('setting');
  const [setModelProviderConfig, updateEnabledModels, isUserStateInit] = useUserStore((s) => [
    s.setModelProviderConfig,
    s.updateEnabledModels,
    s.isUserStateInit,
  ]);

  const chatModelCards = useUserStore(modelProviderSelectors.getModelCardsById(id), isEqual);

  const defaultEnableModel = useUserStore(
    modelProviderSelectors.getDefaultEnabledModelsById(id),
    isEqual,
  );
  const enabledModels = useUserStore(modelProviderSelectors.getEnableModelsById(id), isEqual);

  // const showReset = !!enabledModels && !isEqual(defaultEnableModel, enabledModels);
  console.log(chatModelCards);
  return (
    <Flexbox gap={16}>
      <ModelTitle showModelFetcher={showModelFetcher} provider={id} />
      <ModelConfigModal provider={id} showAzureDeployName={showAzureDeployName} />

      {!isUserStateInit ? (
        <div>123</div>
      ) : (
        <Flexbox>
          <Typography.Text style={{ fontSize: 12, marginTop: 8 }} type={'secondary'}>
            已启用
          </Typography.Text>

          <EnabledModelList id={id} showAzureDeployName={showAzureDeployName} />
          <Typography.Text style={{ fontSize: 12, marginTop: 8 }} type={'secondary'}>
            未启用
          </Typography.Text>
          {chatModelCards
            .filter((i) => !enabledModels?.includes(i.id))
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
            })}
        </Flexbox>
        // <Virtuoso
        //   // data={chatModelCards}
        //   itemContent={(index) => {
        //     const { displayName, id } = chatModelCards[index];
        //     console.log(index, id);
        //
        //   }}
        //   overscan={50}
        //   totalCount={chatModelCards.length}
        //   useWindowScroll
        // />
      )}
      {/*<Flexbox gap={8}>*/}
      {/*  <div className={cx(styles.divStyle)}>*/}
      {/*    /!*<div className={cx(styles.reset)}>*!/*/}
      {/*    /!*  {showReset && (*!/*/}
      {/*    /!*    <ActionIcon*!/*/}
      {/*    /!*      icon={RotateCwIcon}*!/*/}
      {/*    /!*      onClick={() => {*!/*/}
      {/*    /!*        setModelProviderConfig(id, { enabledModels: null });*!/*/}
      {/*    /!*      }}*!/*/}
      {/*    /!*      size={'small'}*!/*/}
      {/*    /!*      title={t('reset')}*!/*/}
      {/*    /!*    />*!/*/}
      {/*    /!*  )}*!/*/}
      {/*    /!*</div>*!/*/}

      {/*    */}
      {/*  </div>*/}
      {/*</Flexbox>*/}
    </Flexbox>
  );
});

export default ModelList;
