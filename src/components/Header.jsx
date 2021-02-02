import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useAuth } from '../context/AuthContext';

import Profile from '../assets/images/profile.jpg';

const StyledHeader = styled.header`
  ${tw`h-16 flex items-center justify-between px-4 md:px-12 border-b border-solid border-silver`}

  & {
    .logo-title {
      ${tw`font-noto font-black text-xl`}
    }
    nav {
      ${tw`flex items-center`}
      .profile {
        .profile-badge {
          ${tw`w-10 h-10 rounded-full relative overflow-hidden z-10 cursor-pointer`}
          box-shadow: 0 0 0 3px var(--lynxWhite);
          transition: box-shadow 0.25s ease-in-out;

          :hover,
          :focus {
            box-shadow: 0 0 0 3px var(--midGray);
          }
        }
      }
    }
  }
`;

const StyledDropdown = styled.div`
  ${tw`flex flex-col absolute top-16 right-12 bg-lynxWhite border border-solid border-silver rounded-lg shadow-md`}
  width: 300px;
  & {
    .profile-detail {
      ${tw`px-4 py-8 flex flex-col items-center justify-center`}
      img {
        width: 90px;
        height: 90px;
        ${tw`rounded-full`}
      }

      .profile-name {
        ${tw`font-bold text-xl mt-4`}
      }

      .profile-email {
        ${tw`text-dimGray`}
      }
    }

    .dropdown-item {
      ${tw`text-center border-t border-solid border-silver`}

      a,button {
        ${tw`w-full block py-4 transform transition-all outline-none`}

        :hover {
          background: var(--whiteSmoke);
        }
      }
    }
  }
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();

  return (
    <>
      <StyledHeader>
        <h4 className="logo-title">AIRSPACE.</h4>

        <nav>
          <div className="profile">
            <div
              className="profile-badge"
              role="presentation"
              onClick={() => setOpen(!open)}
            >
              <img
                src={currentUser.photoURL ? currentUser.photoURL : Profile}
                alt="profile"
                className="profile-img"
              />
            </div>
            {open && <Dropdown />}
          </div>
        </nav>
      </StyledHeader>
    </>
  );
};

function Dropdown() {
  const [error, setError] = useState('');
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/login'); // On successful logout redirect to login page
    } catch {
      setError('Failed to logout');
      console.log(error);
    }
  }

  return (
    <StyledDropdown>
      <div className="profile-detail">
        <img
          src={currentUser.photoURL ? currentUser.photoURL : Profile}
          alt="Profile"
        />
        <p className="profile-name">
          Hi {currentUser.displayName ? currentUser.displayName : 'Mysterious'}!
        </p>
        <p className="profile-email">{currentUser.email}</p>
      </div>

      <div className="dropdown-item edit-profile">
        <Link to="/edit-profile">Edit Profile</Link>
      </div>

      <div className="dropdown-item logout">
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </StyledDropdown>
  );
}

export default Header;
