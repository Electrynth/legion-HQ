import React from 'react';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import ClearIcon from '@material-ui/icons/Clear';

const ViewCloseButton = ({ isVisible, clickHandler, className }) => (
  <Zoom
    unmountOnExit
    timeout={250}
    in={isVisible}
  >
    <Button
      variant="fab"
      color="secondary"
      className={className}
      onClick={clickHandler}
    >
      <ClearIcon />
    </Button>
  </Zoom>
);

export default ViewCloseButton;
