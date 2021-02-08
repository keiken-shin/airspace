import React from 'react';
import PropTypes from 'prop-types';
import { List, File } from '.';

const AllFiles = ({ childFiles }) => (
  <>
    {childFiles.length > 0 && (
      <section className="files-section">
        <h4 className="section-title">Files</h4>
        <List>
          {childFiles.map((childFile) => (
            <div className="inner-list-div" key={childFile.id}>
              <File file={childFile} />
            </div>
          ))}
        </List>
      </section>
    )}
  </>
);

AllFiles.propTypes = {
  childFiles: PropTypes.instanceOf(Object).isRequired,
};

export default AllFiles;
