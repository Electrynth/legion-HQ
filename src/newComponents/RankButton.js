import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const RankButton = ({
  classes,
  rank,
  rankCount,
  validRankCount,
  changeViewFilter
}) => (
  <Chip
    variant="outlined"
    onClick={() => changeViewFilter({ rank, type: 'UNIT' })}
    avatar={(
      <img
        alt={rank}
        className={classes[`${rank}Button`]}
        src={`/rankIcons/${rank}.svg`}
      />
    )}
    label={(
      <Typography
        color={validRankCount ? 'default' : 'secondary'}
      >
        {rankCount}
      </Typography>
    )}
  >
    {rankCount}
  </Chip>
);

RankButton.propTypes = {
  rank: PropTypes.string.isRequired,
  rankCount: PropTypes.number.isRequired,
  validRankCount: PropTypes.bool.isRequired,
  changeViewFilter: PropTypes.func.isRequired
};

export default RankButton;
