import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppConfig from '@/constants/AppConfig';
import ReportContainer from '@/containers/Reports';
import EnergyProfileReport from '@/containers/EnergyProfileReport';
import NotFoundContainer from '@/containers/NotFoundContainer';
import CoachingContainer from '@/containers/CoachingContainer';
import ProfitScanContainer from '@/containers/ProfitScanContainer';
import OrthoSubmitDataContainer from '@/containers/Ortho/SubmitData';
import RegistrationContainer from '@/containers/RegistrationContainer';
import DensitySubmitDataContainer from '@/containers/Density/SubmitData';
import ProfitAndLossContainer from '@/containers/ProfitAndLossContainer';
import EnergyContainer from '@/containers/EnergyConversion/EnergyContainer';
import EnergyProfileDataResult from '@/containers/EnergyProfileReport/DataResult';
import EnergyProfileDataAnalysis from '@/containers/EnergyProfileReport/DataAnalysis';
import DirectionContainer from '@/containers/EnergyConversion/DirectionContainer';
import StudentsScheduleContainer from '@/containers/Students/ScheduleContainer';
import StudentsSubmitDataContainer from '@/containers/Students/SubmitDataContainer';
import StudentsPurchaseItemsContainer from '@/containers/Students/PurchaseItemsContainer';
import AttitudeAndSkillsContainer from '@/containers/EnergyConversion/AttitudeAndSkillsContainer';
import RegistrationCreateUserContainer from '@/containers/RegistrationContainer/CreateUserContainer';
import StructureAndSystemsContainer from '@/containers/EnergyConversion/StructureAndSystemsContainer';
import CommunicationAndCoordinationContainer from '@/containers/EnergyConversion/CommunicationAndCoordinationContainer';
import ChartAudit from '@/containers/ChartAudit';
import CoachingPPP from '@/containers/Coaching/CoachingPPP';
import ChartAuditReport from '@/containers/ChartAuditReport';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" />
      <Route
        exact
        path={`${AppConfig.ROUTES.STUDENTS_SCHEDULE}/:step`}
        component={StudentsScheduleContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.STUDENTS_SUBMIT_DATA}`}
        component={StudentsSubmitDataContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.STUDENT_DATA}`}
        component={null}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.STUDENTS_PURCHASE_ITEMS}`}
        component={StudentsPurchaseItemsContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.REPORT}`}
        component={ReportContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.COACHING}`}
        component={CoachingContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.DENTISTRY}/:step`}
        component={DensitySubmitDataContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.ORTHO}/:step`}
        component={OrthoSubmitDataContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.REGISTRATION}`}
        component={RegistrationContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.REGISTRATION}/${AppConfig.REGISTRATIONS.CREATE_USER}`}
        component={RegistrationCreateUserContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.ENERGY}`}
        component={EnergyContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.DIRECTION}`}
        component={DirectionContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.STRUCTURE_AND_SYSTEMS}`}
        component={StructureAndSystemsContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.COMMUNICATION_AND_COORDINATION}`}
        component={CommunicationAndCoordinationContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.ATTITUDE_AND_SKILLS}`}
        component={AttitudeAndSkillsContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.ENERGY_PROFILE_REPORT}`}
        component={EnergyProfileReport}
      />

      <Route
        exact
        path={`${AppConfig.ROUTES.ENERGY_PROFILE}/${AppConfig.ENERGY_PROFILE.DATA_RESULT}`}
        component={EnergyProfileDataResult}
      />

      <Route
        exact
        path={`${AppConfig.ROUTES.ENERGY_PROFILE}/${AppConfig.ENERGY_PROFILE.DATA_ANALYSIS}`}
        component={EnergyProfileDataAnalysis}
      />

      <Route
        exact
        path={`${AppConfig.ROUTES.PROFIT_AND_LOSS}`}
        component={ProfitAndLossContainer}
      />

      <Route
        exact
        path={`${AppConfig.ROUTES.PROFIT_SCAN}`}
        component={ProfitScanContainer}
      />

      <Route
        exact
        path={`${AppConfig.ROUTES.CHART_AUDIT}`}
        component={ChartAudit}
      />

      <Route
        exact
        path={`${AppConfig.ROUTES.COACHING_PPP}`}
        component={CoachingPPP}
      />

      <Route
        exact
        path={`${AppConfig.ROUTES.CHART_AUDIT_REPORT}`}
        component={ChartAuditReport}
      />

      <Route path="*" component={NotFoundContainer} />
    </Switch>
  );
}
export default Routes;
