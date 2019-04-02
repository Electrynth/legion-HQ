import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  listItem: {
    width: '100%',
    marginBottom: '0.25rem'
  },
  listItemDiv: {
    borderRadius: '5px'
  },
  upgradeDiv: {
    marginLeft: '4rem'
  },
  upgradeChip: {
    marginRight: '0.2rem'
  },
  unitIcon: {
    width: '45px',
    height: '45px',
    cursor: 'pointer'
  },
  commander: {
    position: 'relative',
    height: '20px',
    width: '20px'
  },
  operative: {
    position: 'relative',
    height: '15px',
    width: '15px'
  },
  corps: {
    position: 'relative',
    height: '14px',
    width: '14px'
  },
  special: {
    position: 'relative',
    height: '22px',
    width: '22px',
    top: '1px'
  },
  support: {
    position: 'relative',
    height: '15px',
    width: '15px',
    right: '1px'
  },
  heavy: {
    position: 'relative',
    height: '20px',
    width: '20px',
  },
  counterBadgeDark: {
    marginRight: '45px',
    marginTop: '40px',
    backgroundColor: '#848484'
  },
  counterBadgeLight: {
    marginRight: '45px',
    marginTop: '40px',
    backgroundColor: '#BDBDBD'
  },
  rankBadgeDark: {
    marginTop: '5px',
    marginRight: '45px',
    backgroundColor: '#848484'
  },
  rankBadgeLight: {
    marginTop: '5px',
    marginRight: '45px',
    backgroundColor: '#BDBDBD'
  },
  noBadge: {
    display: 'none'
  }
};

class SideMenuListItem extends React.Component {
  state = {
    upgradeMenuAnchor: null,
    optionMenuAnchor: null,
    isHovered: false
  };

  toggleUpgradeMenu = event => this.setState({ upgradeMenuAnchor: event.currentTarget });

  toggleOptionMenu = event => this.setState({ optionMenuAnchor: event.currentTarget });

  turnOffHovered = () => this.setState({ isHovered: false });

  turnOnHovered = () => this.setState({ isHovered: true });

  render() {
    const {
      upgradeMenuAnchor,
      optionMenuAnchor,
      isHovered
    } = this.state;
    const {
      unit,
      unitIndex,
      upgradeOptions,
      menuOptions,
      removeUpgrade,
      changeViewFilter,
      mobile,
      count,
      classes,
      darkMode
    } = this.props;
    let allUpgradesEquipped = false;
    let numUpgradesEquipped = 0;
    let totalCost = unit.cost;
    const maxNumUpgrades = unit.upgradesEquipped.length;
    unit.upgradesEquipped.forEach((upgrade) => {
      if (upgrade) {
        numUpgradesEquipped += 1;
        totalCost += upgrade.cost;
      }
    });
    if (numUpgradesEquipped === maxNumUpgrades) allUpgradesEquipped = true;
    return (
      <Slide
        in
        mountOnEnter
        unmountOnExit
        direction="right"
        timeout={250}
      >
        <div
          className={classes.listItemDiv}
          onMouseEnter={this.turnOnHovered}
          onMouseLeave={this.turnOffHovered}
        >
          <ListItem className={classes.listItem}>
            <div>
              <Badge
                badgeContent={(
                  <img
                    alt={unit.rank}
                    className={classes[unit.rank]}
                    src={`/rankIcons/${unit.rank.replace(' ', '%20')}.svg`}
                  />
                )}
                classes={{
                  badge: darkMode ? classes.rankBadgeDark : classes.rankBadgeLight
                }}
              >
                <Badge
                  badgeContent={count}
                  classes={{
                    badge: count > 1 ? (darkMode ? classes.counterBadgeDark : classes.counterBadgeLight ) : classes.noBadge
                  }}
                >
                  <Avatar
                    src={unit.iconLocation}
                    className={classes.unitIcon}
                    onClick={() => changeViewFilter({ unitIndex, type: 'UNIT_VIEW' })}
                  />
                </Badge>
              </Badge>
            </div>
            <ListItemText
              primary={unit.displayName ? unit.displayName : unit.name}
              secondary={unit.cost === totalCost ? (
                `${unit.cost}`
              ) : (
                `${unit.cost} (${totalCost})`
              )}
            />
            <ListItemSecondaryAction>
              <Grow
                key="upgradeOptionButton"
                in={!allUpgradesEquipped}
                timeout={250}
              >
                <IconButton
                  aria-haspopup="true"
                  size="small"
                  aria-owns={upgradeMenuAnchor ? 'upgradeMenu' : null}
                  onClick={this.toggleUpgradeMenu}
                >
                  <AddIcon />
                </IconButton>
              </Grow>
              {upgradeOptions ? (
                <Menu
                  id="upgradeMenu"
                  anchorEl={upgradeMenuAnchor}
                  open={Boolean(upgradeMenuAnchor)}
                  onClose={() => this.setState({ upgradeMenuAnchor: null })}
                >
                  {upgradeOptions.map((option, upgradeIndex) => (
                    option ? (
                      <MenuItem
                        key={`${option.name}_${upgradeIndex}`}
                        onClick={() => {
                          this.setState({ upgradeMenuAnchor: null });
                          option.action({ unitIndex, upgradeIndex, ...option.viewFilter });
                        }}
                      >
                        <ListItemIcon>
                          {option.icon}
                        </ListItemIcon>
                        {option.name === 'Blaster' ? 'Armament' : option.name}
                      </MenuItem>
                    ) : undefined
                  ))}
                </Menu>
              ) : undefined}
              <Grow
                key="menuOptionButton"
                in={true}
                timeout={250}
              >
                <IconButton
                  aria-haspopup="true"
                  size="small"
                  aria-owns={optionMenuAnchor ? 'optionMenu' : null}
                  onClick={this.toggleOptionMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              </Grow>
              {menuOptions ? (
                <Menu
                  id="optionMenu"
                  anchorEl={optionMenuAnchor}
                  open={Boolean(optionMenuAnchor)}
                  onClose={() => this.setState({ optionMenuAnchor: null })}
                >
                  {menuOptions.map((option, index) => (
                    <MenuItem
                      key={`${option.name}_${index}`}
                      onClick={() => {
                        this.setState({ optionMenuAnchor: null });
                        option.action(unitIndex);
                      }}
                    >
                      <ListItemIcon>
                        {option.icon}
                      </ListItemIcon>
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>
              ) : undefined}
            </ListItemSecondaryAction>
          </ListItem>
          <div className={classes.upgradeDiv}>
            {unit.upgradesEquipped.map((upgrade, upgradeIndex) => {
              if (upgrade) {
                return (
                  <Grow
                    in
                    timeout={250}
                    key={upgrade.id}
                  >
                    <Chip
                      avatar={<Avatar src={upgrade.iconLocation} />}
                      label={upgrade.displayName ? upgrade.displayName : upgrade.name}
                      className={classes.upgradeChip}
                      onClick={() => changeViewFilter({ upgrade, type: 'UPGRADE_VIEW' })}
                      onDelete={() => removeUpgrade(unitIndex, upgradeIndex)}
                      style={{
                        backgroundColor: darkMode ? '#848484' : undefined
                      }}
                    />
                  </Grow>
                );
              }
              return undefined;
            })}
          </div>
          <Divider style={{ marginBottom: '0.25rem' }} />
        </div>
      </Slide>
    );
  }
}

export default withStyles(styles)(SideMenuListItem);
