'use client';

import { ActionIcon } from '@lobehub/ui';
import { css, cx } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { RotateCwIcon } from 'lucide-react';
import { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';
import { GlobalLLMProviderKey } from '@/types/user/settings';

import ModelConfigModal from './ModelConfigModal';
import ModelFetcher from './ModelFetcher';
import OptionRender from './Option';

const styles = {
  divStyle: css`
    position: relative;

    .ant-select-selector {
      padding-inline-end: 50px !important;
    }
  `,
  popup: css`
    &.ant-select-dropdown {
      .ant-select-item-option-selected {
        font-weight: normal;
      }
    }
  `,
  reset: css`
    position: absolute;
    z-index: 20;
    inset-block-start: 50%;
    inset-inline-end: 28px;
    transform: translateY(-50%);
  `,
};

interface CustomModelSelectProps {
  notFoundContent?: ReactNode;
  placeholder?: string;
  provider: GlobalLLMProviderKey;
  showAzureDeployName?: boolean;
  showModelFetcher?: boolean;
}

const ProviderModelListSelect = memo<CustomModelSelectProps>(
  ({ showModelFetcher = false, provider, showAzureDeployName }) => {
    const { t } = useTranslation('common');
    const { t: transSetting } = useTranslation('setting');
    const [setModelProviderConfig, updateEnabledModels] = useUserStore((s) => [
      s.setModelProviderConfig,
      s.updateEnabledModels,
    ]);

    const chatModelCards = useUserStore(
      modelProviderSelectors.getModelCardsById(provider),
      isEqual,
    );

    const defaultEnableModel = useUserStore(
      modelProviderSelectors.getDefaultEnabledModelsById(provider),
      isEqual,
    );
    const enabledModels = useUserStore(
      modelProviderSelectors.getEnableModelsById(provider),
      isEqual,
    );

    const showReset = !!enabledModels && !isEqual(defaultEnableModel, enabledModels);

    return (
      <>
        <Flexbox gap={8}>
          <div className={cx(styles.divStyle)}>
            <div className={cx(styles.reset)}>
              {showReset && (
                <ActionIcon
                  icon={RotateCwIcon}
                  onClick={() => {
                    setModelProviderConfig(provider, { enabledModels: null });
                  }}
                  size={'small'}
                  title={t('reset')}
                />
              )}
            </div>

            <Flexbox gap={8} width={'100%'}>
              {chatModelCards.map(({ displayName, id }) => {
                const label = displayName || id;
                // model is in the chatModels
                if (chatModelCards.some((c) => c.id === id))
                  return (
                    <OptionRender
                      displayName={label as string}
                      id={id as string}
                      isAzure={showAzureDeployName}
                      key={id}
                      provider={provider}
                    />
                  );

                if (enabledModels?.some((m) => id === m)) {
                  return (
                    <OptionRender
                      displayName={label as string}
                      id={id as string}
                      isAzure={showAzureDeployName}
                      key={id}
                      provider={provider}
                      removed
                    />
                  );
                }

                // model is defined by user in client
                return (
                  <Flexbox align={'center'} gap={8} horizontal key={id}>
                    {transSetting('llm.customModelCards.addNew', { id: id })}
                  </Flexbox>
                );
              })}
            </Flexbox>
          </div>
          {showModelFetcher && <ModelFetcher provider={provider} />}
        </Flexbox>
        <ModelConfigModal provider={provider} showAzureDeployName={showAzureDeployName} />
      </>
    );
  },
);

export default ProviderModelListSelect;
