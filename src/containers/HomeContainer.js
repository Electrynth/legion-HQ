import React from 'react';
import Helmet from 'react-helmet';
import Home from 'components/Home';

export default class HomeContainer extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Helmet>
          <title>
            Home | LEGION HQ
          </title>
        </Helmet>
        <Home />
      </div>
    );
  }
}
