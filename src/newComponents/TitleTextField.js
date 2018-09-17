import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const TitleTextField = ({ title, changeListTitle }) => (
  <TextField
    placeholder={title === '' ? 'Untitled' : title}
    onChange={changeListTitle}
  />
);

TitleTextField.propTypes = {
  title: PropTypes.string.isRequired,
  changeListTitle: PropTypes.func.isRequired
};

export default TitleTextField;
