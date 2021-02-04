import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import PropTypes from 'prop-types';

import { useAuth } from '../context/AuthContext';
import { AddFolderIcon, Cross } from './icons';
import Input from './templates/Input';
import { database } from '../api/firebase';

const StyledModel = styled.div`
  ${tw`fixed inset-0 bg-gray-500 opacity-75 grid place-items-center z-20`}
`;

const StyledModelCard = styled.div`
  ${tw`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}

  & {
    .card-content {
      ${tw`bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}

      .title {
        ${tw`text-xl font-bold mb-4 flex items-center justify-between`}

        .close svg {
          cursor: pointer;
          width: 24px;
          height: 24px;
        }
      }

      .inputs {
        ${tw`mb-4`}
      }

      .buttons {
        ${tw`flex items-center justify-end gap-x-5`}

        .secondary {
          ${tw`px-6 py-2`}
        }
      }
    }
  }
`;

const AddFolder = ({ currentFolder }) => {
  const [open, setOpen] = useState(false);

  const openModel = () => {
    setOpen(true);
  };

  const closeModel = () => {
    setOpen(false);
  };

  return (
    <>
      <button type="button" className="primary" onClick={openModel}>
        <AddFolderIcon />
        <span>New Folder</span>
      </button>
      {open && (
        <Model close={() => closeModel(this)} currentFolder={currentFolder} />
      )}
    </>
  );
};

function Model({ close, currentFolder }) {
  const folderName = useRef(null);
  const { currentUser } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder === null) return;

    // Create folder in the database
    database.folders.add({
      name: folderName.current.value,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      //   path,
      createdAt: database.getCurrentTimeStamp(),
    });

    // Resetting everything back
    folderName.current.value = '';
    close();
  }

  return (
    <StyledModel>
      <StyledModelCard>
        <div className="card-content">
          <div className="title">
            <span>New Folder</span>
            <button type="button" className="close" onClick={close}>
              <Cross />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="inputs">
              <Input
                type="text"
                placeholder="Folder Name"
                reference={folderName}
              />
            </div>
            <div className="buttons">
              <button type="button" className="secondary" onClick={close}>
                Close
              </button>
              <button type="submit" className="primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </StyledModelCard>
    </StyledModel>
  );
}

AddFolder.defaultProps = {
  currentFolder: null,
};

AddFolder.propTypes = {
  currentFolder: PropTypes.instanceOf(Object),
};

Model.propTypes = {
  close: PropTypes.func.isRequired,
  currentFolder: PropTypes.instanceOf(Object).isRequired,
};

export default AddFolder;
