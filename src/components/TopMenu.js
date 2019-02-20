import React from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

/*
<IconButton color="inherit">
  <DeleteIcon />
</IconButton>
<IconButton color="inherit">
  <PrintIcon />
</IconButton>
<IconButton color="inherit">
  <LinkIcon />
</IconButton>
<IconButton color="inherit">
  <SaveIcon />
</IconButton>
<IconButton color="inherit">
  <MoreVertIcon />
</IconButton>
*/

class TopMenu extends React.Component {
  state = {
  };

  handlePopoverOpen = event => this.setState({ menuAnchor: event.currentTarget })

  handlePopoverClose = () => this.setState({ menuAnchor: null });

  render() {
    const {
      list,
      changeListMode,
      changeListTitle,
      mobile,
      renderTestButton,
      history,
      userId,
      handleGoogleLogin,
      handleGoogleLogout,
      shiftLeftRightSizes,
      leftRightSizes
    } = this.props;
    const avatarStyles = {
      margin: '0 1.2rem 0 1rem',
      width: 30,
      height: 30,
      cursor: 'pointer'
    };
    const textInputStyles = {
      width: '10vw'
    };
    const buttonStyles = {
      marginLeft: '0.5rem'
    };
    const rankIconStyles = {
      commander: {
        bottom: '5px',
        marginLeft: '5px',
        width: '30px',
        height: '20px'
      },
      operative: {
        bottom: '5px',
        marginLeft: '5px',
        width: '20px',
        height: '20px'
      },
      corps: {
        bottom: '5px',
        marginLeft: '5px',
        width: '20px',
        height: '20px'
      },
      special: {
        bottom: '5px',
        marginLeft: '5px',
        width: '40px',
        height: '20px'
      },
      support: {
        bottom: '5px',
        marginLeft: '5px',
        width: '17px',
        height: '20px'
      },
      heavy: {
        bottom: '5px',
        marginLeft: '5px',
        width: '32px',
        height: '20px'
      }
    };
    const maxPoints = list.mode === 'standard' ? 800 : 1600;
    let pointTotal = 0;
    list.units.forEach((unit) => {
      unit.upgradesEquipped.forEach((upgrade) => {
        if (upgrade) pointTotal += upgrade.cost * unit.count;
      });
      pointTotal += unit.count * unit.totalCost;
    });
    const factionIconLocation = list.faction === 'rebels' ? '/faction/rebelsIconBlack.svg' : '/faction/empireIconBlack.svg';
    return (
      <Slide
        in
        mountOnEnter
        unmountOnExit
        direction="down"
        timeout={500}
      >
        <AppBar position="fixed" color="primary">
          <Toolbar variant="dense">
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Avatar
                  style={avatarStyles}
                  src={factionIconLocation}
                  onClick={() => history.push('/home')}
                />
              </Grid>
              <Grid item>
                <TextField
                  placeholder={list.title === '' ? 'Untitled' : list.title}
                  value={list.title}
                  onChange={changeListTitle}
                />
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={changeListMode}
                  style={buttonStyles}
                >
                  <Typography noWrap variant="body1">
                    {`${pointTotal}/${maxPoints} ${list.mode}`}
                  </Typography>
                </Button>
              </Grid>
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
                    clientId="112890447494-ls135bmon2jbaj0mh3k0fnukugp9upkk.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={handleGoogleLogin}
                    onFailure={handleGoogleLogin}
                    className="loginButton"
                  />
                </Grid>
              )}
              {!mobile && (
                <Grid item>
                  <Button
                    size="small"
                    styles={buttonStyles}
                    disabled={leftRightSizes[0] === 0}
                    onClick={() => shiftLeftRightSizes(-1)}
                  >
                    <FirstPageIcon />
                  </Button>
                </Grid>
              )}
              {!mobile && (
                <Grid item>
                  <Button
                    size="small"
                    styles={buttonStyles}
                    disabled={leftRightSizes[1] === 0}
                    onClick={() => shiftLeftRightSizes(1)}
                  >
                    <LastPageIcon />
                  </Button>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </Slide>
    );
  }
}

export default withRouter(TopMenu);
