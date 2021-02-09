import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './assets/styles/global';

import { PrivateRoute } from './components';
import { AuthProvider } from './context/AuthContext';
import './assets/styles/styles.css';
import {
  EditProfile,
  ForgotPassword,
  Home,
  Notfound,
  Register,
  Signin,
} from './pages';

const App = () => (
  <BrowserRouter>
    <HelmetProvider>
      <AuthProvider>
        <GlobalStyle />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/folder/:folderId" component={Home} />

          {/* Authentication */}
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Signin} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route path="*" component={Notfound} status={404} />
        </Switch>
      </AuthProvider>
    </HelmetProvider>
  </BrowserRouter>
);

export default App;
