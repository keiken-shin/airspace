import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { useAuth } from '../../context/AuthContext';
import { Header, SEO } from '../../components';
import { StyledAlert } from '../../components/templates';
import Profile from '../../assets/images/profile.jpg';
import { Error } from '../../components/icons';
import { storage } from '../../api/firebase';

const StyledMain = styled.main`
  ${tw`px-4 py-8 md:mx-auto md:px-12`}
  max-width: 1180px;

  & {
    .wrapper {
      ${tw`md:grid md:grid-cols-3 md:gap-6`}

      &-label {
        ${tw`flex flex-col space-y-2 md:col-span-1`}

        &-title {
          ${tw`text-lg md:text-xl font-bold text-blackPearl`}
        }

        &-subtitle {
          ${tw`text-sm text-gray-500 tracking-wider`}
        }
      }

      &-content {
        ${tw`mt-5 md:mt-0 md:col-span-2`}
        &-form {
          ${tw`bg-white px-6 py-4 rounded-lg shadow-md flex flex-col space-y-8`}

          .profile-section {
            ${tw`flex flex-row space-x-8`}

            &-label {
              ${tw`flex flex-row flex-none md:justify-end w-1/5 md:w-1/4`}

              .image {
                ${tw`w-16 h-16 rounded-full bg-gray-500 overflow-hidden`}

                img {
                  ${tw`min-w-full min-h-full object-cover`}
                }
              }

              .custom-label {
                ${tw`h-12 flex flex-row items-center font-medium`}
              }
            }

            &:first-of-type {
              ${tw`my-4`}
              .name {
                ${tw`text-xl font-medium text-blackPearl mb-1`}
              }

              .change-profile {
                ${tw`text-base text-dodgerBlue relative cursor-pointer`}

                input {
                  ${tw`absolute opacity-0`}
                  left: -9999px;
                }
              }
            }

            &-profile {
              ${tw`flex-1`}

              .custom-input {
                ${tw`h-12 bg-whiteSmoke w-full rounded-xl outline-none px-4`}
              }

              .note {
                ${tw`flex text-gray-400 text-sm mt-2 space-x-8`}
                &-details {
                  ${tw`ml-4 text-sm list-disc`}
                }
              }
            }
          }
        }
      }
    }

    .alert-message {
      ${tw`absolute bottom-4 right-8`}
    }
  }
`;

const EditProfile = () => {
  const {
    currentUser,
    updateEmail,
    updatePassword,
    updateName,
    updatePhoto,
  } = useAuth();
  const [profile, setProfile] = useState(
    currentUser.photoURL ? currentUser.photoURL : Profile
  );
  const [state, setState] = useState({
    name: currentUser.displayName ? currentUser.displayName : 'Mysterious',
    email: currentUser.email,
    password: '',
    confirmPassword: '',
    picture: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    if (e.target.name === 'picture') {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });

      setProfile(URL.createObjectURL(e.target.files[0]));
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setSuccess('');
    setError('');

    if (state.password !== state.confirmPassword) {
      return setError('Password does not match');
    }

    const promises = [];

    if (state.picture) {
      const uploadTask = storage
        .ref(`/users/${currentUser.uid}/${state.picture.name}`)
        .put(state.picture);

      uploadTask.on(
        'state-changed',
        (snapshot) => {
          console.log(snapshot);
        },
        () => {
          setError('Oops! Something went wrong');
          setLoading(false);
          return 0;
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((url) => promises.push(updatePhoto(url)));
        }
      );
    }

    if (state.name !== 'Mysterious' && state.name !== '') {
      promises.push(updateName(state.name));
    }

    if (state.email !== currentUser.email) {
      promises.push(updateEmail(state.email));
    }

    if (state.password !== '') {
      promises.push(updatePassword(state.password));
    }

    Promise.all(promises)
      .then(() => {
        setSuccess('Profile updated successfully');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });

    return setTimeout(() => {
      setError('');
      setSuccess('');
    }, 5000);
  }

  return (
    <>
      <SEO title="Edit Profile" />
      <Header />
      <StyledMain>
        {error && (
          <StyledAlert variant="error">
            <span className="badge">
              <Error />
            </span>
            <span>{error}</span>
          </StyledAlert>
        )}

        {success && (
          <StyledAlert variant="success">
            <span>{success}</span>
          </StyledAlert>
        )}

        <div className="wrapper">
          <section className="wrapper-label">
            <h1 className="wrapper-label-title">Edit profile</h1>
            <p className="wrapper-label-subtitle">
              You can change your personal information here.
            </p>
          </section>

          <section className="wrapper-content">
            <form className="wrapper-content-form" onSubmit={handleSubmit}>
              <div className="profile-section">
                <div className="profile-section-label">
                  <div className="image">
                    <img src={profile} alt="profile" />
                  </div>
                </div>
                <div className="profile-section-profile">
                  <h3 className="name">Mysterious</h3>
                  <label className="change-profile">
                    <span>Change profile picture</span>
                    <input
                      type="file"
                      name="picture"
                      onChange={handleChange}
                      accept=".jpg, .jpeg, .png"
                    />
                  </label>
                </div>
              </div>

              <div className="profile-section">
                <div className="profile-section-label">
                  <label className="custom-label">Name</label>
                </div>
                <div className="profile-section-profile">
                  <input
                    type="text"
                    className="custom-input"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="profile-section">
                <div className="profile-section-label">
                  <label className="custom-label">Email</label>
                </div>
                <div className="profile-section-profile">
                  <input
                    type="email"
                    className="custom-input"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="profile-section">
                <div className="profile-section-label">
                  <label className="custom-label">Password</label>
                </div>
                <div className="profile-section-profile">
                  <input
                    type="password"
                    className="custom-input"
                    name="password"
                    autoComplete="off"
                    value={state.password}
                    onChange={handleChange}
                  />
                  <div className="note">
                    <ul className="note-details">
                      <li>
                        Leaving password field empty means password remains the
                        same
                      </li>
                      <li>Also, password length must be greater than 6</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <div className="profile-section-label">
                  <label className="custom-label">Confirm Password</label>
                </div>
                <div className="profile-section-profile">
                  <input
                    type="password"
                    className="custom-input"
                    name="confirmPassword"
                    value={state.confirmPassword}
                    autoComplete="off"
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="primary my-6"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </StyledMain>
    </>
  );
};

export default EditProfile;
