import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { Flexbox } from 'react-layout-kit';

import NProgress from '@/components/NProgress';
import { serverFeatureFlags } from '@/config/featureFlags';

import ProviderMenu from './ProviderMenu';

const Layout = ({ children }: PropsWithChildren) => {
  const showLLM = serverFeatureFlags().showProvider;
  if (!showLLM) return notFound();

  return (
    <>
      <NProgress />
      <Flexbox horizontal width={'100%'}>
        <ProviderMenu />
        {children}
      </Flexbox>
    </>
  );
};
export default Layout;
