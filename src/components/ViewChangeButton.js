import React from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const ViewChangeButton = ({
  actions,
  isVisible,
  isClicked,
  clickHandler,
  changeView,
  className
}) => (
  <div className={className}>
    <SpeedDial
      ariaLabel="View Change Button"
      direction="down"
      icon={<SpeedDialIcon />}
      transitionDuration={250}
      onClick={clickHandler}
      hidden={!isVisible}
      open={isClicked && isVisible}
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => changeView(action.viewFilter)}
        />
      ))}
    </SpeedDial>
  </div>
);

export default ViewChangeButton;
