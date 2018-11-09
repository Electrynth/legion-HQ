import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import BuilderContainer from './BuilderContainer'

class PreloadedContainer extends React.Component {
  state = {
    loading: true,
    list: {
      faction: '',
      userId: '',
      mode: 'standard',
      title: '',
      notes: '',
      pointTotal: 0,
      uniques: {},
      units: [],
      commands: [
        {
          pips: 4,
          name: 'Standing Orders',
          commander: '',
          faction: '',
          product: ['swl01'],
          imageLocation: '/commands/Standing%20Orders.png',
          iconLocation: '/commandIcons/Standing%20Orders.png'
        }
      ]
    }
  };

  componentDidMount() {
    const { list, match, history } = this.props;
    const id = match.params.id;
    if (id === 'rebels' || id === 'empire') {
      this.setState({
        list: { faction: id, ...list },
        loading: false
      });
    } else {
      Axios.get(`/lists?listId=${id}`).then((response) => {
        const { data } = response;
        if ('results' in data && data.results.length > 0) {
          this.setState({
            list: data.results[0],
            loading: false
          });
        } else {
          alert("List does not exist.")
          history.push('/home');
        }
      });
    }
  }

  render() {
    const {
      loading,
      list
    } = this.state;
    const {
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
