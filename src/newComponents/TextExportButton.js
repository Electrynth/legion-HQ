import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListText from 'newComponents/ListText';

class TextExportButton extends React.PureComponent {
  state = { openModal: false }

  render() {
    const { openModal } = this.state;
    const { list } = this.props;
    return (
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
          <Paper
            style={{
              position: 'relative',
              padding: '10px',
              top: '10%',
              left: 'calc(50% - 300px)',
              width: '600px',
              overflowY: 'scroll'
            }}
          >
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
    );
  }
}

TextExportButton.propTypes = {
  list: PropTypes.shape({
    faction: PropTypes.string,
    mode: PropTypes.string,
    title: PropTypes.string,
    units: PropTypes.array,
    commands: PropTypes.array,
    notes: PropTypes.string,
    uniques: PropTypes.object
  }).isRequired
};

export default TextExportButton;
