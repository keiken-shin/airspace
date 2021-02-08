import React from 'react';
import PropTypes from 'prop-types';
import { List, Folder } from '.';

const AllFolders = ({ childFolders }) => (
  <>
    {childFolders.length > 0 && (
      <section className="folders-section">
        <h4 className="section-title">Folders</h4>
        <List>
          {childFolders.map((childFolder) => (
            <div className="inner-list-div" key={childFolder.id}>
              <Folder folder={childFolder} />
            </div>
          ))}
        </List>
      </section>
    )}
  </>
);

AllFolders.propTypes = {
  childFolders: PropTypes.instanceOf(Object).isRequired,
};

export default AllFolders;
