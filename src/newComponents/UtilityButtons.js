import React from 'react';
import PropTypes from 'prop-types';

class UtilityButtons extends React.Component {
  state = { openModal: false };

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
