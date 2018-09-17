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
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
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
  counterBadge: {
    marginRight: '45px',
    marginTop: '40px'
  },
  rankBadge: {
    marginTop: '5px',
    marginRight: '45px'
  },
  avatar: {
    width: '45px',
    height: '45px',
    marginLeft: '10px'
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
      classes
    } = this.props;
    let allUpgradesEquipped = false;
    let numUpgradesEquipped = 0;
    const maxNumUpgrades = unit.upgradesEquipped.length;
    unit.upgradesEquipped.forEach((upgrade) => {
      if (upgrade) numUpgradesEquipped += 1;
    });
    if (numUpgradesEquipped === maxNumUpgrades) allUpgradesEquipped = true;
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={1}>
            <Badge
              color="primary"
              badgeContent={(
                <img
                  alt={unit.rank}
                  className={classes[unit.rank]}
                  src={`rankIcons/${unit.rank.replace(' ', '%20')}.svg`}
                />
              )}
              classes={{
                badge: classes.rankBadge
              }}
            >
              <Badge
                color="primary"
                badgeContent={count}
                classes={{
                  badge: count > 1 ? classes.counterBadge : classes.noBadge
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
          <Grid item xs={2}>
            <div>
              <Typography>
                {unit.name}
              </Typography>
              <Typography variant="caption">
                {unit.cost === unit.totalCost ? (
                  `${unit.cost}`
                ) : (
                  `${unit.cost} (${unit.totalCost})`
                )}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={allUpgradesEquipped ? 8 : 7}>
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
                        label={upgrade.name}
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
            <Grid item xs={1}>
              <Grow
                key="upgradeOptionButton"
                in={true}
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
                        {option.name}
                      </MenuItem>
                    ) : undefined
                  ))}
                </Menu>
              ) : undefined}
            </Grid>
          )}
          <Grid item xs={1}>
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
          </Grid>
        </Grid>
        <hr style={{ opacity: 0.5 }} />
      </div>
    );
  }
}

export default withStyles(styles)(SideMenuListItem);
