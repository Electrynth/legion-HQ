/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Title from 'components/Title';
import TopMenu from 'components/TopMenu';
import ListFooter from 'components/ListFooter';
import ViewCloseButton from 'components/ViewCloseButton';
import MenuBar from 'newComponents/MenuBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const styles = {
  upgradeChip: {
    marginRight: '0.25rem'
  },
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
  },
  commanderButton: {
    width: '28px',
    height: '28px',
    marginLeft: '5px'
  },
  operativeButton: {
    width: '20px',
    height: '20px',
    marginLeft: '5px'
  },
  corpsButton: {
    width: '20px',
    height: '20px',
    marginLeft: '5px'
  },
  specialButton: {
    width: '35px',
    height: '35px',
    marginLeft: '5px'
  },
  supportButton: {
    width: '20px',
    height: '20px',
    marginLeft: '5px'
  },
  heavyButton: {
    width: '35px',
    height: '35px',
    marginLeft: '5px'
  },
  commanderBadgeIcon: {
    position: 'relative',
    height: '20px',
    width: '20px'
  },
  operativeBadgeIcon: {
    position: 'relative',
    height: '15px',
    width: '15px'
  },
  corpsBadgeIcon: {
    position: 'relative',
    height: '14px',
    width: '14px'
  },
  specialBadgeIcon: {
    position: 'relative',
    height: '22px',
    width: '22px',
    top: '1px'
  },
  supportBadgeIcon: {
    position: 'relative',
    height: '15px',
    width: '15px',
    right: '1px'
  },
  heavyBadgeIcon: {
    position: 'relative',
    height: '20px',
    width: '20px'
  },
  modal: {
    position: 'relative',
    padding: '10px',
    top: '10%',
    left: 'calc(50% - 300px)',
    width: '600px',
    overflowY: 'scroll'
  },
  commandChipAvatar: {
    width: '45px',
    height: '45px'
  },
  noBadge: {
    display: 'none'
  },
  rankBadge: {
    marginTop: '5px',
    marginRight: '45px'
  },
  counterBadge: {
    marginRight: '45px',
    marginTop: '40px'
  }
};

function RankChip(props) {
  const {
    classes,
    mode,
    rank,
    rankCount,
    onClick
  } = props;
  let isValidRankCount;
  if (mode === 'standard') {
    switch (rank) {
      case 'commander':
        isValidRankCount = rankCount > 0 && rankCount < 3;
        break;
      case 'operative':
        isValidRankCount = rankCount < 3;
        break;
      case 'corps':
        isValidRankCount = rankCount > 3 && rankCount < 6;
        break;
      case 'special':
        isValidRankCount = rankCount < 4;
        break;
      case 'support':
        isValidRankCount = rankCount < 4;
        break;
      case 'heavy':
        isValidRankCount = rankCount < 2;
        break;
      default:
        isValidRankCount = false;
    }
  } else {
    switch (rank) {
      case 'commander':
        isValidRankCount = rankCount > 0 && rankCount < 5;
        break;
      case 'operative':
        isValidRankCount = rankCount < 5;
        break;
      case 'corps':
        isValidRankCount = rankCount > 5 && rankCount < 11;
        break;
      case 'special':
        isValidRankCount = rankCount < 6;
        break;
      case 'support':
        isValidRankCount = rankCount < 6;
        break;
      case 'heavy':
        isValidRankCount = rankCount < 5;
        break;
      default:
        isValidRankCount = false;
    }
  }
  return (
    <Chip
      variant="outlined"
      onClick={onClick}
      avatar={(
        <img
          alt={rank}
          className={classes[`${rank}Button`]}
          src={`/rankIcons/${rank}.svg`}
        />
      )}
      label={(
        <Typography
          color={isValidRankCount ? 'default' : 'secondary'}
        >
          {rankCount}
        </Typography>
      )}
    >
      {rankCount}
    </Chip>
  );
}

