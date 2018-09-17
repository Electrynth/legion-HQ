import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import SideMenuListItem from 'components/SideMenuListItem';
import Title from 'components/Title';
import TopMenu from 'components/TopMenu';
import ListFooter from 'components/ListFooter';
import ViewChangeButton from 'components/ViewChangeButton';
import ViewCloseButton from 'components/ViewCloseButton';
import Title from 'newComponents/Title';
import MenuBar from 'newComponents/MenuBar';
import LeftPaneContainer from 'newContainers/LeftPaneContainer';
import RightPaneContainer from 'newContainers/RightPaneContainer';

const styles = {
  unitCount: {
    position: 'relative',
    display: 'inline-block',
    bottom: '200px',
    paddingRight: '5px'
  },
  fadeTransition: {
    display: 'inline-block'
  },
  viewButton: {
    zIndex: 1700,
    position: 'absolute',
    top: '4.75rem',
    right: '1rem'
  },
  grid: {
    paddingTop: '3rem'
  },
  paper: {
    padding: '0.5rem',
    height: 'calc(100vh - 5rem)',
    overflowY: 'scroll'
  },
  disabledCard: {
    borderRadius: '5px',
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  enabledCard: {
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 0 10px 0 #D1E3F9'
    }
  },
  viewCard: {
    borderRadius: '5px'
  },
  unitCardMedium: {
    maxWidth: '315px',
    maxHeight: '225px'
  },
  unitCardLarge: {
    maxWidth: '420px',
    maxHeight: '300px'
  },
  upgradeCardMedium: {
    maxWidth: '150px',
    maxHeight: '205px'
  },
  upgradeCardLarge: {
    maxWidth: '200px',
    maxHeight: '310px'
  },
  commandCardSmall: {
    maxWidth: '150px',
    maxHeight: '210px'
  },
  commandCardMedium: {
    maxWidth: '225px',
    maxHeight: '315px'
  },
  commandCardLarge: {
    maxWidth: '300px',
    maxHeight: '420px'
  },
  rankIcon: {
    width: '25px',
    height: '25px'
  },
  rankChipStyles: {
    marginRight: '5px'
  }
};

class BuilderContainer extends React.Component {
  constructor(props) {
    super(props);
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#BDBDBD'
        },
        secondary: {
          main: '#D50000'
        }
      }
    });
    const { faction, classes } = this.props;
    this.state = {
      classes,
      theme,
      list: {
        faction,
        mode: 'standard',
        title: '',
        units: [],
        commands: [
          {
            pips: 4,
            name: 'Standing Orders',
            commander: '',
            faction: '',
            product: ['swl01'],
            imageLocation: '/commands/Standing%20Orders.png',
            iconLocation: '/commandIcons/Standing%20Orders.png'
          }
        ],
        uniques: {},
        notes: ''
      },
      viewFilter: {
        type: 'LIST'
      }
    };
  }

  render() {
    const {
      list,
      viewFilter,
      classes,
      theme
    } = this.state;
    const {
      cards,
      unitsById,
      upgradesById,
      commandsById,
      width
    } = this.props;
    const isMobile = width === 'sm' || width === 'xs';
    return (
      <MuiThemeProvider theme={theme}>
        <Title faction={list.faction} />
        <MenuBar
          list={list}
          changeListMode={this.changeListMode}
          changeListTitle={this.changeListTitle}
        />
        <Grid
          container
          spacing={8}
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          className={classes.grid}
        >
          <Grid item xs={12} md={5}>
            <LeftPaneContainer
              list={list}
              isMobile={this.isMobile}
              copyUnit={this.copyUnit}
              removeUnit={this.removeUnit}
              removeUpgrade={this.removeUpgrade}
              moveUnitUp={this.moveUnitUp}
              moveUnitDown={this.moveUnitDown}
              changeViewFilter={this.changeViewFilter}
              resetView={this.resetView}
              removeCommand={this.removeCommand}
              changeListNotes={this.changeListNotes}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <RightPaneContainer />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

BuilderContainer.propTypes = {
  faction: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(BuilderContainer));
