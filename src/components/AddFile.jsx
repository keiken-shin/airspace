/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuidV4 } from 'uuid';

import {
  Complete,
  File,
  ProgressError,
  FileUpload,
  ProgressIcon,
} from './icons';
import { storage, database } from '../api/firebase';
import { useAuth } from '../context/AuthContext';
import { ROOT_FOLDER } from '../hooks/useFolder';

const StyledLabel = styled.label`
  ${tw`px-6 py-2 bg-lynxWhite border border-solid border-dimGray text-dimGray rounded-lg cursor-pointer transform transition-all flex items-center gap-x-2`}

  & {
    :hover,
    :focus {
      ${tw`bg-whiteSmoke`}
    }

    svg {
      height: calc(var(--svg-height) - 2px);
    }

    input {
      ${tw`opacity-0 absolute`}
      left: -9999px;
    }
  }
`;

const StyledToast = styled.div`
  ${tw`absolute bottom-4 right-4 bg-white shadow-lg rounded-lg w-3/5 md:w-1/4`}

  & {
    .toast-head {
      ${tw`font-semibold px-4 py-2 bg-blackPearl text-lynxWhite rounded-tl-lg rounded-tr-lg`}
    }
  }
`;

const StyledUploadItem = styled.div`
  ${tw`h-14 grid items-center`}
  grid-template-columns: auto 1fr auto;

  & {
    :not(:last-of-type) {
      ${tw`border-b border-solid border-gray-200`}
    }

    .item-icon {
      ${tw`pl-2`}
    }

    .item-name {
      ${tw`font-medium truncate px-2`}
    }

    svg {
      min-width: var(--svg-width);
      min-height: var(--svg-height);
      ${tw`transform transition-all`}
    }

    .progress-bar {
      ${tw`block mr-2`}

      .progress svg {
        --width: 18px;
        --height: 18px;
        width: var(--width);
        min-width: var(--width);
        height: var(--height);
        min-height: var(--height);

        stroke-dasharray: 70;
        stroke-dashoffset: 70;
        stroke-linecap: round;

        circle:nth-of-type(1) {
          ${tw`text-gray-300`}
          stroke-dasharray: 0;
        }

        circle:nth-of-type(2) {
          ${({ progress }) =>
            progress &&
            `stroke-dashoffset: calc(70 - (70 * ${progress}) / 100);`}
          ${tw`text-dodgerBlue`}
        }
      }

      .completed svg {
        ${tw`text-green-600`}
      }

      .error svg {
        ${tw`text-red-500`}
      }
    }
  }
`;

const AddFile = ({ currentFolder }) => {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();

  function handleChange(e) {
    const file = e.target.files[0];
    if (currentFolder === null || file === null) return;
    console.log(uploadingFiles);

    // Set Progress for uploading files
    const id = uuidV4();
    setUploadingFiles((prev) => [
      ...prev,
      { id, name: file.name, progress: 0, error: false },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join('/')}/${file.name}`
        : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      'state-changed',
      // While uploading is in process
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        console.log(progress);
        setUploadingFiles((prevUploadingFiles) =>
          prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress };
            }

            return uploadFile;
          })
        );
      },
      // If error while uploading
      () => {
        setUploadingFiles((prevUploadingFiles) =>
          prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }

            return uploadFile;
          })
        );

        setTimeout(() => {
          setUploadingFiles((prevUploadingFiles) =>
            prevUploadingFiles.filter((uploadFile) => uploadFile.id !== id)
          );
        }, 5000);
      },
      // When upload completes
      () => {
        setUploadingFiles((prevUploadingFiles) =>
          prevUploadingFiles.filter((uploadFile) => uploadFile.id !== id)
        );

        uploadTask.snapshot.ref.getDownloadURL().then((url) =>
          uploadTask.snapshot.ref.getMetadata().then((data) => {
            database.files
              .where('name', '==', file.name)
              .where('userId', '==', currentUser.uid)
              .where('folderId', '==', currentFolder.id)
              .get()
              .then((existingFiles) => {
                const existingFile = existingFiles.docs[0];
                if (existingFile) {
                  existingFile.ref.update({ url });
                } else {
                  database.files.add({
                    url,
                    name: file.name,
                    type: data.contentType,
                    createdAt: database.getCurrentTimeStamp(),
                    folderId: currentFolder.id,
                    userId: currentUser.uid,
                  });
                }
              });
          })
        );
      }
    );
  }

  return (
    <>
      <StyledLabel>
        <span>
          <FileUpload />
        </span>
        <span>Upload File</span>
        <input type="file" onChange={handleChange} />
      </StyledLabel>

      {/* Upload Progress */}
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <StyledToast>
            <h4 className="toast-head">
              {uploadingFiles.length} item uploading
            </h4>
            {uploadingFiles.map((file) => (
              <StyledUploadItem progress={file.progress * 100} key={file.id}>
                <span className="item-icon">
                  <File />
                </span>
                <p className="item-name">{file.name}</p>
                <span className="progress-bar">
                  {file.error ? (
                    <span className="error">
                      <ProgressError />
                    </span>
                  ) : file.progress * 100 < 100 ? (
                    <span className="progress">
                      <ProgressIcon />
                    </span>
                  ) : (
                    <span className="completed">
                      <Complete />
                    </span>
                  )}
                </span>
              </StyledUploadItem>
            ))}
          </StyledToast>,
          document.body
        )}
    </>
  );
};

AddFile.defaultProps = {
  currentFolder: null,
};

AddFile.propTypes = {
  currentFolder: PropTypes.instanceOf(Object),
};

export default AddFile;
