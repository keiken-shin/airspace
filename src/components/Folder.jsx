import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

import { FolderIcon } from './icons';

const StyledFolder = styled.div`
  ${tw`flex items-center border border-solid border-midGray rounded-lg text-dimGray`}
  max-width: var(--folder-max-width);

  & {
    .folder-link {
      ${tw`w-full h-full flex items-center gap-x-2 px-4 py-2 cursor-default`}

      svg {
        width: var(--svg-width);
        min-width: var(--svg-width);
        height: var(--svg-height);
        min-height: var(--svg-height);
      }
    }
  }
`;

const Folder = ({ folder }) => (
  <StyledFolder key={folder.id}>
    <Link
      to={{ pathname: `/folder/${folder.id}`, state: { folder } }}
      className="folder-link"
    >
      <FolderIcon />
      <span className="truncate" title={folder.name}>
        {folder.name}
      </span>
    </Link>
  </StyledFolder>
);

Folder.propTypes = {
  folder: PropTypes.instanceOf(Object).isRequired,
};

export default Folder;