function RankChips(props) {
  const {
    classes,
    mode,
    units,
    onClick
  } = props;
  const rankCounts = {
    commander: 0,
    operative: 0,
    corps: 0,
    special: 0,
    support: 0,
    heavy: 0
  };
  // TODO: make a function for this since it's a keyword
  let hasPalp = false;
  let hasGuards = false;
  units.forEach((unit) => {
    rankCounts[unit.rank] += unit.count;
    if (unit.name === 'Emperor Palpatine') hasPalp = true;
    if (unit.name === 'Imperial Royal Guards') hasGuards = true;
  });
  if (hasPalp && hasGuards) rankCounts.special -= 1;
  const rankChips = [];
  rankCounts.forEach((rank) => {
    rankChips.push(
      <Grid item key={rank}>
        <RankChip
          classes={classes}
          mode={mode}
          rank={rank}
          rankCount={rankCounts[rank]}
          onClick={onClick}
        />
      </Grid>
    );
  });
  return (
    <Grid
      container
      direction="row"
      spacing={8}
      justify="center"
      alignItems="flex-start"
    >
      {rankChips}
    </Grid>
  );
}

function CommandChip(props) {
  const {
    classes,
    command,
    onClick
  } = props;
  return (
    <Chip
      color="primary"
      avatar={(
        <Avatar className={classes.commandChipAvatar}>
          <img
            alt={command.name}
            src={command.iconLocation}
            className={classes.commandChipAvatar}
          />
        </Avatar>
      )}
      label={`${command.name} (${command.pips})`}
      onClick={onClick}
      style={{ marginRight: '5px' }}
    />
  );
}

function UpgradeChip(props) {
  const {
    classes,
    upgrade,
    onClick,
    onDelete
  } = props;
  return (
    <Chip
      color="primary"
      avatar={<Avatar src={upgrade.iconLocation} />}
      label={upgrade.name}
      className={classes.upgradeChip}
      onClick={onClick}
      onDelete={onDelete}
    />
  );
}

function UpgradeChips(props) {
  const {
    classes,
    unit,
    onClick,
    onDelete
  } = props;
  const upgradeChips = [];
  unit.upgradesEquipped.forEach((upgrade) => {
    if (upgrade) {
      upgradeChips.push(
        <UpgradeChip
          key={upgrade.id}
          classes={classes}
          upgrade={upgrade}
          onClick={onClick}
          onDelete={onDelete}
        />
      );
    }
  });
  return (
    <div>
      {upgradeChips}
    </div>
  );
}

