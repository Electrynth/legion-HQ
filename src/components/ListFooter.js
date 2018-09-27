import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ListText from 'components/ListText';
import Modal from '@material-ui/core/Modal';
import PrintIcon from '@material-ui/icons/Print';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import { withRouter } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

class ListFooter extends React.Component {
  state = { openModal: false };

  render() {
    const {
      openModal
    } = this.state;
    const {
      list,
      changeViewFilter,
      removeCommand,
      changeListNotes
    } = this.props;
    const sortedCommands = list.commands;
    const modalStyles = {
      position: 'relative',
      padding: '10px',
      top: '10%',
      left: 'calc(50% - 300px)',
      width: '600px',
      overflowY: 'scroll'
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
                  </Grid>
                </Paper>
              </Modal>
            </div>
          </Grid>
          <Grid item>
            <IconButton disabled color="inherit">
              <SaveIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton disabled color="inherit">
              <LinkIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton disabled color="inherit">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(ListFooter);
