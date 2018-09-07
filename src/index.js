import React, { Component } from 'react';
import Axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import HomeContainer from 'containers/HomeContainer';
import BuilderContainer from 'containers/BuilderContainer';
import ExportedListContainer from 'containers/ExportedListContainer';

/*
<div style={{ position: 'absolute', left: '50%', top: '50%' }}>
  <div style={{ position: 'relative', left: '-50%' }}>
    <Grow
      in={status !== 'success'}
    >
      <CircularProgress
        size={50}
        color={status === 'error' ? 'secondary' : 'primary'}
      />
    </Grow>
  </div>
</div>
*/

class App extends Component {
  state = {
    cards: {},
    unitsById: [],
    upgradesById: [],
    commandsById: [],
    uniques: {},
    status: '',
    message: ''
  };

  componentDidMount() {
    Axios.get('/data').then(response => this.setState({ ...response.data }));
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
              render={props => <HomeContainer {...this.state} {...props} />}
            />
            <Route
              path="/rebels"
              render={props => <BuilderContainer faction="rebels" {...this.state} {...props} />}
            />
            <Route
              path="/empire"
              render={props => <BuilderContainer faction="empire" {...this.state} {...props} />}
            />
            <Route
              path="/export"
              render={props => <ExportedListContainer {...props} />}
            />
            <Redirect from="/" to="/home" />
          </Switch>
        </Grow>
      </div>
    );
  }
}

export default App;
