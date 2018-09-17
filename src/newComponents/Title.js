import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Title = ({ faction }) => (
  <Helmet>
    <title>
      {` Legion HQ | ${faction.charAt(0).toUpperCase() + faction.substr(1)}`}
    </title>
  </Helmet>
);

Title.propTypes = {
  faction: PropTypes.string.isRequired
};

export default Title;
