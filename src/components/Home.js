import React from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import ClearIcon from '@material-ui/icons/Clear';
import SendIcon from '@material-ui/icons/Send';
import BugReportIcon from '@material-ui/icons/BugReport';
import EmailIcon from '@material-ui/icons/Email';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const listStyles = {
  height: '22vh',
  overflowY: 'scroll'
};

const buttonStyles = {
  margin: '1rem'
};

const paperStyles = {
  padding: '1rem'
};

const factionIconStyles = {
  width: '7.5rem',
  height: 'auto',
  cursor: 'pointer'
};

const rebelsIconStyles = {
  ...factionIconStyles
};

const empireIconStyles = {
  ...factionIconStyles
};

const Home = ({ history, userId, handleGoogleLogin, handleGoogleLogout, handleGoogleLoginFailure, rebelLists, empireLists, deleteList, toggleDarkMode, darkMode }) => (
  <Grow in>
    <Grid
      container
      spacing={8}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography
          color="inherit"
          variant="display3"
          style={{
            color: darkMode ? 'white' : 'black'
          }}
        >
          Legion HQ
        </Typography>
      </Grid>
      <Grid
        item
        container
        spacing={24}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item>
          <Avatar
            src={darkMode ? '/faction/rebelsIconWhite.svg' : '/faction/rebelsIconBlack.svg'}
            style={rebelsIconStyles}
            onClick={() => history.push('/list/rebels')}
          />
          <div
            style={{
              backgroundColor: darkMode ? '#848484' : undefined,
              borderRadius: '3px',
              margin: '5px'
            }}
          >
            <List dense>
              {rebelLists.map(list => (
                <ListItem
                  key={`${list._id}`}
                >
                  <IconButton
                    color="inherit"
                    onClick={() => history.push(`/list/${list._id}`)}
                  >
                    <SendIcon />
                  </IconButton>
                  <ListItemText primary={list.title} secondary={list.pointTotal} />
                  <IconButton
                    color="inherit"
                    onClick={() => deleteList(list._id)}
                  >
                    <ClearIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item>
          <Avatar
            src={darkMode ? '/faction/empireIconWhite.svg' : '/faction/empireIconBlack.svg'}
            style={empireIconStyles}
            onClick={() => history.push('/list/empire')}
          />
          <div
            style={{
              backgroundColor: darkMode ? '#848484' : undefined,
              borderRadius: '3px',
              margin: '5px'
            }}
          >
            <List dense>
              {empireLists.map(list => (
                <ListItem
                  key={`${list._id}`}
                >
                  <IconButton
                    color="inherit"
                    onClick={() => history.push(`/list/${list._id}`)}
                  >
                    <SendIcon />
                  </IconButton>
                  <ListItemText primary={list.title} secondary={list.pointTotal} />
                  <IconButton
                    color="inherit"
                    onClick={() => deleteList(list._id)}
                  >
                    <ClearIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
      <Grid item>
        <Paper
          style={{
            ...paperStyles,
            backgroundColor: darkMode ? '#848484' : 'white'
          }}
        >
          <Grid
            container
            spacing={8}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {userId ? (
              <Grid item>
                <GoogleLogout
                  buttonText="Sign out"
                  onLogoutSuccess={handleGoogleLogout}
                  className="loginButton"
                />
              </Grid>
            ) : (
              <Grid item>
                <GoogleLogin
                  isSignedIn
                  buttonText="Sign in with Google"
                  clientId="112890447494-ls135bmon2jbaj0mh3k0fnukugp9upkk.apps.googleusercontent.com"
                  onSuccess={handleGoogleLogin}
                  onFailure={handleGoogleLoginFailure}
                  className="loginButton"
                />
              </Grid>
            )}
          </Grid>
          <Grid
            container
            spacing={8}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Button
                variant={darkMode ? 'outlined' : 'contained'}
                size="small"
                onClick={() => toggleDarkMode()}
              >
                {darkMode ? (
                  <Brightness5Icon style={{ marginRight: '10px' }} />
                ) : (
                  <Brightness2Icon style={{ marginRight: '10px' }} />
                )}
                {darkMode ? 'Light Side' : 'Dark Side'}
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={8}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Button
                variant={darkMode ? 'outlined' : 'contained'}
                href="https://github.com/NicholasCBrown/legion-HQ"
                size="small"
              >
                <BugReportIcon style={{ marginRight: '10px' }} />
                Github
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={darkMode ? 'outlined' : 'contained'}
                size="small"
                onClick={() => alert('contact@legion-hq.com')}
              >
                <EmailIcon style={{ marginRight: '10px' }} />
                Email
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Grow>
);

export default withRouter(Home);
