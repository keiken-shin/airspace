import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  Heading,
  StyledForm,
  StyledButton,
  StyledAuth,
  StyledAlert,
  Input,
} from '../components';
import { Error, Google } from '../components/icons';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const email = useRef(null);
  const password = useRef(null);
  const passwordConfirmation = useRef(null);
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    return setLoading(false);
  };

  return (
    <>
      <Heading>
        <h2>Register</h2>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
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

        <Input
          label="Confirm Password"
          type="password"
          name="password-confirmation"
          reference={passwordConfirmation}
        />

        <StyledButton disabled={loading}>Register</StyledButton>

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
};

export default Register;
