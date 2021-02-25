import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { SEO } from '../../components';
import {
  Heading,
  StyledForm,
  StyledButton,
  StyledAuth,
  StyledAlert,
  Input,
  LayoutOne,
} from '../../components/templates';
import { Google, Error } from '../../components/icons';
import { useAuth } from '../../context/AuthContext';

const Signin = () => {
  const email = useRef(null);
  const password = useRef(null);
  const { login, signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const isCurrent = useRef(true);

  useEffect(
    () => () => {
      // Called when component is going to unmount, preventing memory leak error
      isCurrent.current = false;
    },
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      if (e.target.tagName === 'FORM') {
        await login(email.current.value, password.current.value);
      } else {
        await signInWithGoogle();
      }
      history.push('/'); // On successfull login redirect to homepage
    } catch {
      setError('Failed to sign in');
    }

    if (isCurrent.current) {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Signin - Airspace" />
      <LayoutOne>
        <Heading>
          <h2>Signin</h2>
          <p>
            New user? <Link to="/register">Create an Account</Link>
          </p>
        </Heading>

        <StyledForm method="POST" onSubmit={handleSubmit}>
          {error && (
            <StyledAlert variant="error">
              <span className="badge">
                <Error />
              </span>
              <span>{error}</span>
            </StyledAlert>
          )}

          <div className="mb-8">
            <Input
              label="Enter email address"
              type="email"
              name="email"
              reference={email}
            />
          </div>

          <div className="mb-8">
            <Input
              label="Password"
              type="password"
              name="password"
              reference={password}
            />

            <div className="flex items-center justify-end text-dodgerBlue mt-2">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>

          <StyledButton disabled={loading}>Login</StyledButton>

          <div className="divider">or continue with</div>
        </StyledForm>

        <StyledAuth>
          <button type="button" className="btn-auth" onClick={handleSubmit}>
            <Google />
            Sign in with Google
          </button>
        </StyledAuth>
      </LayoutOne>
    </>
  );
};

export default Signin;
