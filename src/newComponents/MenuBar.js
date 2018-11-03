import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import FactionIcon from 'newComponents/FactionIcon';
import TitleTextField from 'newComponents/TitleTextField';
import ListModeButton from 'newComponents/ListModeButton';

const calculatePointTotal = (list) => {
  let pointTotal = 0;
  list.units.forEach((unit) => {
    pointTotal += unit.totalCost;
  });
  return pointTotal;
};

const MenuBar = ({
  list,
  changeListTitle,
  toggleListMode
}) => (
  <AppBar position="fixed" color="primary">
    <Toolbar variant="dense">
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item>
          <FactionIcon faction={list.faction} />
        </Grid>
        <Grid item>
          <TitleTextField
            title={list.title}
            changeListTitle={changeListTitle}
          />
        </Grid>
        <Grid item>
          <ListModeButton
            pointTotal={calculatePointTotal(list)}
            currentMode={list.mode}
            toggleListMode={toggleListMode}
          />
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

MenuBar.propTypes = {
  list: PropTypes.shape({
    faction: PropTypes.string,
    mode: PropTypes.string,
    title: PropTypes.string,
    units: PropTypes.array,
    commands: PropTypes.array,
    notes: PropTypes.string,
    uniques: PropTypes.object
  }).isRequired,
  toggleListMode: PropTypes.func.isRequired,
  changeListTitle: PropTypes.func.isRequired
};

export default MenuBar;
