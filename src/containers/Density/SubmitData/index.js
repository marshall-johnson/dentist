import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppConfig from '@/constants/AppConfig';

import CollectionsStep from '@/containers/Density/SubmitData/CollectionsStep';
import OccupanyAndHPStep from '@/containers/Density/SubmitData/OccupanyAndHPStep';
import PatientActivityStep from '@/containers/Density/SubmitData/PatientActivityStep';
import StaffCompensationStep from '@/containers/Density/SubmitData/StaffCompensationStep';
import DoctorProductionStep from '@/containers/Density/SubmitData/DoctorProductionStep';
import HygeinistProductionStep from '@/containers/Density/SubmitData/HygeinistProductionStep';
import LabortoryAndDoctorsStep from '@/containers/Density/SubmitData/LabortoryAndDoctorsStep';
import SuppliesAndMarketingStep from '@/containers/Density/SubmitData/SuppliesAndMarketingStep';
import AdministrativeServicesStep from '@/containers/Density/SubmitData/AdministrativeServicesStep';
import SolvencySavingsROIFundsStep from '@/containers/Density/SubmitData/SolvencySavingsROIFundsStep';

class DensitySubmitData extends Component {
  render() {
    const {
      match: {
        params: { step },
      },
    } = this.props;

    const {
      COLLECTIONS,
      PATIENT_ACTIVITY,
      OCCUPANY_AND_H_P,
      STAFF_COMPENSATION,
      LABORTORY_DOCTORS,
      DOCTOR_PRODUCTION,
      SUPPLIES_MARKETING,
      HYGEINIST_PRODUCTION,
      ADMINISTRATIVE_SERVICES,
      SOLVENCY_SAVINGS_ROI_FUNDS,
    } = AppConfig.DENTISTRY_SUBMIT_DATA_STEPS;

    return (
      <div className="submit-data-container">
        {step === DOCTOR_PRODUCTION && <DoctorProductionStep />}
        {step === HYGEINIST_PRODUCTION && <HygeinistProductionStep />}
        {step === COLLECTIONS && <CollectionsStep />}
        {step === PATIENT_ACTIVITY && <PatientActivityStep />}
        {step === STAFF_COMPENSATION && <StaffCompensationStep />}
        {step === OCCUPANY_AND_H_P && <OccupanyAndHPStep />}
        {step === SUPPLIES_MARKETING && <SuppliesAndMarketingStep />}
        {step === LABORTORY_DOCTORS && <LabortoryAndDoctorsStep />}
        {step === ADMINISTRATIVE_SERVICES && <AdministrativeServicesStep />}
        {step === SOLVENCY_SAVINGS_ROI_FUNDS && <SolvencySavingsROIFundsStep />}
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
