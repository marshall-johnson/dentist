import { configureStore, combineReducers } from '@reduxjs/toolkit';

import error from './error';
import auth from './auth';
import doctor from './doctor';
import product from './product';
import purchase from './purchase';
import classRoom from './classRoom';
import hygienist from './hygienist';
import flashMessage from './flashMessage';
import questionsSurvey from './questionsSurvey';
import classRoomScheduled from './classRoomScheduled';
import classRoomCompleted from './classRoomCompleted';
import student from './student';
import studentSurvey from './studentSurvey';
import profitPotential from './profitPotential';

const reducer = combineReducers({
  error,
  auth,
  doctor,
  product,
  purchase,
  classRoom,
  hygienist,
  flashMessage,
  questionsSurvey,
  classRoomScheduled,
  classRoomCompleted,
  student,
  studentSurvey,
  profitPotential,
});

const store = configureStore({
  reducer,
});

export default store;
