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
    user: {}
  };

  componentDidMount() {
    Axios.get('/data').then(response => this.setState({ ...response.data }));
  }

  handleGoogleLogin = (response) => {
    if ('googleId' in response) {
      Axios.post('/fetch', { googleId: response.googleId }).then((responseToFetch) => {
        const responseData = responseToFetch.data;
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
      user: {}
    });
  }

  render() {
    const {
      status
    } = this.state;
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
                  handleGoogleLogin={this.handleGoogleLogin}
                  handleGoogleLogout={this.handleGoogleLogout}
                />
              )}
            />
            <Route
              path="/rebels"
              render={props => <BuilderContainer faction="rebels" {...this.state} {...props} />}
            />
            <Route
              path="/empire"
              render={props => <BuilderContainer faction="empire" {...this.state} {...props} />}
            />
            <Redirect from="/" to="/home" />
          </Switch>
        </Grow>
      </div>
    );
  }
}

export default App;
