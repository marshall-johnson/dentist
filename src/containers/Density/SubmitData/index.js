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
import { connect } from 'react-redux';
import {
  showDentistryData,
  updateDentistryData,
} from '@/actions/dentistryActions';
import queryString from 'query-string';
import './styles.scss';

class DensitySubmitData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { studentId },
      },
      showDentistryData,
      location,
    } = this.props;

    const params = queryString.parse(location.search);

    const data = await showDentistryData(studentId, params);
    data &&
      this.setState({
        data,
      });
  }

  updateData = (data) => {
    const {
      match: {
        params: { studentId },
      },
      updateDentistryData,
      location,
    } = this.props;

    const params = queryString.parse(location.search);
    updateDentistryData(studentId, {
      ...params,
      ...data,
    });
  };

  render() {
    const {
      match: {
        params: { step },
      },
    } = this.props;
    const { data } = this.state;

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
        {step === DOCTOR_PRODUCTION && (
          <DoctorProductionStep
            data={data?.doctor_production}
            updateData={this.updateData}
            backPath={AppConfig.ROUTES.REVIEW_SUBMITED}
          />
        )}
        {step === HYGEINIST_PRODUCTION && (
          <HygeinistProductionStep
            data={data?.hygienist_production}
            updateData={this.updateData}
          />
        )}
        {step === COLLECTIONS && (
          <CollectionsStep
            data={data?.collections}
            updateData={this.updateData}
          />
        )}
        {step === PATIENT_ACTIVITY && (
          <PatientActivityStep
            data={data?.patient_activity}
            updateData={this.updateData}
          />
        )}
        {step === STAFF_COMPENSATION && (
          <StaffCompensationStep
            data={data?.staff_compensation}
            updateData={this.updateData}
          />
        )}
        {step === OCCUPANY_AND_H_P && (
          <OccupanyAndHPStep
            data={data?.occupancy_and_hp}
            updateData={this.updateData}
          />
        )}
        {step === SUPPLIES_MARKETING && (
          <SuppliesAndMarketingStep
            data={data?.supplies_and_marketing}
            updateData={this.updateData}
          />
        )}
        {step === LABORTORY && (
          <LaboratoryStep
            data={data?.laboratory}
            updateData={this.updateData}
          />
        )}
        {step === ADMINISTRATIVE_SERVICES && (
          <AdministrativeServicesStep
            data={data?.administrative_services}
            updateData={this.updateData}
          />
        )}
        {step === DOCTOR_SALARY && (
          <DoctorSalaryStep
            data={data?.doctor_salary}
            updateData={this.updateData}
          />
        )}
        {step === SOLVENCY_SAVINGS_ROI_FUNDS && (
          <SolvencySavingsROIFundsStep
            data={data?.solvency_savings_roi_funds}
            updateData={this.updateData}
          />
        )}
      </div>
    );
  }
}

DensitySubmitData.propTypes = {
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.string.isRequired,
      studentId: PropTypes.string,
    }),
  }),
  showDentistryData: PropTypes.func,
  updateDentistryData: PropTypes.func,
};

export default connect(null, {
  showDentistryData,
  updateDentistryData,
})(DensitySubmitData);
