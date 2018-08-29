import React from 'react';
import Helmet from 'react-helmet';

// {`${faction} | Legion Builder`}

const Title = ({ faction }) => (
  <Helmet>
    <title>
      {`${faction.charAt(0).toUpperCase() + faction.substr(1)} | LEGION HQ`}
    </title>
  </Helmet>
);

export default Title;
