import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { auth, googleProvider } from '../api/firebase';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Singup
  const signup = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  // Login
  const login = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  // Login
  const logout = () => auth.signOut();

  // Reset Password
  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  // Google Auth
  const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  // Update Profile
  const updateEmail = (email) => currentUser.updateEmail(email);

  const updatePassword = (password) => currentUser.updatePassword(password);

  const updateName = (displayName) =>
    currentUser.updateProfile({ displayName });

  const updatePhoto = (profile) =>
    currentUser.updateProfile({ photoURL: profile });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
    updateEmail,
    updatePassword,
    updateName,
    updatePhoto,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAuth, AuthProvider };
