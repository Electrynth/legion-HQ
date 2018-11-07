import React from 'react';
import Helmet from 'react-helmet';
import Home from 'components/Home';

export default class HomeContainer extends React.Component {
  state = {};

  render() {
    const {
      loggedIn,
      user,
      handleGoogleLogin,
      handleGoogleLogout
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>
            Legion HQ
          </title>
        </Helmet>
        <Home
          loggedIn={loggedIn}
          user={user}
          handleGoogleLogin={handleGoogleLogin}
          handleGoogleLogout={handleGoogleLogout}
        />
      </div>
    );
  }
}
