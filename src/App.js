import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './assets/styles/global';

import { LayoutOne, PrivateRoute } from './components';
import { AuthProvider } from './context/AuthContext';
import { Register, Home, Signin } from './pages';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <GlobalStyle />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <LayoutOne>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Signin} />
        </LayoutOne>
      </Switch>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
