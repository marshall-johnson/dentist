import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppConfig from '@/constants/AppConfig';

import LaboratoryStep from '@/containers/Density/SubmitData/LaboratoryStep';
import CollectionsStep from '@/containers/Density/SubmitData/CollectionsStep';
import OccupanyAndHPStep from '@/containers/Density/SubmitData/OccupanyAndHPStep';
import PatientActivityStep from '@/containers/Density/SubmitData/PatientActivityStep';
import DoctorProductionStep from '@/containers/Density/SubmitData/DoctorProductionStep';
import StaffCompensationStep from '@/containers/Density/SubmitData/StaffCompensationStep';
import DoctorSalaryStep from '@/containers/Density/SubmitData/DoctorSalaryStep';
import HygeinistProductionStep from '@/containers/Density/SubmitData/HygeinistProductionStep';
import SuppliesAndMarketingStep from '@/containers/Density/SubmitData/SuppliesAndMarketingStep';
import AdministrativeServicesStep from '@/containers/Density/SubmitData/AdministrativeServicesStep';
import SolvencySavingsROIFundsStep from '@/containers/Density/SubmitData/SolvencySavingsROIFundsStep';

class DensitySubmitData extends Component {
  componentDidMount() {
    window.onbeforeunload = (e) => {
      localStorage.removeItem('doctorProduction');
      localStorage.removeItem('hygienistProduction');
    };
  }

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
      SUPPLIES_MARKETING,
      STAFF_COMPENSATION,
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
