import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppConfig from '@/constants/AppConfig';

import DoctorProductionStep from '@/containers/Density/SubmitData/DoctorProductionStep';
import HygeinistProductionStep from '@/containers/Density/SubmitData/HygeinistProductionStep';
import CollectionsStep from '@/containers/Density/SubmitData/CollectionsStep';

class DensitySubmitData extends Component {
  render() {
    const {
      match: {
        params: { step },
      },
    } = this.props;

    const {
      DOCTOR_PRODUCTION,
      HYGEINIST_PRODUCTION,
      COLLECTIONS,
    } = AppConfig.DENTISTRY_SUBMIT_DATA_STEPS;

    return (
      <div className="submit-data-container">
        {step === DOCTOR_PRODUCTION && <DoctorProductionStep />}
        {step === HYGEINIST_PRODUCTION && <HygeinistProductionStep />}
        {step === COLLECTIONS && <CollectionsStep />}
      </div>
    );
  }
}

DensitySubmitData.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.string.isRequired
    })
  }),
};

export default DensitySubmitData;
