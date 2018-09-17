import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const NotesTextField = ({ changeListNotes }) => (
  <TextField
    id="multiline-static"
    label="Notes"
    margin="normal"
    multiline
    fullWidth
    style={{ marginTop: '0px' }}
    onChange={changeListNotes}
  />
);

NotesTextField.propTypes = {
  changeListNotes: PropTypes.func.isRequired
};

export default NotesTextField;
