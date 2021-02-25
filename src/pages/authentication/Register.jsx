import React, { useEffect, useRef, useState } from 'react';
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
import { Error, Google } from '../../components/icons';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const email = useRef(null);
  const password = useRef(null);
  const passwordConfirmation = useRef(null);
  const { signup, signInWithGoogle } = useAuth();
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

    if (password.current.value.length < 6) {
      return setError('Password length should be greater than 6');
    }

    if (password.current.value !== passwordConfirmation.current.value) {
      return setError('Password do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email.current.value, password.current.value);
      history.push('/'); // On successfull signup redirect to homepage
    } catch {
      setError('Failed to create an account');
    }

    if (isCurrent.current) {
      return setLoading(false);
    }

    return 0;
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      history.push('/'); // On successfull login redirect to homepage
    } catch {
      setError('Failed to sign in');
    }

    return setLoading(false);
  };

  return (
    <>
      <SEO title="Register - Airspace" />
      <LayoutOne>
        <Heading>
          <h2>Register</h2>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
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
          </div>

          <div className="mb-8">
            <Input
              label="Confirm Password"
              type="password"
              name="password-confirmation"
              reference={passwordConfirmation}
            />
          </div>

          <StyledButton disabled={loading}>Register</StyledButton>

          <div className="divider">or continue with</div>
        </StyledForm>

        <StyledAuth>
          <button
            type="button"
            className="btn-auth"
            onClick={handleGoogleSubmit}
          >
            <Google />
            Sign up with Google
          </button>
        </StyledAuth>
      </LayoutOne>
    </>
  );
};

export default Register;
