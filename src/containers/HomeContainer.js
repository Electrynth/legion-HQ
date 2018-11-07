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
      handleGoogleLogout,
      rebelLists,
      empireLists,
    } = this.props;
    return (
      <div style={{ overflowY: 'scroll', height: '100vh' }}>
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
          rebelLists={rebelLists}
          empireLists={empireLists}
        />
      </div>
    );
  }
}
