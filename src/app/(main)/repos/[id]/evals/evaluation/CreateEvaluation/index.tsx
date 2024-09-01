'use client';

import { Button } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateDatasetModal } from '../CreateEvaluation/useModal';

interface CreateEvaluationProps {
  knowledgeBaseId: string;
}

const CreateEvaluation = memo<CreateEvaluationProps>(({ knowledgeBaseId }) => {
  const { t } = useTranslation('ragEval');
  const modal = useCreateDatasetModal();
  return (
    <Button
      onClick={() => {
        modal.open({ knowledgeBaseId });
      }}
      type={'primary'}
    >
      {t('evaluation.addNewButton')}
    </Button>
  );
});
export default CreateEvaluation;
