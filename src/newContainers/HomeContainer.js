import React from 'react';
import Helmet from 'react-helmet';
import Home from 'newComponents/Home';

const HomeContainer = () => (
  <div>
    <Helmet>
      <title>
        Home | LEGION HQ
      </title>
    </Helmet>
    <Home />
  </div>
);

export default HomeContainer;
