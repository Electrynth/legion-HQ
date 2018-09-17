import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

const FactionIcon = ({ faction }) => (
  <Avatar
    src={
      faction === 'rebels' ? '/faction/rebelsIconBlack.svg'
        : '/faction/empireIconBlack.svg'
    }
    style={{
      margin: '0 1.2rem 0 1rem',
      width: 30,
      height: 30
    }}
  />
);

FactionIcon.propTypes = {
  faction: PropTypes.string.isRequired
};

export default FactionIcon;
