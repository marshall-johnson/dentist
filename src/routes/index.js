import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppConfig from '@/constants/AppConfig';
import PrivateRoute from '@/routes/PrivateRoute';
import HomeContainer from '@/containers/HomeContainer';
import LoginContainer from '@/containers/LoginContainer';
import ReportContainer from '@/containers/ReportContainer';
import ProfileContainer from '@/containers/ProfileContainer';
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
        path='/login'
        component={LoginContainer}
      />
      <Route
        exact
        path='/'
        component={HomeContainer}
      />
      <PrivateRoute
        exact
        path='/me'
        component={ProfileContainer}
      />
      <Route
        exact
        path='/dashboard'
        component={DashboardContainer}
      />
      <Route
        exact
        path='/students/schedule'
        component={StudentsScheduleContainer}
      />
      <Route
        exact
        path='/students/submit-data'
        component={StudentsSubmitDataContainer}
      />
      <Route
        exact
        path='/students/purchase-items'
        component={StudentsPurchaseItemsContainer}
      />
      <Route
        exact
        path='/report'
        component={ReportContainer}
      />
      <Route
        exact
        path='/coaching'
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
