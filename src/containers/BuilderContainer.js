import React from 'react';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import SideMenuListItem from 'components/SideMenuListItem2';
import SideMenuListItemMobile from 'components/SideMenuListItem';
import Title from 'components/Title';
import TopMenu from 'components/TopMenu';
import ListFooter from 'components/ListFooter';
import ViewCloseButton from 'components/ViewCloseButton';

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
  unitCardSmall: {
    maxWidth: '280px',
    maxHeight: '200px'
  },
  unitCardMedium: {
    maxWidth: '350px',
    maxHeight: '250px'
  },
  unitCardLarge: {
    maxWidth: '420px',
    maxHeight: '300px'
  },
  upgradeCardSmall: {
    maxWidth: '130px',
    maxHeight: '200px'
  },
  upgradeCardMedium: {
    maxWidth: '160px',
    maxHeight: '250px'
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
    const { faction, classes } = this.props;
    const defaultTheme = createMuiTheme({
      palette: {
        primary: {
          main: '#BDBDBD'
        },
        secondary: {
          main: '#D50000'
        }
      }
    });
    this.state = {
      classes,
      defaultTheme,
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
        notes: '',
        pointTotal: 0
      },
      isViewMenuOpen: false,
      viewFilter: {
        type: 'LIST'
      }
    };
  }

  getTransitionDuration = (index) => {
    if (index < 10) return 250 + index * 50;
    return 500;
  }

  getCardStyles = (cardType, eligibility, classes) => {
    const activeClasses = [];
    if (cardType === 'UNIT') {
      if (eligibility === 'VIEW_ONLY') activeClasses.push(classes.unitCardLarge);
      else if (eligibility === 'EQUIPPABLE') activeClasses.push(classes.unitCardMedium);
      else if (eligibility === 'DISABLED') activeClasses.push(classes.unitCardMedium);
      else activeClasses.push(classes.unitCardSmall);
    } else if (cardType === 'UPGRADE') {
      if (eligibility === 'VIEW_ONLY') activeClasses.push(classes.upgradeCardLarge);
      else if (eligibility === 'EQUIPPABLE') activeClasses.push(classes.upgradeCardMedium);
      else if (eligibility === 'DISABLED') activeClasses.push(classes.upgradeCardMedium);
      else activeClasses.push(classes.upgradeCardSmall);
    } else if (cardType === 'COMMAND') {
      if (eligibility === 'VIEW_ONLY') activeClasses.push(classes.commandCardLarge);
      else if (eligibility === 'LIST_VIEW') activeClasses.push(classes.commandCardSmall);
      else activeClasses.push(classes.commandCardMedium);
    }
    if (eligibility === 'VIEW_ONLY') activeClasses.push(classes.viewCard);
    else if (eligibility === 'LIST_VIEW') activeClasses.push(classes.viewCard);
    else if (eligibility === 'DISABLED') activeClasses.push(classes.disabledCard);
    else activeClasses.push(classes.enabledCard);
    return activeClasses.join(' ');
  }

  getUpgradeEligibility = (upgrade) => {
    // viewFilter: { unitIndex, upgradeType, type: 'UPGRADE' }
    const { list, viewFilter } = this.state;
    const unit = list.units[viewFilter.unitIndex];
    if (viewFilter.type === 'UPGRADE_VIEW') {
      if (viewFilter.upgrade.id === upgrade.id) return 'VIEW_ONLY';
      return 'HIDDEN';
    }
    if (viewFilter.type !== 'UPGRADE') return 'HIDDEN';
    if (!this.isValidFaction(upgrade, list)) return 'HIDDEN';
    if (upgrade.type !== viewFilter.upgradeType) return 'HIDDEN';
    if (this.isUniqueAlreadyExist(upgrade, list)) return 'DISABLED';
    let isDuplicate = false;
    unit.upgradesEquipped.forEach((equipped) => {
      if (equipped && equipped.id === upgrade.id) isDuplicate = true;
    });
    if (isDuplicate) return 'DISABLED';
    const unitTags = [
      unit.name,
      unit.faction,
      unit.type,
      unit.rank
    ];
    const forceFaction = {
      rebels: 'light side',
      empire: 'dark side',
      '': ''
    };
    let requirementsMet = 0;
    upgrade.requirements.forEach((requirement) => {
      let matched = false;
      unitTags.forEach((tag) => {
        if (tag.includes(requirement)) matched = true;
        if (requirement === forceFaction[unit.faction]) matched = true;
      });
      if (matched) requirementsMet += 1;
    });
    return requirementsMet === upgrade.requirements.length ? 'EQUIPPABLE' : 'DISABLED';
  }

  getUnitEligibility = (unit) => {
    // viewFilter: { rank, type: 'UNIT' }
    const { list, viewFilter } = this.state;
    if (viewFilter.type === 'UNIT_VIEW') {
      if (list.units[viewFilter.unitIndex].id === unit.id) return 'VIEW_ONLY';
      return 'HIDDEN';
    }
    if (viewFilter.type !== 'UNIT') return 'HIDDEN';
    if (!this.isValidFaction(unit, list)) return 'HIDDEN';
    if (unit.rank !== viewFilter.rank) return 'HIDDEN';
    if (this.isUniqueAlreadyExist(unit, list)) return 'DISABLED';
    return 'EQUIPPABLE';
  }

  getCommandEligibility = (command) => {
    // viewFilter: { type: 'COMMAND' }
    const { list, viewFilter } = this.state;
    if (viewFilter.type === 'COMMAND_VIEW') {
      if (viewFilter.command.name === command.name) return 'VIEW_ONLY';
      return 'HIDDEN';
    }
    if (viewFilter.type !== 'COMMAND') return 'HIDDEN';
    if (!this.isValidFaction(command, list)) return 'HIDDEN';
    if (list.commands.length === 7) return 'DISABLED';
    if (this.isUniqueAlreadyExist(command, list)) return 'DISABLED';
    if (command.commander !== '') {
      let isCommanderPresent = false;
      list.units.forEach((unit) => {
        if (command.commander === unit.name) isCommanderPresent = true;
      });
      if (!isCommanderPresent) return 'DISABLED';
    }
    return 'EQUIPPABLE';
  }

  getUpgradeOptions = (list) => {
    const availableOptions = {
      'heavy weapon': {
        name: 'Heavy weapon',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'heavy weapon'
        },
        icon: (
          <img
            alt="Heavy Weapon"
            src="/upgradeTypeIcons/heavy%20weapon.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      },
      personnel: {
        name: 'Personnel',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'personnel'
        },
        icon: (
          <img
            alt="Personnel"
            src="/upgradeTypeIcons/personnel.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      },
      force: {
        name: 'Force',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'force'
        },
        icon: (
          <img
            alt="Force"
            src="/upgradeTypeIcons/force.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      },
      command: {
        name: 'Command',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'command'
        },
        icon: (
          <img
            alt="Command"
            src="/upgradeTypeIcons/command.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      },
      hardpoint: {
        name: 'Hardpoint',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'hardpoint'
        },
        icon: (
          <img
            alt="Hardpoint"
            src="/upgradeTypeIcons/hardpoint.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      },
      gear: {
        name: 'Gear',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'gear'
        },
        icon: (
          <img
            alt="Gear"
            src="/upgradeTypeIcons/gear.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      },
      grenades: {
        name: 'Grenades',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'grenades'
        },
        icon: (
          <img
            alt="Grenades"
            src="/upgradeTypeIcons/grenades.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      },
      comms: {
        name: 'Comms',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'comms'
        },
        icon: (
          <img
            alt="Comms"
            src="/upgradeTypeIcons/comms.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      },
      pilot: {
        name: 'Pilot',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'pilot'
        },
        icon: (
          <img
            alt="Pilot"
            src="/upgradeTypeIcons/pilot.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      },
      training: {
        name: 'Training',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'training'
        },
        icon: (
          <img
            alt="Training"
            src="/upgradeTypeIcons/training.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      },
      generator: {
        name: 'Generator',
        viewFilter: {
          type: 'UPGRADE',
          upgradeType: 'generator'
        },
        icon: (
          <img
            alt="Generator"
            src="/upgradeTypeIcons/generator.svg"
            style={{ width: '30px', height: '30px' }}
          />
        )
      }
    };
    const allUpgradeOptions = [];
    list.units.forEach((unit) => {
      const upgradeOptions = [];
      unit.upgradeBar.forEach((upgradeType, upgradeIndex) => {
        if (!unit.upgradesEquipped[upgradeIndex]) {
          upgradeOptions.push({
            action: this.changeViewFilter,
            ...availableOptions[upgradeType]
          });
        } else upgradeOptions.push(null);
      });
      allUpgradeOptions.push(upgradeOptions);
    });
    return allUpgradeOptions;
  }

  getMenuOptions = (list) => {
    const availableOptions = [
      {
        name: 'Move Up',
        action: this.moveUnitUp,
        icon: <ArrowUpwardIcon />
      },
      {
        name: 'Move Down',
        action: this.moveUnitDown,
        icon: <ArrowDownwardIcon />
      },
      {
        name: 'Copy',
        action: this.copyUnit,
        icon: <FileCopyIcon />
      },
      {
        name: 'Delete',
        action: this.removeUnit,
        icon: <ClearIcon />
      }
    ];
    const allMenuOptions = [];
    list.units.forEach((unit, index) => {
      const menuOptions = [];
      if (index > 0) menuOptions.push(availableOptions[0]);
      if (index < list.units.length - 1) menuOptions.push(availableOptions[1]);
      if (this.unitHasNoUniques(unit)) menuOptions.push(availableOptions[2]);
      menuOptions.push(availableOptions[3]);
      allMenuOptions.push(menuOptions);
    });
    return allMenuOptions;
  }

  getUnitString = (unit) => {
    let unitString = unit.name;
    unit.upgradesEquipped.forEach((upgrade) => {
      if (upgrade) unitString = unitString.concat(upgrade.name);
    });
    return unitString;
  }

  getUnitStringIndex = (unitString) => {
    const { list } = this.state;
    let index = -1;
    list.units.forEach((unit, unitIndex) => {
      const targetUnitString = this.getUnitString(unit);
      if (index === -1 && targetUnitString === unitString) index = unitIndex;
    });
    return index;
  }

  addCard = (eligibility, type, cardId, cards) => {
    if (eligibility !== 'EQUIPPABLE') return;
    const { list, viewFilter } = this.state;
    const card = JSON.parse(JSON.stringify(cards[cardId]));
    let unitString; let unitStringIndex;
    let oldUnit; let newUnit;
    let newUnitString; let newUnitStringIndex;
    switch (type) {
      case 'UNIT':
        unitString = this.getUnitString(card);
        unitStringIndex = this.getUnitStringIndex(unitString);
        if (unitStringIndex > -1) {
          list.units[unitStringIndex].count += 1;
        } else {
          card.count = 1;
          list.units.push(card);
        }
        break;
      case 'UPGRADE':
        oldUnit = list.units[viewFilter.unitIndex];
        newUnit = JSON.parse(JSON.stringify(oldUnit));
        newUnit.upgradesEquipped[viewFilter.upgradeIndex] = card;
        newUnit.count = 1;
        newUnitString = this.getUnitString(newUnit);
        newUnitStringIndex = this.getUnitStringIndex(newUnitString);
        if (newUnitStringIndex > -1) {
          if (oldUnit.count === 1) {
            list.units[newUnitStringIndex].count += 1;
            list.units.splice(viewFilter.unitIndex, 1);
          } else {
            oldUnit.count -= 1;
            list.units[newUnitStringIndex].count += 1;
          }
        } else if (oldUnit.count === 1) {
          oldUnit.upgradesEquipped[viewFilter.upgradeIndex] = card;
        } else {
          oldUnit.count -= 1;
          list.units.push(newUnit);
        }
        break;
      case 'COMMAND':
        list.commands.push(card);
        list.commands.sort((c1, c2) => c1.pips - c2.pips);
        list.uniques[cardId] = true;
        break;
      default:
    }
    if (card.isUnique) list.uniques[cardId] = true;
    this.setState({ list }, this.resetView());
  }

  removeUpgrade = (unitIndex, upgradeIndex) => {
    const { list } = this.state;
    const oldUnit = list.units[unitIndex];
    const newUnit = JSON.parse(JSON.stringify(oldUnit));
    newUnit.upgradesEquipped[upgradeIndex] = null;
    newUnit.count = 1;
    const newUnitString = this.getUnitString(newUnit);
    const newUnitStringIndex = this.getUnitStringIndex(newUnitString);
    if (newUnitStringIndex > -1) {
      if (oldUnit.count === 1) {
        list.units[newUnitStringIndex].count += 1;
        list.units.splice(unitIndex, 1);
      } else {
        list.units[unitIndex].count -= 1;
        list.units[newUnitStringIndex].count += 1;
      }
    } else if (oldUnit.count === 1) {
      if (oldUnit.upgradesEquipped[upgradeIndex].id in list.uniques) {
        list.uniques[oldUnit.upgradesEquipped[upgradeIndex].id] = false;
      }
      list.units[unitIndex].upgradesEquipped[upgradeIndex] = null;
    } else {
      list.units[unitIndex].count -= 1;
      list.units.push(newUnit);
    }
    this.setState({ list });
  }

  copyUnit = (unitIndex) => {
    const { list } = this.state;
    list.units[unitIndex].count += 1;
    this.setState({ list });
  }

  removeUnit = (unitIndex) => {
    const { list } = this.state;
    const unit = list.units[unitIndex];
    const newCommands = [];
    list.commands.forEach((command) => {
      if (command.commander === unit.name) list.uniques[command.id] = false;
      else newCommands.push(command);
    });
    list.commands = newCommands;
    unit.upgradesEquipped.forEach((upgrade) => {
      if (upgrade && upgrade.isUnique) list.uniques[upgrade.id] = false;
    });
    if (unit.isUnique) list.uniques[unit.id] = false;
    if (unit.count > 1) unit.count -= 1;
    else {
      list.units.splice(unitIndex, 1);
    }
    this.setState({
      list,
      isViewMenuOpen: false,
      viewFilter: {
        type: 'LIST'
      }
    });
  }

  removeCommand = (commandIndex) => {
    const { list } = this.state;
    const command = list.commands[commandIndex];
    list.uniques[command.id] = false;
    list.commands.splice(commandIndex, 1);
    this.setState({ list });
  }

  unitHasNoUniques = (unit) => {
    let hasNoUniques = true;
    if (unit.isUnique) return false;
    unit.upgradesEquipped.forEach((upgrade) => {
      if (upgrade && upgrade.isUnique) hasNoUniques = false;
    });
    return hasNoUniques;
  }

  isValidFaction = (card, list) => card.faction === '' || card.faction === list.faction;

  isUniqueAlreadyExist = (card, list) => card.id in list.uniques && list.uniques[card.id]

  moveUnitUp = (index) => {
    if (index === 0) return;
    this.moveUnit(index, index - 1);
  }

  moveUnitDown = (index) => {
    const { list } = this.state;
    if (index === list.units.length - 1) return;
    this.moveUnit(index, index + 1);
  }

  moveUnit = (oldIndex, newIndex) => {
    const { list } = this.state;
    const temp = list.units[oldIndex];
    list.units[oldIndex] = list.units[newIndex];
    list.units[newIndex] = temp;
    this.setState({ list, viewFilter: { type: 'LIST' } });
  }

  changeListMode = () => {
    const { list } = this.state;
    list.mode = list.mode === 'standard' ? 'grand army' : 'standard';
    this.setState({ list });
  }

  changeListTitle = (event) => {
    const { list } = this.state;
    list.title = event.target.value;
    this.setState({ list });
  }

  changeListNotes = (event) => {
    const { list } = this.state;
    list.notes = event.target.value;
    this.setState({ list });
  }

  changePrimaryTheme = (primaryColor) => {
    const { defaultTheme } = this.state;
    defaultTheme.palette.primary.main = primaryColor;
    this.setState(defaultTheme);
  }

  changeViewFilter = newViewFilter => this.setState({ viewFilter: newViewFilter });

  resetView = () => {
    this.setState({
      isViewMenuOpen: false,
      viewFilter: {
        type: 'LIST'
      }
    });
  }

  openViewChangeMenu = () => {
    const { isViewMenuOpen } = this.state;
    this.setState({ isViewMenuOpen: !isViewMenuOpen });
  }

  handleSpeedDialClick = () => {
    const { isSpeedDialClicked } = this.state;
    this.setState({
      isSpeedDialClicked: !isSpeedDialClicked
    });
  }

  renderTestButton = () => (
    <Button
      variant="contained"
      onClick={() => console.log(this.state)}
    >
      Log State
    </Button>
  );

  render() {
    const {
      list,
      viewFilter,
      isViewMenuOpen,
      classes,
      defaultTheme
    } = this.state;
    const {
      cards,
      unitsById,
      upgradesById,
      commandsById,
      width,
      isLoggedIn,
      user,
      handleSaveList
    } = this.props;
    const allUpgradeOptions = this.getUpgradeOptions(list);
    const allMenuOptions = this.getMenuOptions(list);
    const mobile = width === 'sm' || width === 'xs';
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
    const listViewItems = [];
    const eligibleUpgradeCards = [];
    const otherUpgradeCards = upgradesById.reduce((filtered, upgradeId, upgradeIndex) => {
      const upgrade = cards[upgradeId];
      const eligibility = this.getUpgradeEligibility(upgrade);
      if (eligibility === 'EQUIPPABLE') {
        eligibleUpgradeCards.push(
          <Fade
            unmountOnExit
            key={upgrade.id}
            in={eligibility !== 'HIDDEN'}
            timeout={{
              enter: this.getTransitionDuration(upgradeIndex),
              exit: 0
            }}
            className={classes.fadeTransition}
            onClick={() => this.addCard(eligibility, 'UPGRADE', upgradeId, cards)}
          >
            <Grid item>
              <img
                src={upgrade.imageLocation}
                alt={upgrade.name}
                className={this.getCardStyles('UPGRADE', eligibility, classes)}
              />
            </Grid>
          </Fade>
        );
      } else {
        filtered.push(
          <Fade
            unmountOnExit
            key={upgrade.id}
            in={eligibility !== 'HIDDEN'}
            timeout={{
              enter: this.getTransitionDuration(upgradeIndex),
              exit: 0
            }}
            className={classes.fadeTransition}
            onClick={() => this.addCard(eligibility, 'UPGRADE', upgradeId, cards)}
          >
            <Grid item>
              <img
                src={upgrade.imageLocation}
                alt={upgrade.name}
                className={this.getCardStyles('UPGRADE', eligibility, classes)}
              />
            </Grid>
          </Fade>
        );
      }
      return filtered;
    }, []);
    list.units.forEach((unit, index) => {
      for (let counter = 0; counter < unit.count; counter += 1) {
        listViewItems.push(
          <Grid
            item
            container
            spacing={8}
            xs={12}
            key={`${unit.name}_${index}_${counter}`}
          >
            <Grid item xs>
              <img
                src={unit.imageLocation}
                alt={unit.name}
                className={this.getCardStyles('UNIT', 'LIST_VIEW', classes)}
                style={{ marginRight: '0.5rem' }}
              />
              {unit.upgradesEquipped.map((upgrade) => {
                if (upgrade) {
                  return (
                    <img
                      key={upgrade.id}
                      src={upgrade.imageLocation}
                      alt={upgrade.name}
                      className={this.getCardStyles('UPGRADE', 'LIST_VIEW', classes)}
                      style={{ marginRight: '0.25rem' }}
                    />
                  );
                }
                return undefined;
              })}
              <Divider inset />
            </Grid>
          </Grid>
        );
      }
    });

    // TODO: make a function for this since it's a keyword
    let hasPalp = false;
    let hasGuards = false;
    list.units.forEach((unit) => {
      rankCounts[unit.rank] += unit.count;
      if (unit.name === 'Emperor Palpatine') hasPalp = true;
      if (unit.name === 'Imperial Royal Guards') hasGuards = true;
    });
    if (hasPalp && hasGuards) rankCounts.special -= 1;
    return (
      <MuiThemeProvider theme={defaultTheme}>
        <Title faction={list.faction} />
        <TopMenu
          list={list}
          changeListTitle={this.changeListTitle}
          changeListMode={this.changeListMode}
          changePrimaryTheme={this.changePrimaryTheme}
          mobile={mobile}
          renderTestButton={this.renderTestButton}
        />
        <ViewCloseButton
          isVisible={viewFilter.type !== 'LIST'}
          clickHandler={this.resetView}
          className={classes.viewButton}
        />
        <Grid
          container
          spacing={8}
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          className={classes.grid}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Slide
              in={mobile ? viewFilter.type === 'LIST' : true}
              mountOnEnter
              unmountOnExit
              direction="right"
              timeout={250}
            >
              <Paper elevation={3} className={classes.paper}>
                <Grid
                  container
                  direction="row"
                  spacing={8}
                  justify="center"
                  alignItems="flex-start"
                >
                  {Object.entries(rankCounts).map(([rank, rankCount]) => {
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
                      <Grid item key={rank}>
                        <Chip
                          variant="outlined"
                          onClick={() => this.changeViewFilter({
                            rank,
                            type: 'UNIT'
                          })}
                          avatar={(
                            <img
                              alt={rank}
                              src={`/rankIcons/${rank}.svg`}
                              style={rankIconStyles[rank]}
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
                      </Grid>
                    );
                  })}
                </Grid>
                <Divider style={{ marginBottom: '0.25rem ' }} />
                <div>
                  <List dense>
                    {list.units.map((unit, index) => (
                      <div key={`${unit.name}_${index}`}>
                        {mobile ? (
                          <SideMenuListItemMobile
                            count={unit.count}
                            unit={unit}
                            unitIndex={index}
                            upgradeOptions={allUpgradeOptions[index]}
                            menuOptions={allMenuOptions[index]}
                            removeUpgrade={this.removeUpgrade}
                            changeViewFilter={this.changeViewFilter}
                            mobile={mobile}
                          />
                        ) : (
                          <SideMenuListItem
                            count={unit.count}
                            unit={unit}
                            unitIndex={index}
                            upgradeOptions={allUpgradeOptions[index]}
                            menuOptions={allMenuOptions[index]}
                            removeUpgrade={this.removeUpgrade}
                            changeViewFilter={this.changeViewFilter}
                            mobile={mobile}
                          />
                        )}
                      </div>
                    ))}
                  </List>
                  <ListFooter
                    list={list}
                    changeListNotes={this.changeListNotes}
                    changeViewFilter={this.changeViewFilter}
                    removeCommand={this.removeCommand}
                    user={user}
                    isLoggedIn={isLoggedIn}
                    handleSaveList={handleSaveList}
                  />
                </div>
              </Paper>
            </Slide>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Slide
              in={mobile ? viewFilter.type !== 'LIST' : true}
              mountOnEnter
              unmountOnExit
              direction="left"
              timeout={250}
            >
              <Paper elevation={3} className={classes.paper}>
                <Grid
                  container
                  spacing={8}
                  direction="column"
                >
                  <Grid
                    item
                    container
                    spacing={8}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {viewFilter.type === 'LIST' && listViewItems}
                    {viewFilter.type === 'LIST' && list.commands.length > 1 && list.commands.map(command => (
                      <Grid item key={command.name}>
                        <img
                          src={command.imageLocation}
                          alt={command.name}
                          className={this.getCardStyles('COMMAND', 'LIST_VIEW', classes)}
                        />
                      </Grid>
                    ))}
                    {unitsById.reduce((filtered, unitId, unitIndex) => {
                      const unit = cards[unitId];
                      const eligibility = this.getUnitEligibility(unit, unitIndex);
                      filtered.push(
                        <Fade
                          unmountOnExit
                          key={unit.id}
                          in={eligibility !== 'HIDDEN'}
                          timeout={{
                            enter: this.getTransitionDuration(unitIndex),
                            exit: 0
                          }}
                          className={classes.fadeTransition}
                          onClick={() => this.addCard(eligibility, 'UNIT', unitId, cards)}
                        >
                          <Grid item>
                            <img
                              src={unit.imageLocation}
                              alt={unit.name}
                              className={this.getCardStyles('UNIT', eligibility, classes)}
                            />
                          </Grid>
                        </Fade>
                      );
                      return filtered;
                    }, [])}
                    {[...eligibleUpgradeCards, ...otherUpgradeCards]}
                    {viewFilter.command && viewFilter.command.name === 'Standing Orders' ? (
                      <Fade
                        unmountOnExit
                        in
                        timeout={{
                          enter: this.getTransitionDuration(1),
                          exit: 0
                        }}
                        className={classes.fadeTransition}
                      >
                        <Grid item>
                          <img
                            src="/commands/Standing%20Orders.png"
                            alt="Standing Orders"
                            className={this.getCardStyles('COMMAND', 'VIEW_ONLY', classes)}
                          />
                        </Grid>
                      </Fade>
                    ) : (
                      commandsById.reduce((filtered, commandId, commandIndex) => {
                        const command = cards[commandId];
                        const eligibility = this.getCommandEligibility(command);
                        filtered.push(
                          <Fade
                            unmountOnExit
                            key={command.id}
                            in={eligibility === 'EQUIPPABLE' || eligibility === 'VIEW_ONLY'}
                            timeout={{
                              enter: this.getTransitionDuration(commandIndex),
                              exit: 0
                            }}
                            className={classes.fadeTransition}
                            onClick={() => this.addCard(eligibility, 'COMMAND', commandId, cards)}
                          >
                            <Grid item>
                              <img
                                src={command.imageLocation}
                                alt={command.name}
                                className={this.getCardStyles('COMMAND', eligibility, classes)}
                              />
                            </Grid>
                          </Fade>
                        );
                        return filtered;
                      }, [])
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withWidth()(withStyles(styles)(withRouter(BuilderContainer)));
