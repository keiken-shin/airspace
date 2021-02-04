import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tw from 'twin.macro';

const StyledFile = styled.div`
  ${tw`flex items-center border border-solid border-midGray rounded-lg text-dimGray`}
  max-width: var(--folder-max-width);

  & {
    :hover,
    :focus {
      ${tw`border-royalBlue bg-blue-100 text-royalBlue`}
    }

    .file-link {
      ${tw`w-full h-full flex items-center gap-x-2 px-4 py-2 cursor-default`}
      .file-name {
        ${tw`truncate`}
      }

      svg {
        width: var(--svg-width);
        min-width: var(--svg-width);
        height: var(--svg-height);
        min-height: var(--svg-height);
      }
    }
  }
`;

const File = ({ file }) => (
  <StyledFile>
    <a href={file.url} target="_blank" rel="noreferrer" className="file-link">
      <span className="file-name">{file.name}</span>
    </a>
  </StyledFile>
);

File.defaultProps = {
  file: null,
};

File.propTypes = {
  file: PropTypes.instanceOf(Object),
};

export default File;
