// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { toolsEnv } from '@/config/tools';

/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory } from '@/libs/trpc';
import { AuthContext, createContextInner } from '@/server/context';
import { SearXNGClient } from '@/server/modules/SearXNG';

import { searchRouter } from '../search';
import { hetongxue } from './fixtures/searXNG';

vi.mock('@/config/tools', () => ({
  toolsEnv: vi.fn(),
}));

const createCaller = createCallerFactory(searchRouter);
let ctx: AuthContext;
let router: ReturnType<typeof createCaller>;

beforeEach(async () => {
  vi.resetAllMocks();
  ctx = await createContextInner({ userId: 'mock' });
  router = createCaller(ctx);
});

describe('searchRouter', () => {
  describe('search', () => {
    it('搜索结果超过10个', async () => {
      vi.spyOn(SearXNGClient.prototype, 'search').mockResolvedValueOnce(hetongxue);

      const results = await router.query({ query: '何同学' });

      // Assert
      expect(results.results.length).toEqual(10);
    });
  });
});
