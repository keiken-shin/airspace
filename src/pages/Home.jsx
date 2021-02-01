import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { StyledAlert } from '../components';
import { Error } from '../components/icons';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      history.push('/login'); // On successful logout redirect to login page
    } catch {
      setError('Failed to logout');
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {error && (
        <StyledAlert>
          <span className="badge">
            <Error />
          </span>
          <span>{error}</span>
        </StyledAlert>
      )}
      <p>Email: {currentUser.email}</p>
      <p>
        <Link to="/edit-profile">Edit Profile</Link>
      </p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
