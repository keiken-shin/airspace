import React from 'react';

import {
  Heading,
  StyledForm,
  StyledButton,
  StyledAuth,
  Input,
} from '../components';
import { Google } from '../components/icons';

const Signin = () => (
  <>
    <Heading>
      <h2>Signin</h2>
      <p>
        New user? <a href="/register">Create an Account</a>
      </p>
    </Heading>

    <StyledForm method="POST">
      <Input label="Enter email address" type="email" />

      <Input label="Password" type="password" />

      <StyledButton>Login</StyledButton>

      <div className="divider">or continue with</div>
    </StyledForm>

    <StyledAuth>
      <button type="button" className="btn-auth">
        <Google />
        Sign in with Google
      </button>
    </StyledAuth>
  </>
);

export default Signin;
