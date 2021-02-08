import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ title, description, lang }) => (
  <Helmet lang={lang}>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

SEO.defaultProps = {
  lang: 'en',
  description:
    'Airspace - Your personal cabinet for storing and managing your folders and files',
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SEO;
