import React, { Component } from 'react';
import BaseEnergyContainer from '../BaseEnergy';

class DirectionContainer extends Component {
  render() {
    return <BaseEnergyContainer title="Direction" questionType="direction" />;
  }
}

DirectionContainer.propTypes = {};

export default DirectionContainer;
