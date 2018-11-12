import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import BuilderContainer from './BuilderContainer'

class PreloadedContainer extends React.Component {
  state = {
    loading: true
  };

  render() {
    const {
      loading
    } = this.state;
    const {
      list,
      userId,
      userLists,
      cards,
      unitsById,
      upgradesById,
      commandsById,
      createList,
      updateList,
      handleGoogleLogin,
      handleGoogleLogout
    } = this.props;
    return (
      <div>
        {loading ? (
          <div />
        ) : (
          <BuilderContainer
            list={list}
            userId={userId}
            userLists={userLists}
            cards={cards}
            unitsById={unitsById}
            upgradesById={upgradesById}
            commandsById={commandsById}
            createList={createList}
            updateList={updateList}
            handleGoogleLogin={handleGoogleLogin}
            handleGoogleLogout={handleGoogleLogout}
          />
        )}
      </div>
    );
  }
}

export default withRouter(PreloadedContainer);
