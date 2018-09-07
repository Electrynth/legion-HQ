import React from 'react';
import ListText from 'components/ListText';

class ExportedListContainer extends React.Component {
  state = {};

  render() {
    const list = this.props.list || null;
    return <ListText list={list} />;
  }
}

export default ExportedListContainer;
