import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import {
  AddFile,
  AddFolder,
  BreadCrumbs,
  Folder,
  File,
  Header,
} from '../components';
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
        ${tw`flex items-center gap-x-4`}
      }
    }

    .section-title {
      ${tw`text-sm font-semibold capitalize text-dimGray px-4 my-4`}
    }
  }
`;

const StyledList = styled.div`
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
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  return (
    <>
      <Helmet title={folderId ? folder.name : 'Airspace'} />
      <Header />
      <StyledContainer>
        <section className="controls">
          <div className="breadcrumbs-menu">
            <BreadCrumbs currentFolder={folder} />
          </div>
          <div className="control-buttons">
            <AddFile currentFolder={folder} />
            <AddFolder currentFolder={folder} />
          </div>
        </section>

        {childFolders.length > 0 && (
          <section className="folders-section">
            <h4 className="section-title">Folders</h4>
            <StyledList>
              {childFolders.map((childFolder) => (
                <div className="inner-list-div" key={childFolder.id}>
                  <Folder folder={childFolder} />
                </div>
              ))}
            </StyledList>
          </section>
        )}

        {childFolders.length > 0 && childFiles.length > 0 && (
          <hr className="my-4" />
        )}

        {childFiles.length > 0 && (
          <section className="files-section">
            <h4 className="section-title">Files</h4>
            <StyledList>
              {childFiles.map((childFile) => (
                <div className="inner-list-div" key={childFile.id}>
                  <File file={childFile} />
                </div>
              ))}
            </StyledList>
          </section>
        )}
      </StyledContainer>
    </>
  );
};
export default Home;
