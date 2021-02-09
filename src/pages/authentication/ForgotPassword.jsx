import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components';

import {
  Heading,
  StyledForm,
  StyledButton,
  StyledAlert,
  Input,
  LayoutOne,
} from '../../components/templates';
import { Error } from '../../components/icons';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const email = useRef(null);
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email.current.value);
      setMessage(
        "We've sent you an email, check that for further instructions"
      );
    } catch {
      setError('Failed to reset password');
    }

    return setLoading(false);
  };

  return (
    <>
      <SEO title="Reset Password - Airspace" />
      <LayoutOne>
        <Heading>
          <h2>Reset Password</h2>
          <p>
            Go back to <Link to="/login">Sign in</Link>
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

          {message && (
            <StyledAlert variant="success">
              <span>{message}</span>
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

          <StyledButton disabled={loading}>Reset Password</StyledButton>
        </StyledForm>
      </LayoutOne>
    </>
  );
};

export default ForgotPassword;
