import React from 'react';
import Grid from '@material-ui/core/Grid';

class ListFooter extends React.Component {
  state = {};

  render() {
    const { list } = this.props;
    const sortedCommands = list.commands;
    sortedCommands.sort((c1, c2) => c1.pips - c2.pips);
    console.log(sortedCommands);
    return (
      <Grid
        container
        spacing={8}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>

        </Grid>
        <Grid item>
        </Grid>
      </Grid>
    );
  }
}

export default ListFooter;
