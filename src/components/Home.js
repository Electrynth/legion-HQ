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
import Grow from '@material-ui/core/Grow';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShareIcon from '@material-ui/icons/Share';
import HttpsIcon from '@material-ui/icons/Https';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import PaletteIcon from '@material-ui/icons/Palette';
import BuildIcon from '@material-ui/icons/Build';
import BugReportIcon from '@material-ui/icons/BugReport';
import EmailIcon from '@material-ui/icons/Email';

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
  width: '10rem',
  height: 'auto',
  cursor: 'pointer'
};

const rebelsIconStyles = {
  ...factionIconStyles
};

const empireIconStyles = {
  ...factionIconStyles
};

const Home = ({ history }) => (
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
            src="/faction/rebelsIconBlack.svg"
            style={rebelsIconStyles}
            onClick={() => history.push('/rebels')}
          />
          <List dense>
          </List>
        </Grid>
        <Grid item>
          <Avatar
            src="/faction/empireIconBlack.svg"
            style={empireIconStyles}
            onClick={() => history.push('/empire')}
          />
          <List dense>
          </List>
        </Grid>
      </Grid>
      <Grid item>
        <Paper style={paperStyles}>
          <Typography variant="headline">
            <BuildIcon style={{ marginRight: '10px' }} />
            Under development
            <BuildIcon style={{ marginLeft: '10px' }} />
          </Typography>
          <Typography variant="caption">
            Features to come!
          </Typography>
          <List
            dense
            style={listStyles}
          >
            <ListItem>
              <ListItemIcon>
                <PrintIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Printing lists" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ListAltIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="List text export" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ShareIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="List URL sharing" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HttpsIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="HTTPS" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="User accounts" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SaveIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Saving lists" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Brightness4Icon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Night mode" />
            </ListItem>
          </List>
          <Grid
            container
            spacing={8}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Button
                href="https://github.com/NicholasCBrown/legion-HQ"
                variant="contained"
                size="small"
              >
                <BugReportIcon style={{ marginRight: '10px' }} />
                Github
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
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
