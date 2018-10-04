import React from 'react';

class ListText extends React.Component {
  state = {};

  unitToText = (unit, index) => {
    const unitText = [];
    let upgradeText = ` - ${unit.name} (${unit.cost}) `;
    unit.upgradesEquipped.forEach((upgrade) => {
      if (upgrade) {
        upgradeText = upgradeText.concat(` + ${upgrade.name} (${upgrade.cost})`);
      }
    });
    return (
      <div key={`${unit.name}_${index}`}>
        {`${unitText} ${upgradeText} = ${unit.totalCost}`}
      </div>
    );
  }

  render() {
    const { list } = this.props;
    if (!list) {
      return (
        <div>
          No list.
        </div>
      );
    }
    const commanders = [];
    const operatives = [];
    const corps = [];
    const special = [];
    const support = [];
    const heavy = [];
    let pointTotal = 0;
    list.units.forEach((unit) => {
      switch (unit.rank) {
        case 'commander':
          pointTotal += unit.totalCost;
          commanders.push(unit);
          break;
        case 'operative':
          pointTotal += unit.totalCost;
          operatives.push(unit);
          break;
        case 'corps':
          pointTotal += unit.totalCost;
          corps.push(unit);
          break;
        case 'special':
          pointTotal += unit.totalCost;
          special.push(unit);
          break;
        case 'support':
          pointTotal += unit.totalCost;
          support.push(unit);
          break;
        case 'heavy':
          pointTotal += unit.totalCost;
          heavy.push(unit);
          break;
        default:
      }
    });
    return (
      <div style={{ overflowY: 'scroll' }}>
        <h3>Legion HQ</h3>
        Title: {list.title}
        <br />
        Faction: {list.faction}
        <br />
        Mode: {list.mode}
        <br />
        <br />
        {commanders.length > 0 && (
          <div>
            Commanders:
            <br />
          </div>
        )}
        {commanders.map((unit, index) => this.unitToText(unit, index))}
        {operatives.length > 0 && (
          <div>
            Operatives:
            <br />
          </div>
        )}
        {operatives.map((unit, index) => this.unitToText(unit, index))}
        {corps.length > 0 && (
          <div>
            Corps:
            <br />
          </div>
        )}
        {corps.map((unit, index) => this.unitToText(unit, index))}
        {special.length > 0 && (
          <div>
            Special Forces:
            <br />
          </div>
        )}
        {special.map((unit, index) => this.unitToText(unit, index))}
        {support.length > 0 && (
          <div>
            Support:
            <br />
          </div>
        )}
        {support.map((unit, index) => this.unitToText(unit, index))}
        {heavy.length > 0 && (
          <div>
            Heavy:
            <br />
          </div>
        )}
        {heavy.map((unit, index) => this.unitToText(unit, index))}
        <br />
        Total: {`${pointTotal}/${(list.mode === 'standard' ? 800 : 1600)}`}
        <br />
        <br />
        Commands:
        {list.commands.map(command => (
          <div key={command.name}>
            {` - ${command.name} (${command.pips})`}
            <br />
          </div>
        ))}
        <br />
        Notes:
        {` ${list.notes}`}
      </div>
    );
  }
}

export default ListText;
