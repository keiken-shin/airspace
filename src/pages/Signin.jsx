import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  Heading,
  StyledForm,
  StyledButton,
  StyledAuth,
  StyledAlert,
  Input,
} from '../components';
import { Google, Error } from '../components/icons';
import { useAuth } from '../context/AuthContext';

const Signin = () => {
  const email = useRef(null);
  const password = useRef(null);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email.current.value, password.current.value);
      history.push('/'); // On successfull login redirect to homepage
    } catch {
      setError('Failed to sign in');
    }

    return setLoading(false);
  };

  return (
    <>
      <Heading>
        <h2>Signin</h2>
        <p>
          New user? <Link to="/register">Create an Account</Link>
        </p>
      </Heading>

      <StyledForm method="POST" onSubmit={handleSubmit}>
        {error && (
          <StyledAlert>
            <span className="badge">
              <Error />
            </span>
            <span>{error}</span>
          </StyledAlert>
        )}
        <Input
          label="Enter email address"
          type="email"
          name="email"
          reference={email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          reference={password}
        />

        <StyledButton disabled={loading}>Login</StyledButton>

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
};

export default Signin;
