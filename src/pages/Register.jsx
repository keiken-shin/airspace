import React from 'react';

import {
  Heading,
  StyledForm,
  StyledButton,
  StyledAuth,
  Input,
} from '../components';
import { Google } from '../components/icons';

const Register = () => (
  <>
    <Heading>
      <h2>Register</h2>
      <p>
        Already have an account? <a href="/">Sign in</a>
      </p>
    </Heading>

    <StyledForm method="POST">
      <Input label="Enter email address" type="email" />

      <Input label="Password" type="password" />

      <Input label="Confirm Password" type="password" />

      <StyledButton>Register</StyledButton>

      <div className="divider">or continue with</div>
    </StyledForm>

    <StyledAuth>
      <button type="button" className="btn-auth">
        <Google />
        Sign up with Google
      </button>
    </StyledAuth>
  </>
);

export default Register;
