import React, { Component } from 'react';
import BaseEnergyContainer from '../BaseEnergy';

class StructureAndSystemsContainer extends Component {
  render() {
    return (
      <BaseEnergyContainer
        title="Structure And Systems"
        questionType="structure_and_systems"
      />
    );
  }
}

StructureAndSystemsContainer.propTypes = {};

export default StructureAndSystemsContainer;
