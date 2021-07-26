import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '@/routes/PrivateRoute';
import HomeContainer from '@/containers/HomeContainer';
import LoginContainer from '@/containers/LoginContainer';
import ProfileContainer from '@/containers/ProfileContainer';
import NotFoundContainer from '@/containers/NotFoundContainer';
import DashboardContainer from '@/containers/DashboardContainer';
import StudentsScheduleContainer from '@/containers/students/ScheduleContainer';
import StudentsSubmitDataContainer from '@/containers/students/SubmitDataContainer';
import StudentsPurchaseItemsContainer from '@/containers/students/PurchaseItemsContainer';
import ReportContainer from '@/containers/ReportContainer';
import CoachingContainer from '@/containers/CoachingContainer';

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
        path='*'
        component={NotFoundContainer}
      />
    </Switch>
  );
}
export default Routes;
