import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ListText from 'components/ListText';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import PrintIcon from '@material-ui/icons/Print';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SaveIcon from '@material-ui/icons/Save';
import LinkIcon from '@material-ui/icons/Link';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withRouter } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Snackbar from '@material-ui/core/Snackbar';

class ListFooter extends React.Component {
  state = {
    openModal: false,
    openSnackbar: false,
    snackbarContent: ''
  };

  openSnackbar = (message) => {
    this.setState({
      openSnackbar: true,
      snackbarContent: message
    });
  }

  closeSnackbar = () => {
    this.setState({
      openSnackbar: false,
      snackbarContent: ''
    });
  }

  copyToClip = (str) => {
    const listener = (e) => {
      e.clipboardData.setData('text/html', str);
      e.clipboardData.setData('text/plain', str);
      e.preventDefault();
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

  render() {
    const {
      openModal
    } = this.state;
    const {
      list,
      changeListNotes,
      changeViewFilter,
      removeCommand,
      userId,
      createList,
      updateList
    } = this.props;
    const sortedCommands = list.commands;
    const modalStyles = {
      position: 'relative',
      padding: '10px',
      top: '10%',
      left: 'calc(50% - 25vw)',
      width: '50vw',
      overflowY: 'scroll',
      maxHeight: '75vh'
    };
    let pointTotal = 0;
    list.units.forEach((unit) => {
      let unitTotal = 0;
      switch (unit.rank) {
        case 'commander':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          break;
        case 'operative':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          break;
        case 'corps':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          break;
        case 'special':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          break;
        case 'support':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          break;
        case 'heavy':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          break;
        default:
      }
      list.pointTotal = pointTotal;
      if (list.title === '') list.title = 'Untitled';
    });
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={this.state.openSnackbar}
          autoHideDuration={3000}
          onClose={this.closeSnackbar}
          message={this.state.snackbarContent}
          action={(
            <IconButton
              key="close"
              color="inherit"
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          )}
        />
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
              if (command.name === 'Standing Orders') {
                return (
                  <Grid item key={command.name}>
                    <Chip
                      color="primary"
                      avatar={(
                        <Avatar
                          style={{
                            width: '45px',
                            height: '45px'
                          }}
                        >
                          <img
                            alt={command.name}
                            src={command.iconLocation}
                            style={{
                              width: '45px',
                              height: '45px'
                            }}
                          />
                        </Avatar>
                      )}
                      label={`${command.name} (${command.pips})`}
                      onClick={() => changeViewFilter({ command, type: 'COMMAND_VIEW' })}
                      style={{ marginRight: '5px' }}
                    />
                  </Grid>
                );
              }
              return (
                <Grid item key={command.name}>
                  <Chip
                    color="primary"
                    avatar={(
                      <Avatar
                        style={{
                          width: '45px',
                          height: '45px'
                        }}
                      >
                        <img
                          alt={command.name}
                          src={command.iconLocation}
                          style={{
                            width: '45px',
                            height: '45px'
                          }}
                        />
                      </Avatar>
                    )}
                    label={`${command.name} (${command.pips})`}
                    onClick={() => changeViewFilter({ command, type: 'COMMAND_VIEW' })}
                    onDelete={() => removeCommand(commandIndex)}
                    style={{ marginRight: '5px' }}
                  />
                </Grid>
              );
            })}
            {sortedCommands.length < 7 && (
              <Grid item key="addCommand">
                <Chip
                  variant="outlined"
                  label="Add Command"
                  onClick={() => changeViewFilter({ type: 'COMMAND' })}
                  style={{ marginRight: '5px', marginBottom: '10px' }}
                />
              </Grid>
            )}
          </Grid>
          <Grid item>
            <TextField
              id="multiline-static"
              label="Notes"
              margin="normal"
              multiline
              fullWidth
              value={list.notes}
              style={{ marginTop: '0px' }}
              onChange={changeListNotes}
            />
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <div>
                <ReactToPrint
                  trigger={() => (
                    <IconButton color="inherit">
                      <PrintIcon />
                    </IconButton>
                  )}
                  content={() => this.componentRef}
                />
                <div style={{ display: 'none' }}>
                  <ListText ref={el => (this.componentRef = el)} list={list} />
                </div>
              </div>
            </Grid>
            <Grid item>
              <div>
                <IconButton
                  color="inherit"
                  onClick={() => this.setState({ openModal: true })}
                >
                  <ListAltIcon />
                </IconButton>
                <Modal
                  aria-labelledby="text-export-modal"
                  aria-describedby="text-export-modal"
                  open={openModal}
                  onClose={() => this.setState({ openModal: false })}
                  style={{ zIndex: '99999' }}
                >
                  <Paper style={modalStyles}>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <ListText list={list} />
                      </Grid>
                      <Grid item>
                        <Divider />
                      </Grid>
                      <Grid item>
                        <IconButton
                          variant="contained"
                          onClick={() => {
                            this.copyToClip(document.getElementById('listText').textContent);
                            this.openSnackbar('Text copied to clipboard.');
                          }}
                        >
                          <FileCopyIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                </Modal>
              </div>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                disabled={!userId}
                onClick={() => {
                  if (userId && userId === list.userId) {
                    updateList();
                    this.openSnackbar('List updated.');
                  } else {
                    createList();
                    this.openSnackbar('List created.');
                  }
                }}
              >
                <SaveIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                disabled={!list._id}
                onClick={() => {
                  this.copyToClip(`http://legion-hq.com/list/${list._id}`);
                  this.openSnackbar('Link copied to clipboard.');
                }}
              >
                <LinkIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(ListFooter);
