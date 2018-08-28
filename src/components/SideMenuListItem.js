import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';

const listItemStyles = {
  width: '100%',
  marginBottom: '0.25rem'
};
const listItemDivStyles = {
  borderRadius: '5px'
};
const upgradeDivStyles = {
  marginLeft: '0.5rem'
};
const unitIconStyles = {
  height: 40,
  width: 40,
  cursor: 'pointer',
  display: 'inline-block',
  bottom: '0.2rem',
  right: '1.5rem'
};
const commanderIconStyles = {
  position: 'absolute',
  height: '35px',
  width: '35px',
  top: '0.5rem',
  left: '2.65rem',
  zIndex: 10
};
const operativeIconStyles = {};
const corpsIconStyles = {
  position: 'absolute',
  height: '20px',
  width: '20px',
  top: '1rem',
  left: '3.1rem',
  zIndex: 10
};
const specialIconStyles = {
  position: 'absolute',
  height: '35px',
  width: '35px',
  top: '0.7rem',
  left: '2.6rem',
  zIndex: 10
};
const supportIconStyles = {
  position: 'absolute',
  height: '20px',
  width: '20px',
  top: '1rem',
  left: '3.1rem',
  zIndex: 10
};
const heavyIconStyles = {
  position: 'absolute',
  height: '33px',
  width: '33px',
  top: '0.7rem',
  left: '2.75rem',
  zIndex: 10
};
const rankIconStyles = {
  commander: commanderIconStyles,
  operative: operativeIconStyles,
  corps: corpsIconStyles,
  special: specialIconStyles,
  support: supportIconStyles,
  heavy: heavyIconStyles
};
const unitButtonStyles = {
  top: '1.65rem'
};
const upgradeChipStyles = {
  marginRight: '0.1rem'
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
      changeViewFilter
    } = this.props;
    return (
      <Slide
        in
        mountOnEnter
        unmountOnExit
        direction="right"
        timeout={250}
      >
        <div
          style={listItemDivStyles}
          onMouseEnter={this.turnOnHovered}
          onMouseLeave={this.turnOffHovered}
        >
          <ListItem style={listItemStyles}>
            <img
              alt={unit.rank}
              style={rankIconStyles[unit.rank]}
              src={`rankIcons/${unit.rank.replace(' ', '%20')}.svg`} 
            />
            <Avatar
              src={unit.iconLocation}
              style={unitIconStyles}
              onClick={() => changeViewFilter({ unitIndex, type: 'UNIT_VIEW' })}
            />
            <ListItemText
              primary={unit.name}
              secondary={unit.cost === unit.totalCost ? (
                `${unit.cost}`
              ) : (
                `${unit.cost} (${unit.totalCost})`
              )}
            />
            <ListItemSecondaryAction style={unitButtonStyles}>
              <Grow
                key="upgradeOptionButton"
                in={isHovered}
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
              <Grow
                key="menuOptionButton"
                in={isHovered}
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
          <div style={upgradeDivStyles}>
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
                      style={upgradeChipStyles}
                      onClick={() => changeViewFilter({ upgrade, type: 'UPGRADE_VIEW' })}
                      onDelete={() => removeUpgrade(unitIndex, upgradeIndex)}
                    />
                  </Grow>
                );
              }
              return undefined;
            })}
          </div>
        </div>
      </Slide>
    );
  }
}

export default SideMenuListItem;
