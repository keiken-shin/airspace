import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useParams, useLocation, Redirect } from 'react-router-dom';

import {
  AddFile,
  AddFolder,
  BreadCrumbs,
  Header,
  SEO,
  AllFolders,
  AllFiles,
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

const Home = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();

  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  try {
    return (
      <>
        <SEO title={folderId ? folder.name : 'Airspace'} />
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

          <AllFolders childFolders={childFolders} />

          {childFolders.length > 0 && childFiles.length > 0 && (
            <hr className="my-4" />
          )}

          <AllFiles childFiles={childFiles} />
        </StyledContainer>
      </>
    );
  } catch {
    return <Redirect to="/404" />;
  }
};
export default Home;
