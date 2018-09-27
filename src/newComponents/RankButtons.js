import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

class RankButtons extends React.Component {
  state = {}

  render() {
    const {
      list,
      changeViewFilter
    } = this.props;
    const rankCounts = {
      commander: 0,
      operative: 0,
      corps: 0,
      special: 0,
      support: 0,
      heavy: 0
    };
    const rankIconStyles = {
      commander: {
        width: '28px',
        height: '28px',
        marginLeft: '5px'
      },
      operative: {
        width: '20px',
        height: '20px',
        marginLeft: '5px'
      },
      corps: {
        width: '20px',
        height: '20px',
        marginLeft: '5px'
      },
      special: {
        width: '35px',
        height: '35px',
        marginLeft: '5px'
      },
      support: {
        width: '20px',
        height: '20px',
        marginLeft: '5px'
      },
      heavy: {
        width: '35px',
        height: '35px',
        marginLeft: '5px'
      }
    };
    const rankButtons = Object.entries(rankCounts).map(([rank, rankCount]) => {
      const newViewFilter = {
        rank,
        type: 'UNIT'
      };
      let isValidCount = false;
      if (list.mode === 'standard') {
        switch (rank) {
          case 'commander':
            isValidCount = rankCount > 0 && rankCount < 3;
            break;
          case 'operative':
            isValidCount = rankCount < 3;
            break;
          case 'corps':
            isValidCount = rankCount > 2 && rankCount < 7;
            break;
          case 'special':
            isValidCount = rankCount < 4;
            break;
          case 'support':
            isValidCount = rankCount < 4;
            break;
          case 'heavy':
            isValidCount = rankCount < 2;
            break;
          default:
            isValidCount = true;
        }
      } else if (list.mode === 'grand army') {
        switch (rank) {
          case 'commander':
            isValidCount = rankCount > 0 && rankCount < 5;
            break;
          case 'operative':
            isValidCount = rankCount < 5;
            break;
          case 'corps':
            isValidCount = rankCount > 5 && rankCount < 11;
            break;
          case 'special':
            isValidCount = rankCount < 6;
            break;
          case 'support':
            isValidCount = rankCount < 6;
            break;
          case 'heavy':
            isValidCount = rankCount < 5;
            break;
          default:
            isValidCount = true;
        }
      }
      return (
        <Chip
          variant="outlined"
          onClick={() => changeViewFilter(newViewFilter)}
          avatar={(
            <img
              alt={rank}
              style={rankIconStyles[rank]}
              src={`/rankIcons/${rank}.svg`}
            />
          )}
          label={(
            <Typography
              color={isValidCount ? 'default' : 'secondary'}
            >
              {rankCount}
            </Typography>
          )}
        />
      );
    });
    return (
      <Grid
        item
        container
        spacing={8}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {rankButtons.map((rankButton, index) => (
          <Grid item key={}>
            {rankButton}
          </Grid>
        ))}
      </Grid>
    );
  }
}

RankButtons.propTypes = {
  list: PropTypes.shape({
    faction: PropTypes.string,
    mode: PropTypes.string,
    title: PropTypes.string,
    units: PropTypes.array,
    commands: PropTypes.array,
    notes: PropTypes.string,
    uniques: PropTypes.object
  }).isRequired,
  changeViewFilter: PropTypes.func.isRequired
};

export default RankButtons;
