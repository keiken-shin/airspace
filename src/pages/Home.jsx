import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <main>
        <h1>Home</h1>
        <p>Email: {currentUser.email}</p>
        <img src={currentUser.photoURL} alt="profile-pic" />
        <div>
          <Link to="/edit-profile">Edit Profile</Link>
        </div>
      </main>
    </>
  );
};

export default Home;
