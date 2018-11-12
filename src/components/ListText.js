import React from 'react';

class ListText extends React.Component {
  state = {};

  unitToText = (unit, index) => {
    const unitText = [];
    let upgradeText = ` - ${unit.name} (${unit.cost})`;
    let totalCost = unit.cost;
    if (unit.count > 1) upgradeText = `- ${unit.count}x ${unit.name} (${unit.cost})`;
    unit.upgradesEquipped.forEach((upgrade) => {
      if (upgrade) {
        totalCost += upgrade.cost;
        upgradeText = upgradeText.concat(` + ${upgrade.name} (${upgrade.cost})`);
      }
    });
    if (unit.count > 1) totalCost *= unit.count;
    return (
      <div key={`${unit.name}_${index}`}>
        {`${unitText} ${upgradeText} = ${totalCost}\n`}
      </div>
    );
  }

  unitsToPlainText = (type, units) => {
    return `
    ${type}:
    \n
    `;
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
      let unitTotal = 0;
      switch (unit.rank) {
        case 'commander':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          commanders.push(unit);
          break;
        case 'operative':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          operatives.push(unit);
          break;
        case 'corps':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          corps.push(unit);
          break;
        case 'special':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          special.push(unit);
          break;
        case 'support':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          support.push(unit);
          break;
        case 'heavy':
          unitTotal += unit.totalCost;
          unit.upgradesEquipped.forEach((upgrade) => {
            if (upgrade) unitTotal += upgrade.cost;
          });
          pointTotal += unit.count * unitTotal;
          heavy.push(unit);
          break;
        default:
      }
    });
    const listString = `
      Title: ${list.title}\n
      Faction: ${list.faction}\n
      Mode: ${list.mode}${'\n'}

      ${this.unitsToPlainText('Commanders', commanders)}
      ${this.unitsToPlainText('Operatives', operatives)}
      ${this.unitsToPlainText('Corps', corps)}
      ${this.unitsToPlainText('Special Forces', special)}
      ${this.unitsToPlainText('Support', support)}
      ${this.unitsToPlainText('Heavy', heavy)}
      Total: ${pointTotal}/${(list.mode === 'standard' ? 800 : 1600)}
      Commands:
      ${list.commands.forEach((command) => {
        return `${command.name} (${command.pips})`;
      })}
      Notes:
      ${list.notes}
    `;
    return (
      <div>
        <div id="listText">
          <h3>Legion HQ{'\n'}</h3>
          Title: {list.title+'\n'}
          <br />
          Faction: {list.faction+'\n'}
          <br />
          Mode: {list.mode+'\n'}
          <br />
          <br />
          {commanders.length > 0 && (
            <div>
              Commanders:{'\n'}
              <br />
            </div>
          )}
          {commanders.map((unit, index) => this.unitToText(unit, index))}
          {operatives.length > 0 && (
            <div>
              Operatives:{'\n'}
              <br />
            </div>
          )}
          {operatives.map((unit, index) => this.unitToText(unit, index))}
          {corps.length > 0 && (
            <div>
              Corps:{'\n'}
              <br />
            </div>
          )}
          {corps.map((unit, index) => this.unitToText(unit, index))}
          {special.length > 0 && (
            <div>
              Special Forces:{'\n'}
              <br />
            </div>
          )}
          {special.map((unit, index) => this.unitToText(unit, index))}
          {support.length > 0 && (
            <div>
              Support:{'\n'}
              <br />
            </div>
          )}
          {support.map((unit, index) => this.unitToText(unit, index))}
          {heavy.length > 0 && (
            <div>
              Heavy:{'\n'}
              <br />
            </div>
          )}
          {heavy.map((unit, index) => this.unitToText(unit, index))}
          <br />
          Total: {`${pointTotal}/${(list.mode === 'standard' ? 800 : 1600)}\n`}
          <br />
          <br />
          Commands:{'\n'}
          {list.commands.map(command => (
            <div key={command.name}>
              {` - ${command.name} (${command.pips})\n`}
              <br />
            </div>
          ))}
          <br />
          {list.notes ? (
            <div>
              Notes:{'\n'}
              {` ${list.notes}`}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

// <textarea value={listString} style={{ display: 'none' }} />

export default ListText;
