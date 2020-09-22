import React from 'react';

import AppHeader from '../../containers/AppLayout/AppHeader';
import Home from '../Home';

function AppLayout() {
  return (
    <>
      <AppHeader />
      <div style={{ padding: '96px 24px' }}>
      <Home />
      </div>
    </>
  );
}

export default AppLayout;
