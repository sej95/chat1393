'use client';

import { Flexbox } from 'react-layout-kit';

import { isCustomBranding } from '@/const/version';

import ProviderGrid from './ProviderGrid';
import Footer from './features/Footer';

const Page = () => {
  return (
    <Flexbox gap={24} style={{ overflow: 'scroll' }} width={'100%'}>
      <ProviderGrid />
      {!isCustomBranding && <Footer />}
    </Flexbox>
  );
};

Page.displayName = 'ProviderSettings';

export default Page;
