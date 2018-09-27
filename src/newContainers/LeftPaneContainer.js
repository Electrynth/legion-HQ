import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RankButton from 'newComponents/RankButton';
import UnitList from 'newComponents/UnitList';
import CommandChips from 'newComponents/CommandChips';
import NotesTextField from 'newComponents/NotesTextField';
import UtilityButtons from 'newComponents/UtilityButtons';

class LeftPaneContainer extends React.Component {
  state = {}

  render() {
    const {
      list,
      isMobile,
      copyUnit,
      removeUnit,
      removeUpgrade,
      moveUnitUp,
      moveUnitDown,
      changeViewFilter,
      resetView,
      removeCommand,
      changeListNotes
    } = this.props;
    const rankButtons = [
      'commander',
      'operative',
      'corps',
      'special',
      'support',
      'heavy'
    ];
    return (
      <Paper
        elevation={3}
        style={{
          padding: '0.5rem',
          height: 'calc(100vh - 5rem)',
          overflowY: 'scroll'
        }}
      >
        <div>
          <Grid
            item
            container
            spacing={8}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            {rankButtons.map((rank) => {
              return (
                <Grid item key={rank}>
                  <RankButton />
                </Grid>
              );
            })}
          </Grid>
          <UnitList
            list={list}
            isMobile={isMobile}
            copyUnit={copyUnit}
            removeUnit={removeUnit}
            removeUpgrade={removeUpgrade}
            moveUnitUp={moveUnitUp}
            moveUnitDown={moveUnitDown}
            changeViewFilter={changeViewFilter}
            resetView={resetView}
          />
          <CommandChips
            commands={list.commands}
            removeCommand={removeCommand}
            resetView={resetView}
          />
          <NotesTextField changeListNotes={changeListNotes} />
          <UtilityButtons
            list={list}
            resetView={resetView}
          />
        </div>
      </Paper>
    );
  }
}

LeftPaneContainer.propTypes = {
  list: PropTypes.shape({
    faction: PropTypes.string,
    mode: PropTypes.string,
    title: PropTypes.string,
    units: PropTypes.array,
    commands: PropTypes.array,
    notes: PropTypes.string,
    uniques: PropTypes.object
  }).isRequired,
  isMobile: PropTypes.string.isRequired,
  copyUnit: PropTypes.func.isRequired,
  removeUnit: PropTypes.func.isRequired,
  removeUpgrade: PropTypes.func.isRequired,
  moveUnitUp: PropTypes.func.isRequired,
  moveUnitDown: PropTypes.func.isRequired,
  changeViewFilter: PropTypes.func.isRequired,
  resetView: PropTypes.func.isRequired,
  removeCommand: PropTypes.func.isRequired,
  changeListNotes: PropTypes.func.isRequired
};

export default LeftPaneContainer;
