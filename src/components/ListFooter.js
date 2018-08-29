import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import LooksThreeIcon from '@material-ui/icons/Looks3';
import LooksFourIcon from '@material-ui/icons/Looks4';
import RemoveIcon from '@material-ui/icons/Remove';
import CancelIcon from '@material-ui/icons/Cancel';

class ListFooter extends React.Component {
  state = {};

  getPipIcon = (pips) => {
    const styles = {
      width: '45px',
      height: '45px'
    };
    switch (pips) {
      case 1:
        return <LooksOneIcon style={styles} />;
      case 2:
        return <LooksTwoIcon style={styles} />;
      case 3:
        return <LooksThreeIcon style={styles} />;
      case 4:
        return <LooksFourIcon style={styles} />;
      default:
        return <RemoveIcon style={styles} />;
    }
  }

  render() {
    const { list, changeViewFilter, removeCommand } = this.props;
    const sortedCommands = list.commands;
    const commandIconStyles = {
      width: '65px',
      height: '65px',
      marginRight: '5px',
      borderRadius: '5px',
      cursor: 'pointer'
    };
    const pipIconStyles = {
      marginTop: '75px',
      marginRight: '100px'
    };
    return (
      <Grid
        container
        spacing={8}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {sortedCommands.map((command, commandIndex) => {
            return (
              <Grid item key={command.name}>
                <Chip
                  color="primary"
                  avatar={<Avatar>{this.getPipIcon(command.pips)}</Avatar>}
                  label={command.name}
                  onClick={() => changeViewFilter({ command, type: 'COMMAND_VIEW' })}
                  onDelete={() => removeCommand({ commandIndex })}
                  style={{ marginRight: '5px' }}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item>
          <TextField
            id="multiline-static"
            label="Notes"
            margin="none"
            multiline
            fullWidth
          />
        </Grid>
      </Grid>
    );
  }
}

export default ListFooter;
