import React from 'react';
import PropTypes from 'prop-types';
import ReactToPrint from 'react-to-print';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import ListText from 'newComponents/ListText';

class PrintListButton extends React.PureComponent {
  state = {}

  render() {
    const { list } = this.props;
    return (
      <div>
        <ReactToPrint
          trigger={() => (
            <IconButton color="inherit">
              <PrintIcon />
            </IconButton>
          )}
          content={() => this.componentRef}
        />
        <div style={{ display: 'none' }}>
          <ListText ref={el => (this.componentRef = el)} list={list} />
        </div>
      </div>
    );
  }
}

PrintListButton.propTypes = {
  list: PropTypes.shape({
    faction: PropTypes.string,
    mode: PropTypes.string,
    title: PropTypes.string,
    units: PropTypes.array,
    commands: PropTypes.array,
    notes: PropTypes.string,
    uniques: PropTypes.object
  }).isRequired
};

export default PrintListButton;
