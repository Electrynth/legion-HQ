import React, { Component } from 'react';
import Axios from 'axios';
import md5 from 'md5';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import HomeContainer from 'containers/HomeContainer';
import BuilderContainer from 'containers/BuilderContainer';

class App extends Component {
  state = {
    cards: {},
    unitsById: [],
    upgradesById: [],
    commandsById: [],
    status: '',
    userId: '',
    userLists: [],
    objectiveCards: [],
    deploymentCards: [],
    conditionCards: []
  };

  componentDidMount() {
    Axios.get('/data').then(response => this.setState({ ...response.data }));
  }

  deleteList = (listId) => {
    Axios.delete(`/list?listId=${listId}`).then((deleteResponse) => {
      const deleteData = deleteResponse.data;
      if (deleteData.error) {
        console.log(deleteData.msg);
      } else {
        const { userId } = this.state;
        Axios.get(`/lists?userId=${userId}`).then((refreshResponse) => {
          const refreshData = refreshResponse.data;
          if (refreshResponse.error) {
            console.log(refreshResponse.msg);
          } else {
            this.setState({
              userLists: refreshData.results
            });
          }
        });
      }
    });
  }

  updateList = (list) => {
    Axios.put(`/list?listId=${list._id}`, { list: { ...list, title: list.title ? list.title : 'Untitled' } }).then((response) => {
      const { data } = response;
      if (data.error) {
        console.log(data.msg);
      } else {
        const { userId } = this.state;
        Axios.get(`/lists?userId=${userId}`).then((refreshResponse) => {
          const refreshData = refreshResponse.data;
          if (refreshResponse.error) {
            console.log(refreshResponse.msg);
          } else {
            this.setState({
              userLists: refreshData.results
            });
          }
        });
      }
    });
  }

  createList = (userId, list) => {
    Axios.post(`/list?userId=${userId}`, { list: { ...list, title: list.title ? list.title : 'Untitled' } }).then((response) => {
      const { data } = response;
      if (data.error) {
        console.log(data.msg);
      } else {
        const { userId } = this.state;
        Axios.get(`/lists?userId=${userId}`).then((refreshResponse) => {
          const refreshData = refreshResponse.data;
          if (refreshResponse.error) {
            console.log(refreshResponse.msg);
          } else {
            this.setState({
              userLists: refreshData.results
            });
          }
        });
      }
    });
  }

  getListsByUserId = (userId) => {
    Axios.get(`/lists?userId=${userId}`).then((response) => {
      const { data } = response;
      if (data.error) {
        console.log(data.msg);
        return [];
      }
      return data.results;
    });
  }

  getListsById = (listId) => {
    Axios.get(`/lists?listId=${listId}`).then((response) => {
      const { data } = response;
      if (data.error) {
        console.log(data.msg);
        return [];
      }
      return data.results;
    });
  }

  handleGoogleLogin = (googleResponse) => {
    if ('googleId' in googleResponse) {
      const userId = md5(googleResponse.googleId);
      Axios.get(`/user?userId=${userId}`).then((userResponse) => {
        const userData = userResponse.data;
        if (userData.error) {
          console.log('handleGoogleLogin Error 1', userData.msg);
        } else if (userData.results.length === 0) {
          Axios.post(`/user?userId=${userId}`).then((creationResponse) => {
            const creationData = creationResponse.data;
            if (creationData.error) {
              this.setState({ googleResponse: true });
            } else {
              this.setState({
                userId,
                userLists: [],
                googleResponse: true
              });
            }
          });
        } else {
          Axios.get(`/lists?userId=${userId}`).then((response) => {
            const { data } = response;
            if (data.error) {
              this.setState({ googleResponse: true });
            } else {
              this.setState({
                userId,
                userLists: data.results,
                googleResponse: true
              });
            }
          });
        }
      });
    }
  }

  handleGoogleLogout = () => {
    alert('Successfully signed out.');
    this.setState({
      userId: '',
      userLists: []
    });
  }

  refreshUserLists = () => {
    const { userId } = this.state;
    if (userId) {
      Axios.get(`/lists?userId=${userId}`).then((response) => {
        const { data } = response;
        if (data.error) {
          console.log(data.msg);
        } else {
          this.setState({
            userLists: data.results
          });
        }
      });
    }
  }

  render() {
    const {
      status,
      googleResponse,
      userId,
      userLists,
      cards,
      unitsById,
      upgradesById,
      commandsById,
      objectiveCards,
      deploymentCards,
      conditionCards
    } = this.state;
    commandsById.sort((a, b) => {
      if (cards[a].pips > cards[b].pips) return -1;
      if (cards[a].pips < cards[b].pips) return 1;
      return 0;
    });
    return (
      <div>
        <Grow
          in={status === 'success' && googleResponse}
        >
          <Switch>
            <Route
              path="/home"
              render={props => (
                <HomeContainer
                  {...props}
                  userId={userId}
                  userLists={userLists}
                  handleGoogleLogin={this.handleGoogleLogin}
                  handleGoogleLogout={this.handleGoogleLogout}
                  deleteList={this.deleteList}
                  refreshUserLists={this.refreshUserLists}
                />
              )}
            />
            <Route
              path="/list/:id"
              render={props => (
                <BuilderContainer
                  {...props}
                  userId={userId}
                  cards={cards}
                  objectiveCards={objectiveCards}
                  deploymentCards={deploymentCards}
                  conditionCards={conditionCards}
                  unitsById={unitsById}
                  upgradesById={upgradesById}
                  commandsById={commandsById}
                  handleGoogleLogin={this.handleGoogleLogin}
                  handleGoogleLogout={this.handleGoogleLogout}
                />
              )}
            />
            <Redirect from="/" to="/home" />
          </Switch>
        </Grow>
      </div>
    );
  }
}

export default withRouter(App);
