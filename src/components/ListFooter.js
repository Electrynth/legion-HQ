import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ListText from 'components/ListText';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withRouter } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

class ListFooter extends React.Component {
  state = {
    openModal: false,
    deleteDialog: false
  };

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

  handleOpenDeleteDialog = () => {
    this.setState({
      deleteDialog: true
    });
  }

  handleCloseDeleteDialog = () => {
    this.setState({
      deleteDialog: false
    });
  }

  render() {
    const {
      openModal,
      deleteDialog
    } = this.state;
    const {
      list,
      changeViewFilter,
      removeCommand,
      changeListNotes,
      user,
      isLoggedIn,
      handleSaveList,
      handleDeleteList
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
    let listIndex = -1;
    if ('listIndex' in list) listIndex = list.listIndex;
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
        <Dialog
          open={deleteDialog}
          onClose={this.handleCloseDeleteDialog}
        >
          <DialogTitle>Delete this list?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseDeleteDialog}>
              No
            </Button>
            <Button
              onClick={() => {
                handleDeleteList(listIndex);
                this.handleCloseDeleteDialog();
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
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
                          onClick={() => this.copyToClip(document.getElementById('listText').textContent)}
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
              <IconButton color="inherit">
                <SaveIcon
                  disabled={isLoggedIn}
                  onClick={() => handleSaveList(list, listIndex)}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="inherit">
                <LinkIcon disabled={isLoggedIn} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                disabled={listIndex === -1}
                onClick={this.handleOpenDeleteDialog}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(ListFooter);
