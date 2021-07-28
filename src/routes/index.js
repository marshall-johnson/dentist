import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppConfig from '@/constants/AppConfig';
import ReportContainer from '@/containers/ReportContainer';
import NotFoundContainer from '@/containers/NotFoundContainer';
import CoachingContainer from '@/containers/CoachingContainer';
import DashboardContainer from '@/containers/DashboardContainer';
import OrthoSubmitDataContainer from '@/containers/Ortho/SubmitData';
import DensitySubmitDataContainer from '@/containers/Density/SubmitData';
import StudentsScheduleContainer from '@/containers/Students/ScheduleContainer';
import StudentsSubmitDataContainer from '@/containers/Students/SubmitDataContainer';
import StudentsPurchaseItemsContainer from '@/containers/Students/PurchaseItemsContainer';

function Routes() {
  return (
    <Switch>
      <Route
        exact
        path='/'
        component={DashboardContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.DASHBOARD}`}
        component={DashboardContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.STUDENTS_SCHEDULE}`}
        component={StudentsScheduleContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.STUDENTS_SUBMIT_DATA}`}
        component={StudentsSubmitDataContainer}
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
        path='*'
        component={NotFoundContainer}
      />
    </Switch>
  );
}
export default Routes;
