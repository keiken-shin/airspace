import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components';
import Profile from '../../assets/images/profile.jpg';

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
  }
`;

const EditProfile = () => {
  const { currentUser } = useAuth();
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

  function handleChange(e) {
    if (e.target.name === 'picture') {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });

      setProfile(URL.createObjectURL(e.target.files[0]));
      setTimeout(() => console.log(profile), 400);
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  }

  return (
    <>
      <Header />
      <StyledMain>
        <div className="wrapper">
          <section className="wrapper-label">
            <h1 className="wrapper-label-title">Edit profile</h1>
            <p className="wrapper-label-subtitle">
              You can change your personal information here.
            </p>
          </section>

          <section className="wrapper-content">
            <form className="wrapper-content-form">
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
                    <input type="file" name="picture" onChange={handleChange} />
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
                    value={state.password}
                    onChange={handleChange}
                  />
                  <p className="note">
                    <ul className="note-details">
                      <li>
                        Leaving password field empty means password remains the
                        same
                      </li>
                      <li>Also, password length must be greater than 6</li>
                    </ul>
                  </p>
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
                    onChange={handleChange}
                  />

                  <button type="submit" className="primary my-6">
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
