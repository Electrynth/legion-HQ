import React from 'react';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import PortraitSharpIcon from '@material-ui/icons/PortraitSharp';
import SideMenuListItem from 'components/SideMenuListItem';
import Title from 'components/Title';
import TopMenu from 'components/TopMenu';
import ListFooter from 'components/ListFooter';
import ViewChangeButton from 'components/ViewChangeButton';
import ViewCloseButton from 'components/ViewCloseButton';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00BCD4'
    },
    secondary: {
      main: '#F50057'
    },
    error: {
      main: '#000'
    }
  }
});

const styles = {
  fadeTransition: {
    display: 'inline-block'
  },
  viewButton: {
    zIndex: 10,
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
  }
};

class BuilderContainer extends React.Component {
  constructor(props) {
    super(props);
    const { faction, classes } = this.props;
    this.state = {
      classes,
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
        uniques: {}
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
      else activeClasses.push(classes.unitCardMedium);
    } else if (cardType === 'UPGRADE') {
      if (eligibility === 'VIEW_ONLY') activeClasses.push(classes.upgradeCardLarge);
      else activeClasses.push(classes.upgradeCardMedium);
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
    let isRequirementsMet = true;
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

  getUnitEligibility = (unit, unitIndex) => {
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
      if (viewFilter.cardId === command.id) return 'VIEW_ONLY';
      return 'HIDDEN';
    }
    if (viewFilter.type !== 'COMMAND') return 'HIDDEN';
    if (!this.isValidFaction(command, list)) return 'HIDDEN';
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

  addCard = (eligibility, type, cardId, cards) => {
    if (eligibility !== 'EQUIPPABLE') return;
    const { list, viewFilter } = this.state;
    const card = JSON.parse(JSON.stringify(cards[cardId]));
    switch (type) {
      case 'UNIT':
        list.units.push(card);
        break;
      case 'UPGRADE':
        list.units[viewFilter.unitIndex].upgradesEquipped[viewFilter.upgradeIndex] = card;
        list.units[viewFilter.unitIndex].totalCost += card.cost;
        break;
      case 'COMMAND':
        list.commands.push(card);
        list.uniques[cardId] = true;
        break;
      default:
    }
    if (card.isUnique) list.uniques[cardId] = true;
    this.setState({ list }, this.resetView());
  }

  copyUnit = (unitIndex) => {
    const { list } = this.state;
    const unit = list.units[unitIndex];
    const unitCopy = JSON.parse(JSON.stringify(unit));
    list.units.push(unitCopy);
    this.setState({ list });
  }

  removeUnit = (unitIndex) => {
    const { list } = this.state;
    const unit = list.units[unitIndex];
    list.commands.forEach((command, commandIndex) => {
      if (command.commander === unit.name) this.removeCommand(commandIndex);
    });
    unit.upgradesEquipped.forEach((upgrade) => {
      if (upgrade && upgrade.isUnique) list.uniques[upgrade.id] = false;
    });
    if (unit.isUnique) list.uniques[unit.id] = false;
    list.units.splice(unitIndex, 1);
    this.setState({
      list,
      isViewMenuOpen: false,
      viewFilter: {
        type: 'LIST'
      }
    });
  }

  removeUpgrade = (unitIndex, upgradeIndex) => {
    const { list } = this.state;
    const unit = list.units[unitIndex];
    const upgrade = unit.upgradesEquipped[upgradeIndex];
    unit.totalCost -= upgrade.cost;
    if (upgrade.isUnique) list.uniques[upgrade.id] = false;
    list.units[unitIndex].upgradesEquipped[upgradeIndex] = null;
    this.setState({ list });
  }

  removeCommand = (commandIndex) => {
    const { list } = this.state;
    const command = list.commands[commandIndex];
    if (command.name === 'Standing Orders') return;
    if (command.isUnique) list.uniques[command.id] = false;
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

  render() {
    const {
      list,
      viewFilter,
      isViewMenuOpen,
      classes
    } = this.state;
    const {
      cards,
      unitsById,
      upgradesById,
      commandsById
    } = this.props;
    const allUpgradeOptions = this.getUpgradeOptions(list);
    const allMenuOptions = this.getMenuOptions(list);
    const actions = [
      {
        name: 'Commander',
        icon: (
          <img
            alt="Commander"
            src="/rankIcons/commander.svg"
            style={{ width: '30px', height: '30px' }}
          />
        ),
        viewFilter: {
          type: 'UNIT',
          rank: 'commander'
        }
      },
      {
        name: 'Operative',
        icon: (
          <img
            alt="Operative"
            src="/rankIcons/operative.svg"
            style={{ width: '25px', height: '25px' }}
          />
        ),
        viewFilter: {
          type: 'UNIT',
          rank: 'operative'
        }
      },
      {
        name: 'Corps',
        icon: (
          <img
            alt="Corps"
            src="/rankIcons/corps.svg"
            style={{ width: '20px', height: '20px' }}
          />
        ),
        viewFilter: {
          type: 'UNIT',
          rank: 'corps'
        }
      },
      {
        name: 'Special Forces',
        icon: (
          <img
            alt="Special Forces"
            src="/rankIcons/special.svg"
            style={{ width: '30px', height: '30px' }}
          />
        ),
        viewFilter: {
          type: 'UNIT',
          rank: 'special'
        }
      },
      {
        name: 'Support',
        icon: (
          <img
            alt="Support"
            src="/rankIcons/support.svg"
            style={{ width: '20px', height: '20px' }}
          />
        ),
        viewFilter: {
          type: 'UNIT',
          rank: 'support'
        }
      },
      {
        name: 'Heavy',
        icon: (
          <img
            alt="Heavy"
            src="/rankIcons/heavy.svg"
            style={{ width: '30px', height: '30px' }}
          />
        ),
        viewFilter: {
          type: 'UNIT',
          rank: 'heavy'
        }
      },
      {
        name: 'Command',
        icon: <PortraitSharpIcon />,
        viewFilter: {
          type: 'COMMAND'
        }
      }
    ];
    return (
      <MuiThemeProvider theme={defaultTheme}>
        <Title />
        <TopMenu
          list={list}
          changeListMode={this.changeListMode}
        />
        <ViewChangeButton
          actions={actions}
          isVisible={viewFilter.type === 'LIST'}
          isClicked={isViewMenuOpen}
          clickHandler={this.openViewChangeMenu}
          changeView={this.changeViewFilter}
          className={classes.viewButton}
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
          <Grid item xs={5}>
            <Slide
              in
              mountOnEnter
              unmountOnExit
              direction="right"
              timeout={500}
            >
              <Paper elevation={3} className={classes.paper}>
                <div style={{ opacity: 1 }}>
                  <List dense>
                    {list.units.map((unit, unitIndex) => (
                      <div key={`${unit.id}_${unitIndex}`}>
                        <SideMenuListItem
                          unit={unit}
                          unitIndex={unitIndex}
                          upgradeOptions={allUpgradeOptions[unitIndex]}
                          menuOptions={allMenuOptions[unitIndex]}
                          removeUpgrade={this.removeUpgrade}
                          changeViewFilter={this.changeViewFilter}
                        />
                      </div>
                    ))}
                  </List>
                </div>
              </Paper>
            </Slide>
          </Grid>
          <Grid item xs>
            <Slide
              in
              mountOnEnter
              unmountOnExit
              direction="left"
              timeout={500}
            >
              <div style={{ opacity: 1 }}>
                <Paper elevation={3} className={classes.paper}>
                  <Grid
                    container
                    spacing={8}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {viewFilter.type === 'LIST' && list.units.map((unit, unitIndex) => {
                      return (
                        <Grid
                          item
                          container
                          spacing={8}
                          xs={12}
                          key={`${unit.id}_${unitIndex}`}
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
                    })}
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
                    {upgradesById.reduce((filtered, upgradeId, upgradeIndex) => {
                      const upgrade = cards[upgradeId];
                      const eligibility = this.getUpgradeEligibility(upgrade);
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
                      return filtered;
                    }, [])}
                    {commandsById.reduce((filtered, commandId, commandIndex) => {
                      const command = cards[commandId];
                      const eligibility = this.getCommandEligibility(command);
                      filtered.push(
                        <Fade
                          unmountOnExit
                          key={command.id}
                          in={eligibility !== 'HIDDEN'}
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
                    }, [])}
                  </Grid>
                </Paper>
              </div>
            </Slide>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(BuilderContainer);
