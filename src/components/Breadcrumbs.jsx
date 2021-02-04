import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { ROOT_FOLDER } from '../hooks/useFolder';
import { RightChevron } from './icons';

const StyledBreadCrumbNav = styled.nav`
  ${tw`text-gray-400 flex items-center font-medium`}

  & {
    .crumb {
      ${tw`flex items-center`}
    }

    .crumb-link {
      ${tw`text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out`}
    }

    .active {
      ${tw`text-gray-600`}
    }

    svg {
      ${tw`flex-shrink-0 mx-2 h-5 w-5`}
    }
  }
`;

const Breadcrumbs = ({ currentFolder }) => {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];

  return (
    <StyledBreadCrumbNav>
      {path.map((folder, idx) => (
        <div className="crumb" key={folder.id}>
          <div>
            <Link
              to={{
                pathname: folder.id ? `/folder/${folder.id}` : '/',
                state: { folder: { ...folder, path: path.slice(1, idx) } },
              }}
              className="crumb-link"
            >
              {folder.name}
            </Link>
          </div>
          <RightChevron />
        </div>
      ))}
      {currentFolder && <div className="active">{currentFolder.name}</div>}
    </StyledBreadCrumbNav>
  );
};

Breadcrumbs.defaultProps = {
  currentFolder: null,
};

Breadcrumbs.propTypes = {
  currentFolder: PropTypes.instanceOf(Object),
};

export default Breadcrumbs;
