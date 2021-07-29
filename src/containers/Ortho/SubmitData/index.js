import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppConfig from '@/constants/AppConfig';

import LaboratoryStep from '@/containers/Ortho/SubmitData/LaboratoryStep';
import CollectionsStep from '@/containers/Ortho/SubmitData/CollectionsStep';
import DoctorSalaryStep from '@/containers/Ortho/SubmitData/DoctorSalaryStep';
import OccupanyAndHPStep from '@/containers/Ortho/SubmitData/OccupanyAndHPStep';
import PatientActivityStep from '@/containers/Ortho/SubmitData/PatientActivityStep';
import DoctorProductionStep from '@/containers/Ortho/SubmitData/DoctorProductionStep';
import StaffCompensationStep from '@/containers/Ortho/SubmitData/StaffCompensationStep';
import SuppliesAndMarketingStep from '@/containers/Ortho/SubmitData/SuppliesAndMarketingStep';
import AdministrativeServicesStep from '@/containers/Ortho/SubmitData/AdministrativeServicesStep';
import SolvencySavingsROIFundsStep from '@/containers/Ortho/SubmitData/SolvencySavingsROIFundsStep';

class DensitySubmitData extends Component {
  render() {
    const {
      match: {
        params: { step },
      },
    } = this.props;

    const {
      LABORTORY,
      COLLECTIONS,
      DOCTOR_SALARY,
      PATIENT_ACTIVITY,
      OCCUPANY_AND_H_P,
      DOCTOR_PRODUCTION,
      STAFF_COMPENSATION,
      SUPPLIES_MARKETING,
      ADMINISTRATIVE_SERVICES,
      SOLVENCY_SAVINGS_ROI_FUNDS,
    } = AppConfig.ORTHO_SUBMIT_DATA_STEPS;

    return (
      <div className="submit-data-container">
        {step === DOCTOR_PRODUCTION && <DoctorProductionStep />}
        {step === COLLECTIONS && <CollectionsStep />}
        {step === PATIENT_ACTIVITY && <PatientActivityStep />}
        {step === STAFF_COMPENSATION && <StaffCompensationStep />}
        {step === OCCUPANY_AND_H_P && <OccupanyAndHPStep />}
        {step === SUPPLIES_MARKETING && <SuppliesAndMarketingStep />}
        {step === LABORTORY && <LaboratoryStep />}
        {step === ADMINISTRATIVE_SERVICES && <AdministrativeServicesStep />}
        {step === DOCTOR_SALARY && <DoctorSalaryStep />}
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
