import React from 'react';
import PropTypes from 'prop-types';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import LooksThreeIcon from '@material-ui/icons/Looks3';
import LooksFourIcon from '@material-ui/icons/Looks4';
import RemoveIcon from '@material-ui/icons/Remove';

class UtilityButtons extends React.Component {
  state = { openModal: false };

  getPipIcon = (pips) => {
    const styles = {
      width: '45px',
      height: '45px'
    };
    switch (pips) {
      case 1:
        return <LooksOneIcon style={styles} />;
      case 2:
        return <LooksTwoIcon style={styles} />;
      case 3:
        return <LooksThreeIcon style={styles} />;
      case 4:
        return <LooksFourIcon style={styles} />;
      default:
        return <RemoveIcon style={styles} />;
    }
  }

  render() {
    const {
      openModal
    } = this.state;
    return (
      <div>
        UtilityButtons
      </div>
    );
  }
}

UtilityButtons.propTypes = {

};

export default UtilityButtons;
