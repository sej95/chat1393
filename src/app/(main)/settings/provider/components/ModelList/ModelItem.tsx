import { ModelIcon } from '@lobehub/icons';
import { ActionIcon, Tooltip } from '@lobehub/ui';
import { Typography } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { LucideSettings, Recycle } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { ModelInfoTags } from '@/components/ModelSelect';
import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';

import CustomModelOption from './CustomModelOption';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    border-radius: ${token.borderRadius}px;

    transition: all 0.2s ease-in-out;

    &:hover {
      color: inherit;
      background-color: ${token.colorFillTertiary};
    }
  `,
}));

interface OptionRenderProps {
  displayName: string;
  id: string;
  isAzure?: boolean;
  provider: string;
  removed?: boolean;
}

const OptionRender = memo<OptionRenderProps>(({ displayName, id, provider, isAzure, removed }) => {
  const { styles, cx } = useStyles();
  const model = useUserStore((s) => modelProviderSelectors.getModelCardById(id)(s), isEqual);
  const { t } = useTranslation(['components', 'setting']);
  const theme = useTheme();
  // if there is isCustom, it means it is a user defined custom model
  if (model?.isCustom || isAzure) return <CustomModelOption id={id} provider={provider} />;

  return (
    <Flexbox
      align={'center'}
      className={styles.container}
      gap={8}
      horizontal
      justify={'space-between'}
      padding={'8px 16px'}
      width={'100%'}
    >
      <Flexbox align={'center'} gap={8} horizontal>
        <ModelIcon model={id} size={32} />
        <Flexbox>
          <Flexbox align={'center'} gap={8} horizontal>
            {displayName}
          </Flexbox>
          <Typography.Text style={{ fontSize: 12 }} type={'secondary'}>
            {id}
          </Typography.Text>
        </Flexbox>
      </Flexbox>
      <Flexbox align={'center'} gap={8} horizontal>
        <ModelInfoTags placement={'top'} {...model!} />
        <ActionIcon
          icon={LucideSettings}
          onClick={async (e) => {
            e.stopPropagation();
            // toggleEditingCustomModelCard({ id, provider });
          }}
          title={t('llm.customModelCards.config', { ns: 'setting' })}
        />
      </Flexbox>
      {removed && (
        <Tooltip
          overlayStyle={{ maxWidth: 300 }}
          placement={'top'}
          style={{ pointerEvents: 'none' }}
          title={t('ModelSelect.removed')}
        >
          <ActionIcon icon={Recycle} style={{ color: theme.colorWarning }} />
        </Tooltip>
      )}
    </Flexbox>
  );
});

export default OptionRender;
