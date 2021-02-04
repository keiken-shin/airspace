import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useParams, useLocation } from 'react-router-dom';

import { AddFolder, BreadCrumbs, Folder, Header } from '../components';
import { useFolder } from '../hooks/useFolder';

const StyledContainer = styled.main`
  ${tw`px-4 md:px-12 py-8`}

  & {
    .controls {
      ${tw`flex items-center justify-between mb-4`}

      .breadcrumbs-menu {
        ${tw`flex items-center`}
      }

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
  const { state = {} } = useLocation();
  const { folder, childFolders } = useFolder(folderId, state.folder);

  return (
    <>
      <Header />
      <StyledContainer>
        <section className="controls">
          <div className="breadcrumbs-menu">
            <BreadCrumbs currentFolder={folder} />
          </div>
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
