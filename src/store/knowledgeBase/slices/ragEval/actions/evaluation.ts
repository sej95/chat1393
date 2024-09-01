import { SWRResponse, mutate } from 'swr';
import { StateCreator } from 'zustand/vanilla';

import { useClientDataSWR } from '@/libs/swr';
import { ragEvalService } from '@/services/ragEval';
import { KnowledgeBaseStore } from '@/store/knowledgeBase/store';
import { CreateNewEvalEvaluation, RAGEvalDataSetItem } from '@/types/eval';

const FETCH_EVALUATION_LIST_KEY = 'FETCH_EVALUATION_LIST_KEY';

export interface RAGEvalEvaluationAction {
  createNewEvaluation: (params: CreateNewEvalEvaluation) => Promise<void>;

  refreshEvaluationList: () => Promise<void>;
  removeEvaluation: (id: number) => Promise<void>;

  useFetchEvaluationList: (knowledgeBaseId: string) => SWRResponse<RAGEvalDataSetItem[]>;
}

export const createRagEvalEvaluationSlice: StateCreator<
  KnowledgeBaseStore,
  [['zustand/devtools', never]],
  [],
  RAGEvalEvaluationAction
> = (set, get) => ({
  createNewEvaluation: async (params) => {
    await ragEvalService.createEvaluation(params);
    await get().refreshDatasetList();
  },

  refreshEvaluationList: async () => {
    await mutate(FETCH_EVALUATION_LIST_KEY);
  },

  removeEvaluation: async (id) => {
    await ragEvalService.removeDataset(id);
    await get().refreshDatasetList();
  },

  useFetchEvaluationList: (knowledgeBaseId) =>
    useClientDataSWR<RAGEvalDataSetItem[]>(
      [FETCH_EVALUATION_LIST_KEY, knowledgeBaseId],
      () => ragEvalService.getEvaluationList(knowledgeBaseId),
      {
        fallbackData: [],
        onSuccess: () => {
          if (!get().initDatasetList)
            set({ initDatasetList: true }, false, 'useFetchDatasets/init');
        },
      },
    ),
});
