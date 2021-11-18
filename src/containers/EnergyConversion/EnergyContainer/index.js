import React, { Component } from 'react';
import BaseEnergyContainer from '../BaseEnergy';

class EnergyContainer extends Component {
  render() {
    return <BaseEnergyContainer title="Energy" questionType="energy" />;
  }
}

EnergyContainer.propTypes = {};

export default EnergyContainer;
