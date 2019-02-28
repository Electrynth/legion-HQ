import React from 'react';
import domtoimage from 'dom-to-image';
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
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { withRouter } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import ListImage from 'components/ListImage';
import Typography from '@material-ui/core/Typography';
import Brightness1Icon from '@material-ui/icons/Brightness1';

class ListFooter extends React.Component {
  state = {
    openModal: false,
    openSnackbar: false,
    snackbarContent: '',
    openImageModal: false
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

  addImageToNode = () => {
    const node = document.getElementById('listToImage');
    const image = new Image();
    domtoimage.toPng(node).then((dataUrl) => {
      image.src = dataUrl;
      this.setState({ dataUrl });
      document.getElementById('listImage').appendChild(image);
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    const {
      openModal,
      openImageModal,
      dataUrl
    } = this.state;
    const {
      list,
      changeListNotes,
      changeViewFilter,
      removeCommand,
      userId,
      createList,
      updateList,
      removeBattleCard,
      darkMode
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
                      style={{
                        marginRight: '5px',
                        marginBottom: '5px',
                        backgroundColor: darkMode ? '#848484' : undefined
                      }}
                    />
                  </Grid>
                );
              }
              return (
                <Grid item key={command.name}>
                  <Chip
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
                    style={{
                      marginRight: '5px',
                      marginBottom: '5px',
                      backgroundColor: darkMode ? '#848484' : undefined
                    }}
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
                  style={{
                    marginRight: '5px',
                    marginBottom: '10px',
                    backgroundColor: darkMode ? '#848484' : undefined
                  }}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {list.objectiveCards.map((objective, index) => (
              <Grid item key={objective}>
                <Chip
                  avatar={(
                    <Avatar style={{ backgroundColor: darkMode ? '#848484' : undefined }}>
                      <Brightness1Icon style={{ color: '#244C80' }} />
                    </Avatar>
                  )}
                  label={objective}
                  onClick={() => changeViewFilter({ objective, type: 'OBJECTIVE_VIEW' })}
                  onDelete={() => removeBattleCard('objective', index)}
                  style={{
                    marginRight: '5px',
                    marginBottom: '5px',
                    backgroundColor: darkMode ? '#848484' : undefined
                  }}
                />
              </Grid>
            ))}
            {list.objectiveCards.length < 4 && (
              <Grid item key="addObjective">
                <Chip
                  variant="outlined"
                  label="Add Objective"
                  onClick={() => changeViewFilter({ type: 'OBJECTIVE' })}
                  style={{
                    marginRight: '5px',
                    marginBottom: '5px',
                    backgroundColor: darkMode ? '#848484' : undefined
                  }}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {list.deploymentCards.map((deployment, index) => (
              <Grid item key={deployment}>
                <Chip
                  avatar={(
                    <Avatar style={{ backgroundColor: darkMode ? '#848484' : undefined }}>
                      <Brightness1Icon style={{ color: '#812F31' }} />
                    </Avatar>
                  )}
                  label={deployment}
                  onClick={() => changeViewFilter({ deployment, type: 'DEPLOYMENT_VIEW' })}
                  onDelete={() => removeBattleCard('deployment', index)}
                  style={{
                    marginRight: '5px',
                    marginBottom: '5px',
                    backgroundColor: darkMode ? '#848484' : undefined
                  }}
                />
              </Grid>
            ))}
            {list.deploymentCards.length < 4 && (
              <Grid item key="addDeployment">
                <Chip
                  variant="outlined"
                  label="Add Deployment"
                  onClick={() => changeViewFilter({ type: 'DEPLOYMENT' })}
                  style={{
                    marginRight: '5px',
                    marginBottom: '5px',
                    backgroundColor: darkMode ? '#848484' : undefined
                  }}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {list.conditionCards.map((condition, index) => (
              <Grid item key={condition}>
                <Chip
                  avatar={(
                    <Avatar style={{ backgroundColor: darkMode ? '#848484' : undefined }}>
                      <Brightness1Icon style={{ color: '#35653A' }} />
                    </Avatar>
                  )}
                  label={condition}
                  onClick={() => changeViewFilter({ condition, type: 'CONDITION_VIEW' })}
                  onDelete={() => removeBattleCard('condition', index)}
                  style={{
                    marginRight: '5px',
                    marginBottom: '5px',
                    backgroundColor: darkMode ? '#848484' : undefined
                  }}
                />
              </Grid>
            ))}
            {list.conditionCards.length < 4 && (
              <Grid item key="addCondition">
                <Chip
                  variant="outlined"
                  label="Add Condition"
                  onClick={() => changeViewFilter({ type: 'CONDITION' })}
                  style={{
                    marginRight: '5px',
                    marginBottom: '5px',
                    backgroundColor: darkMode ? '#848484' : undefined
                  }}
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
                    <IconButton
                      color="inherit"
                      style={{
                        color: darkMode ? '#e0e0e0' : undefined
                      }}
                    >
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
                  style={{
                    color: darkMode ? '#e0e0e0' : undefined
                  }}
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
                          style={{
                            color: darkMode ? '#e0e0e0' : undefined
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
              <div>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    this.setState({ openImageModal: true });
                  }}
                  style={{
                    color: darkMode ? '#e0e0e0' : undefined
                  }}
                >
                  <PhotoCameraIcon />
                </IconButton>
                <Modal
                  aria-labelledby="image-export-modal"
                  aria-describedby="image-export-modal"
                  open={openImageModal}
                  onClose={() => this.setState({ dataUrl: undefined, openImageModal: false })}
                  style={{
                    zIndex: '99999'
                  }}
                >
                  <Paper
                    style={{
                      position: 'absolute',
                      top: '5%',
                      left: 'calc(50% - 320px)',
                      minWidth: '640px',
                      maxWidth: '1280px',
                      overflow: 'scroll',
                      maxHeight: '90vh'
                    }}
                  >
                    <Grid
                      container
                      direction="column"
                      justify="center"
                    >
                      <Grid item>
                        <ListImage list={list} />
                      </Grid>
                      {!dataUrl && (
                        <Grid
                          item
                          container
                          justify="center"
                          alignItems="center"
                        >
                          <Grid item>
                            <Button
                              variant="contained"
                              onClick={() => this.addImageToNode()}
                            >
                              Generate image below
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                      {dataUrl && (
                        <Grid item>
                          <Typography>
                            Image is below
                          </Typography>
                        </Grid>
                      )}
                      <Grid item>
                        <div id="listImage" />
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
                style={{
                  color: darkMode ? (!userId ? '#636363' : '#e0e0e0') : undefined
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
                style={{
                  color: darkMode ? (!list._id ? '#636363' : '#e0e0e0') : undefined
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
