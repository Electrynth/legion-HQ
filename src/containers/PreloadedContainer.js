import React from 'react';
import Axios from 'axios';
import BuilderContainer from './BuilderContainer'

class PreloadedContainer extends React.Component {
  state = {
    list: {
      faction: 'unknown'
    }
  };

  componentDidMount() {
    Axios.post('/list', { _id: this.props.match.params.uid, listIndex: this.props.match.params.lid }).then((response) => {
      let listIndex = Number.parseInt(this.props.match.params.lid, 10);
      if (Number.isNaN(listIndex)) {
        listIndex = -1;
      }
      this.setState({ list: { ...response.data.list, listIndex } });
    });
  }

  render() {
    const {
      list
    } = this.state;
    let { faction } = list;
    const {
      cards,
      unitsById,
      upgradesById,
      commandsById,
      isLoggedIn,
      user,
      handleSaveList,
      handleDeleteList
    } = this.props;
    return (
      <div>
        {faction === 'unknown' ? (
          <div />
        ) : (
          <BuilderContainer
            preloadedList={list}
            faction={faction}
            cards={cards}
            unitsById={unitsById}
            upgradesById={upgradesById}
            commandsById={commandsById}
            isLoggedIn={isLoggedIn}
            user={user}
            handleSaveList={handleSaveList}
            handleDeleteList={handleDeleteList}
          />
        )}
      </div>
    );
  }
}

export default PreloadedContainer;
