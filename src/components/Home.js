import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const buttonStyles = {
  margin: '1rem'
};

const Home = ({ history }) => (
  <div>
    <Button variant="contained" onClick={() => history.push('/rebels')} style={buttonStyles}>
      Rebels
    </Button>
    <Button variant="contained" onClick={() => history.push('/empire')} style={buttonStyles}>
      Empire
    </Button>
  </div>
);

export default withRouter(Home);
