import React, { Component } from 'react';
import BaseEnergyContainer from '../BaseEnergy';

class AttitudeAndSkillsContainer extends Component {
  render() {
    return (
      <BaseEnergyContainer
        title="Attitude And Skills"
        questionType="attitude_and_skills"
      />
    );
  }
}

AttitudeAndSkillsContainer.propTypes = {};

export default AttitudeAndSkillsContainer;
