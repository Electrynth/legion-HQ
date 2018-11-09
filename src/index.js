import React, { Component } from 'react';
import Axios from 'axios';
import md5 from 'md5';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import HomeContainer from 'containers/HomeContainer';
import BuilderContainer from 'containers/BuilderContainer';
import PreloadedContainer from 'containers/PreloadedContainer';

class App extends Component {
  state = {
    cards: {},
    unitsById: [],
    upgradesById: [],
    commandsById: [],
    status: '',
    userId: '',
    userLists: [],
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
              list: data.results,
              listId: data.results._id,
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
            if (creationData.error) console.log(creationData.msg);
            else {
              this.setState({
                userId,
                userLists: []
              });
            }
          });
        } else {
          Axios.get(`/lists?userId=${userId}`).then((response) => {
            const { data } = response;
            if (data.error) {
              console.log('handleGoogleLogin Error 2', data.msg);
            } else {
              this.setState({
                userId,
                userLists: data.results
              });
            }
          });
        }
      });
    }
  }

  handleGoogleLogout = () => {
    alert('Successfully logged out.');
    this.setState({
      userId: '',
      userLists: []
    });
  }

  render() {
    const {
      list,
      status,
      userId,
      userLists,
      cards,
      unitsById,
      upgradesById,
      commandsById,
      listId
    } = this.state;
    const defaultList = {
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
    return (
      <div>
        <Grow
          in={status === 'success'}
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
                />
              )}
            />
            <Route
              path="/list/rebels"
              render={props => (
                <BuilderContainer
                  {...props}
                  list={{
                    ...list,
                    userId,
                    faction: 'rebels',
                  }}
                  listId={listId}
                  userId={userId}
                  userLists={userLists}
                  cards={cards}
                  unitsById={unitsById}
                  upgradesById={upgradesById}
                  commandsById={commandsById}
                  createList={this.createList}
                  updateList={this.updateList}
                  handleGoogleLogin={this.handleGoogleLogin}
                  handleGoogleLogout={this.handleGoogleLogout}
                />
              )}
            />
            <Route
              path="/list/empire"
              render={props => (
                <BuilderContainer
                  {...props}
                  list={{
                    ...list,
                    userId,
                    faction: 'empire',
                  }}
                  listId={listId}
                  userId={userId}
                  userLists={userLists}
                  cards={cards}
                  unitsById={unitsById}
                  upgradesById={upgradesById}
                  commandsById={commandsById}
                  createList={this.createList}
                  updateList={this.updateList}
                  handleGoogleLogin={this.handleGoogleLogin}
                  handleGoogleLogout={this.handleGoogleLogout}
                />
              )}
            />
            <Route
              path="/list/:id"
              render={props => (
                <PreloadedContainer
                  {...props}
                  list={list}
                  userId={userId}
                  userLists={userLists}
                  cards={cards}
                  unitsById={unitsById}
                  upgradesById={upgradesById}
                  commandsById={commandsById}
                  createList={this.createList}
                  updateList={this.updateList}
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

export default App;
