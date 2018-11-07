import React, { Component } from 'react';
import Axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import HomeContainer from 'containers/HomeContainer';
import BuilderContainer from 'containers/BuilderContainer';

class App extends Component {
  state = {
    cards: {},
    unitsById: [],
    upgradesById: [],
    commandsById: [],
    uniques: {},
    status: '',
    message: '',
    loggedIn: false,
    user: {
      _id: -1,
      lists: []
    }
  };

  componentDidMount() {
    Axios.get('/data').then(response => this.setState({ ...response.data }));
  }

  handleDeleteList = (list, listIndex) => {
    const { user } = this.state;
    if (typeof user.lists[listIndex] !== 'undefined') {
      user.lists[listIndex] = {};
    }
    Axios.post('/save', { _id: user._id, lists: user.lists }, ((response) => {
      if (response.error === false) {
        this.setState({ user: response.data.user });
      }
    }));
  }

  handleSaveList = (list) => {
    const { user } = this.state;
    let foundEmptySlot = false;
    user.lists.forEach((list, index) => {
      if (!('faction' in list)) {
        foundEmptySlot = true;
        user.lists[index] = list;
      }
    })
    if (!foundEmptySlot) {
      user.lists.push(list);
    }
    Axios.post('/save', { _id: user._id, lists: user.lists }, ((response) => {
      if (response.error === false) {
        this.setState({ user: response.data.user });
      }
    }));
  }

  handleGoogleLogin = (response) => {
    if ('googleId' in response) {
      Axios.post('/fetch', { googleId: response.googleId }).then((responseToFetch) => {
        const responseData = responseToFetch.data.user;
        console.log(responseData);
        if (responseData.error) {
          alert(responseData.msg);
        } else {
          this.setState({
            loggedIn: true,
            user: { ...responseData }
          });
        }
      });
    }
  }

  handleGoogleLogout = () => {
    alert('Successfully logged out.');
    this.setState({
      loggedIn: false,
      user: {
        _id: -1,
        lists: []
      }
    });
  }

  render() {
    const {
      status,
      user
    } = this.state;
    const rebelLists = [];
    const empireLists = [];
    user.lists.forEach((list) => {
      if ('faction' in list && list.faction === 'rebels') rebelLists.push(list);
      else if ('faction' in list && list.faction === 'empire') empireLists.push(list);
    })
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
                  {...this.state}
                  rebelLists={rebelLists}
                  empireLists={empireLists}
                  handleGoogleLogin={this.handleGoogleLogin}
                  handleGoogleLogout={this.handleGoogleLogout}
                />
              )}
            />
            <Route
              path="/rebels"
              render={props => (
                <BuilderContainer
                  faction="rebels"
                  {...this.state}
                  {...props}
                  handleSaveList={this.handleSaveList}
                />
              )}
            />
            <Route
              path="/empire"
              render={props => (
                <BuilderContainer
                  faction="empire"
                  {...this.state}
                  {...props}
                  handleSaveList={this.handleSaveList}
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
