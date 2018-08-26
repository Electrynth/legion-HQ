import React from 'react';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class TopMenu extends React.Component {
  state = {};

  render() {
    const { list } = this.props;
    const avatarStyles = {
      margin: '0 1.2rem 0 1rem',
      width: 30,
      height: 30
    };
    const textInputStyles = {
      width: '10vw'
    };
    let pointTotal = 0;
    list.units.forEach((unit) => {
      pointTotal += unit.totalCost;
    });
    const factionIconLocation = list.faction === 'rebels' ? '/faction/rebelsIconWhite.svg' : '/faction/empireIconWhite.svg';
    return (
      <Slide
        in
        mountOnEnter
        unmountOnExit
        direction="down"
        timeout={750}
      >
        <AppBar position="fixed" color="primary">
          <Toolbar variant="dense">
            <Avatar style={avatarStyles} src={factionIconLocation} />
            <TextField
              style={textInputStyles}
              placeholder={list.title === '' ? 'Untitled' : list.title}
              inputProps={{
                style: {
                  color: 'white'
                }
              }}
            />
            <Typography
              color="error"
              variant="subheading"
            >
              {`${pointTotal}/800`}
            </Typography>
            <div style={{ flexGrow: 1 }} />
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
          </Toolbar>
        </AppBar>
      </Slide>
    );
  }
}

export default TopMenu;
