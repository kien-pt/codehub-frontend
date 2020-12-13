import React from 'react';

import error_page from '../../assets/404.png';

function Page() {
  return (
    <div style={{ display: 'flex' }}><img src={error_page} alt="error" style={{ width: 640, margin: 'auto' }} /></div>
  );
}

export default Page;
