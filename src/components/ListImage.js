import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  upgradeChip: {
    marginRight: '0.1rem'
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
    width: '15px'
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
    marginRight: '40px',
    marginTop: '37px'
  },
  rankBadge: {
    marginTop: '8px',
    marginRight: '40px'
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

class ListImage extends React.Component {
  state = {};

  render() {
    const {
      list,
      classes
    } = this.props;
    const maxPoints = list.mode === 'standard' ? 800 : 1600;
    let pointTotal = 0;
    list.units.forEach((unit) => {
      unit.upgradesEquipped.forEach((upgrade) => {
        if (upgrade) pointTotal += upgrade.cost * unit.count;
      });
      pointTotal += unit.count * unit.totalCost;
    });
    return (
      <div
        id="listToImage"
        style={{ backgroundColor: 'white' }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography>
              {`${list.title} - ${pointTotal}/${maxPoints}`}
            </Typography>
          </Grid>
        </Grid>
        <List dense>
          {list.units.map((unit, index) => {
            const key = `${unit.name}_${index}`;
            let totalCost = unit.cost;
            unit.upgradesEquipped.forEach((upgrade) => {
              if (upgrade) { totalCost += upgrade.cost; }
            });
            return (
              <div key={key}>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item xs={4}>
                    <Grid item container>
                      <Grid item>
                        <Badge
                          color="primary"
                          classes={{
                            badge: classes.rankBadge
                          }}
                          badgeContent={(
                            <img
                              alt={unit.rank}
                              className={classes[unit.rank]}
                              src={`/rankIcons/${unit.rank.replace(' ', '%20')}.svg`}
                            />
                          )}
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
                            />
                          </Badge>
                        </Badge>
                      </Grid>
                      <Grid item>
                        <div style={{ marginLeft: '0.5rem' }}>
                          <Typography>
                            {unit.displayName ? unit.displayName : unit.name}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    {unit.upgradesEquipped.reduce((filtered, upgrade) => {
                      if (upgrade) {
                        filtered.push(
                          <Chip
                            key={upgrade.name}
                            color="primary"
                            avatar={<Avatar src={upgrade.iconLocation} />}
                            label={upgrade.displayName ? upgrade.displayName : upgrade.name}
                            className={classes.upgradeChip}
                          />
                        );
                      }
                      return filtered;
                    }, [])}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {unit.cost === totalCost ? (
                        `${unit.cost}`
                      ) : (
                        `${unit.cost} (${totalCost})`
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <div style={{ borderBottom: '1px solid lightgrey', marginTop: '0.5rem', marginBottom: '0.5rem' }} />
              </div>
            );
          })}
        </List>
        <Grid
          container
          spacing={0}
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <Grid
            item
            container
            direction="row"
            alignItems="stretch"
            justify="center"
          >
            {list.commands.map(command => (
              <Grid item key={command.name}>
                <Chip
                  color="primary"
                  avatar={(
                    <Avatar
                      style={{
                        width: '45px',
                        height: '45px'
                      }}
                    >
                      <img
                        alt={command.name}
                        src={command.iconLocation}
                        style={{
                          width: '45px',
                          height: '45px'
                        }}
                      />
                    </Avatar>
                  )}
                  label={`${command.name} (${command.pips})`}
                  style={{ marginRight: '5px' }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ListImage);
