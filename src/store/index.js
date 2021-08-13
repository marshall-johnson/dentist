import { configureStore, combineReducers } from '@reduxjs/toolkit';

import error from './error';
import auth from './auth';
import classRoom from './classRoom';
import classRoomScheduled from './classRoomScheduled';
import classRoomCompleted from './classRoomCompleted';

const reducer = combineReducers({
  error,
  auth,
  classRoom,
  classRoomScheduled,
  classRoomCompleted,
});

const store = configureStore({
  reducer,
});

export default store;
