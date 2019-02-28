import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  upgradeChip: {
    marginRight: '0.2rem'
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
    width: '20px'
  },
  unitButton: {
    right: '0.5rem'
  },
  unitButtonMobile: {
    right: '3.5rem'
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
  avatar: {
    width: '45px',
    height: '45px',
    marginLeft: '10px',
    cursor: 'pointer'
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
    const desktopMenuOptions = menuOptions.filter(option => !option.name.includes('Move'))
    return (
      <div style={{ backgroundColor: darkMode ? '#424242' : undefined }}>
        <Grid
          container
          spacing={0}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <Grid
              item
              container
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
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
                      className={classes.avatar}
                      onClick={() => changeViewFilter({ unitIndex, type: 'UNIT_VIEW' })}
                    />
                  </Badge>
                </Badge>
              </Grid>
              <Grid item>
                <div style={{ marginLeft: '1rem' }}>
                  <Typography>
                    {unit.displayName ? unit.displayName : unit.name}
                  </Typography>
                  <Typography variant="caption">
                    {unit.cost === totalCost ? (
                      `${unit.cost}`
                    ) : (
                      `${unit.cost} (${totalCost})`
                    )}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <div>
              {unit.upgradesEquipped.map((upgrade, upgradeIndex) => {
                if (upgrade) {
                  return (
                    <Grow
                      in
                      timeout={250}
                      key={upgrade.id}
                    >
                      <Chip
                        color="primary"
                        avatar={<Avatar src={upgrade.iconLocation} />}
                        label={upgrade.displayName ? upgrade.displayName : upgrade.name}
                        className={classes.upgradeChip}
                        onClick={() => changeViewFilter({ upgrade, type: 'UPGRADE_VIEW' })}
                        onDelete={() => removeUpgrade(unitIndex, upgradeIndex)}
                      />
                    </Grow>
                  );
                }
                return undefined;
              })}
            </div>
          </Grid>
          {!allUpgradesEquipped && (
            <Grid item>
              <Grow
                key="upgradeOptionButton"
                in
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
                        {option.name === 'Blaster' ? 'Weapon' : option.name}
                      </MenuItem>
                    ) : undefined
                  ))}
                </Menu>
              ) : undefined}
            </Grid>
          )}
          <Grid item>
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
            {desktopMenuOptions ? (
              <Menu
                id="optionMenu"
                anchorEl={optionMenuAnchor}
                open={Boolean(optionMenuAnchor)}
                onClose={() => this.setState({ optionMenuAnchor: null })}
              >
                {desktopMenuOptions.map((option, index) => (
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
          </Grid>
        </Grid>
        <div style={{ borderBottom: `1px solid ${darkMode ? '#212121' : 'lightgrey'}`, marginTop: '0.5rem' }} />
      </div>
    );
  }
}

export default withStyles(styles)(SideMenuListItem);
