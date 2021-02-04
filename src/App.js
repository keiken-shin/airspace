import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './assets/styles/global';

import { PrivateRoute } from './components';
import { AuthProvider } from './context/AuthContext';
import { EditProfile, ForgotPassword, Home, Register, Signin } from './pages';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <GlobalStyle />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/folder/:folderId" component={Home} />

        {/* Authentication */}
        <PrivateRoute path="/edit-profile" component={EditProfile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Signin} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Switch>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
