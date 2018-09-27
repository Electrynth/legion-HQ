import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const ListModeButton = ({
  pointTotal,
  currentMode,
  toggleListMode
}) => (
  <Button
    mini
    variant="contained"
    color="inherit"
    onClick={toggleListMode}
    style={{
      marginLeft: '0.5rem'
    }}
  >
    <Typography noWrap variant="body2">
      {`${pointTotal}/${currentMode === 'standard' ? 800 : 1600} ${currentMode}`}
    </Typography>
  </Button>
);

ListModeButton.propTypes = {
  pointTotal: PropTypes.number.isRequired,
  currentMode: PropTypes.string.isRequired,
  toggleListMode: PropTypes.func.isRequired
};

export default ListModeButton;