function AddUpgradeButton(props) {
  const {
    anchor,
    upgradeBar,
    upgradesEquipped,
    onClick,
    onClose
  } = props;
  let allUpgradesEquipped = true;
  upgradesEquipped.forEach((upgrade) => {
    if (upgrade) allUpgradesEquipped = false;
  });
  if (allUpgradesEquipped) return null;
  return (
    <div>
      <IconButton
        aria-haspopup="true"
        size="small"
        aria-owns={anchor ? 'upgradeMenu' : null}
        onClick={onClick}
      >
        <AddIcon />
      </IconButton>
      <Menu
        id="upgradeMenu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={onClose}
      >
        {upgradeBar.map((upgradeType, index) => {
          const key = `${upgradeType}_${index}`;
          return (
            <MenuItem
              key={key}
              onClick={onClick}
            >
              <ListItemIcon>
                <img
                  alt={upgradeType}
                  src={`/upgradeTypeIcons/${upgradeType}.svg`}
                  style={{ width: '30px', height: '30px' }}
                />
              </ListItemIcon>
              {upgradeType}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

function UnitOptionButton(props) {
  const {
    anchor,
    unitIndex,
    units,
    onClick,
    onClose
  } = props;
  let noUniques = true;
  const unit = units[unitIndex];
  if (unit.isUnique) noUniques = false;
  else {
    unit.upgradesEquipped.forEach((upgrade) => {
      if (upgrade && upgrade.isUnique) noUniques = false;
    });
  }
  const menuOptions = [];
  if (unitIndex > 0) menuOptions.push('moveUp');
  if (unitIndex < units.length - 1) menuOptions.push('moveDown');
  if (noUniques) menuOptions.push('copy');
  const menuIcons = {
    moveUp: <ArrowUpwardIcon />,
    moveDown: <ArrowDownwardIcon />,
    copy: <FileCopyIcon />,
    delete: <ClearIcon />
  };
  return (
    <div>
      <IconButton
        aria-haspopup="true"
        size="small"
        aria-owns={anchor}
        onClick={onClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="unitMenu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={onClose}
      >
        {menuOptions.map((menuOption) => {
          // need two different onClicks
          return (
            <MenuItem
              key={menuOption}
              onClick={onClick}
            >
              <ListItemIcon>
                {menuIcons[menuOption]}
              </ListItemIcon>
              {menuOption}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

function UnitAvatar(props) {
  const {
    classes,
    unit,
    onClick
  } = props;
  return (
    <Badge
      color="primary"
      badgeContent={(
        <img
          alt={unit.rank}
          className={classes[`${unit.rank}BadgeIcon`]}
          src={`rankIcons/${unit.rank}.svg`}
        />
      )}
      classes={{ badge: classes.rankBadge }}
    >
      <Badge
        color="primary"
        badgeContent={unit.count}
        classes={{
          badge: unit.count > 1 ? classes.counterBadge : classes.noBadge
        }}
      >
        <Avatar
          src={unit.iconLocation}
          className={classes.avatar}
          onClick={onClick}
        />
      </Badge>
    </Badge>
  );
}

function UnitText(props) {
  const {
    unit
  } = props;
  let totalCost = unit.cost;
  unit.upgradesEquipped.forEach((upgrade) => {
    if (upgrade) totalCost += upgrade.cost;
  });
  return (
    <div style={{ marginLeft: '1rem' }}>
      <Typography>
        {unit.name}
      </Typography>
      <Typography variant="caption">
        {unit.cost === totalCost ? (
          `${unit.cost}`
        ) : (
          `${unit.cost} (${totalCost})`
        )}
      </Typography>
    </div>
  );
}

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

  changeListTitle = (newTitle) => {
    const { list } = this.state;
    list.title = newTitle;
    this.setState({ list });
  }

  toggleListMode = () => {
    const { list } = this.state;
    const { mode } = list;
    if (mode === 'standard') {
      list.mode = 'grand army';
      this.setState({ list });
    } else {
      list.mode = 'standard';
      this.setState({ list });
    }
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
          toggleListMode={this.toggleListMode}
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
          <Grid item xs={12} md={6}>
            <Paper elevation={2} className={classes.paper}>
              <Grid
                container
                direction="row"
                spacing={8}
                justify="center"
                alignItems="flex-start"
              >

              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>

          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

RankChips.propTypes = {
  classes: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  units: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

RankChip.propTypes = {
  classes: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
  rankCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

CommandChip.propTypes = {
  classes: PropTypes.object.isRequired,
  command: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

UpgradeChip.propTypes = {
  classes: PropTypes.object.isRequired,
  upgrade: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

UpgradeChips.propTypes = {
  classes: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

AddUpgradeButton.propTypes = {
  anchor: PropTypes.object.isRequired,
  upgradeBar: PropTypes.array.isRequired,
  upgradesEquipped: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

UnitOptionButton.propTypes = {
  anchor: PropTypes.object.isRequired,
  unitIndex: PropTypes.number.isRequired,
  units: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

UnitAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  unit: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

UnitText.propTypes = {
  unit: PropTypes.object.isRequired
};

BuilderContainer.propTypes = {
  faction: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  unitsById: PropTypes.array.isRequired,
  upgradesById: PropTypes.array.isRequired,
  commandsById: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired
};

export default withWidth()(withStyles(styles)(BuilderContainer));
