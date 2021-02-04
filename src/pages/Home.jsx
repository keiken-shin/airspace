import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useParams } from 'react-router-dom';

import { AddFolder, Header } from '../components';
import Folder from '../components/Folder';
import { useFolder } from '../hooks/useFolder';

const StyledContainer = styled.main`
  ${tw`px-4 md:px-12 py-8`}

  & {
    .controls {
      ${tw`flex items-center justify-end mb-4`}

      .control-buttons {
        ${tw`flex items-center`}
      }
    }
  }
`;

const StyledFolderList = styled.div`
  ${tw`grid`}
  grid-template-columns: repeat(auto-fill, minmax(220px,1fr));

  & {
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    }

    @media (max-width: 360px) {
      grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    }

    .inner-list-div {
      ${tw`p-2`}
    }
  }
`;

const Home = () => {
  const { folderId } = useParams();
  const { folder, childFolders } = useFolder(folderId);
  console.log(folder, childFolders);

  return (
    <>
      <Header />
      <StyledContainer>
        <section className="controls">
          <div className="control-buttons">
            <AddFolder currentFolder={folder} />
          </div>
        </section>
        {childFolders.length > 0 && (
          <StyledFolderList>
            {childFolders.map((childFolder) => (
              <div className="inner-list-div" key={childFolder.id}>
                <Folder folder={childFolder} />
              </div>
            ))}
          </StyledFolderList>
        )}
      </StyledContainer>
    </>
  );
};
export default Home;
