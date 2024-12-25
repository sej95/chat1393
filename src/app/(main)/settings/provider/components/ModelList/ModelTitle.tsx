import { ActionIcon, Icon, Tooltip } from '@lobehub/ui';
import { Button, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import isEqual from 'fast-deep-equal';
import { CircleX, LucideRefreshCcwDot, PlusIcon } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useUserStore } from '@/store/user';
import {
  modelConfigSelectors,
  modelProviderSelectors,
  settingsSelectors,
} from '@/store/user/selectors';
import { GlobalLLMProviderKey } from '@/types/user/settings';

const useStyles = createStyles(({ css, token }) => ({
  hover: css`
    cursor: pointer;

    padding-block: 4px;
    padding-inline: 8px;

    border-radius: ${token.borderRadius}px;

    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${token.colorText};
      background-color: ${token.colorFillSecondary};
    }
  `,
}));

interface ModelFetcherProps {
  provider: GlobalLLMProviderKey;
}

const ModelTitle = memo<ModelFetcherProps>(({ provider }) => {
  const { styles, theme } = useStyles();
  const { t } = useTranslation('setting');
  const [useFetchProviderModelList, clearObtainedModels] = useUserStore((s) => [
    s.useFetchProviderModelList,
    s.clearObtainedModels,
    s.setModelProviderConfig,
  ]);
  const enabledAutoFetch = useUserStore(modelConfigSelectors.isAutoFetchModelsEnabled(provider));
  const latestFetchTime = useUserStore(
    (s) => settingsSelectors.providerConfig(provider)(s)?.latestFetchTime,
  );
  const totalModels = useUserStore(
    (s) => modelProviderSelectors.getModelCardsById(provider)(s).length,
  );

  const remoteModels = useUserStore(
    modelProviderSelectors.remoteProviderModelCards(provider),
    isEqual,
  );

  const { mutate, isValidating } = useFetchProviderModelList(provider, enabledAutoFetch);

  return (
    <Flexbox
      align={'center'}
      horizontal
      justify={'space-between'}
      paddingBlock={8}
      style={{ background: theme.colorBgLayout, position: 'sticky', top: -16, zIndex: 15 }}
    >
      <Flexbox align={'center'} gap={0} horizontal justify={'space-between'}>
        <Flexbox align={'center'} gap={8} horizontal>
          <Typography.Text style={{ fontSize: 16, fontWeight: 'bold' }}>模型列表</Typography.Text>

          <Typography.Text style={{ fontSize: 12 }} type={'secondary'}>
            <div style={{ display: 'flex', lineHeight: '24px' }}>
              <Tooltip
                overlayStyle={{ pointerEvents: 'none' }}
                title={
                  latestFetchTime
                    ? t('llm.fetcher.latestTime', {
                        time: dayjs(latestFetchTime).format('YYYY-MM-DD HH:mm'),
                      })
                    : t('llm.fetcher.noLatestTime')
                }
              >
                {t('llm.modelList.total', { count: totalModels })}
              </Tooltip>

              {remoteModels && remoteModels.length > 0 && (
                <ActionIcon
                  icon={CircleX}
                  onClick={() => clearObtainedModels(provider)}
                  size={'small'}
                  title={t('llm.fetcher.clear')}
                />
              )}
            </div>
          </Typography.Text>
        </Flexbox>

        <Space.Compact>
          <Button
            icon={<Icon icon={LucideRefreshCcwDot} />}
            loading={isValidating}
            onClick={() => mutate()}
            size={'small'}
          >
            {isValidating ? t('llm.fetcher.fetching') : t('llm.fetcher.fetch')}
          </Button>
          <Button icon={<Icon icon={PlusIcon} />} size={'small'}></Button>
        </Space.Compact>
      </Flexbox>
    </Flexbox>
  );
});
export default ModelTitle;
