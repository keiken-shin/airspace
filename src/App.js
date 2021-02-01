import React from 'react';
import GlobalStyle from './assets/styles/global';

import { LayoutOne } from './components';
import { Register } from './pages';

const App = () => (
  <section>
    <GlobalStyle />
    <LayoutOne>
      <Register />
    </LayoutOne>
  </section>
);

export default App;
