import { configureStore, combineReducers } from '@reduxjs/toolkit';

import error from './error';
import auth from './auth';
import doctor from './doctor';
import classRoom from './classRoom';
import hygienist from './hygienist';
import flashMessage from './flashMessage';
import classRoomScheduled from './classRoomScheduled';
import classRoomCompleted from './classRoomCompleted';

const reducer = combineReducers({
  error,
  auth,
  doctor,
  classRoom,
  hygienist,
  flashMessage,
  classRoomScheduled,
  classRoomCompleted,
});

const store = configureStore({
  reducer,
});

export default store;
