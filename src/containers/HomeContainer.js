import React from 'react';
import Helmet from 'react-helmet';
import Home from 'components/Home';

export default class HomeContainer extends React.Component {
  state = {};

  componentDidMount() {
    const { refreshUserLists } = this.props;
    refreshUserLists();
  }

  render() {
    const {
      userId,
      userLists,
      handleGoogleLogin,
      handleGoogleLogout,
      deleteList,
      toggleDarkMode,
      darkMode
    } = this.props;
    const rebelLists = [];
    const empireLists = [];
    userLists.forEach((userList) => {
      if (userList.faction === 'rebels') rebelLists.push(userList);
      else if (userList.faction === 'empire') empireLists.push(userList);
    });
    return (
      <div
        style={{
          overflowY: 'scroll',
          height: '100vh',
          backgroundColor: darkMode ? '#303030' : 'white'
        }}
      >
        <Helmet>
          <title>
            Legion HQ
          </title>
        </Helmet>
        <Home
          userId={userId}
          handleGoogleLogin={handleGoogleLogin}
          handleGoogleLogout={handleGoogleLogout}
          rebelLists={rebelLists}
          empireLists={empireLists}
          deleteList={deleteList}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
      </div>
    );
  }
}
