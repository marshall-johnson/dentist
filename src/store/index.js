import { configureStore, combineReducers } from '@reduxjs/toolkit';

import error from './error';
import auth from './auth';
import classRoom from './classRoom';
import classRoomScheduled from './classRoomScheduled';
import classRoomCompleted from './classRoomCompleted';
import flashMessage from './flashMessage';

const reducer = combineReducers({
  error,
  auth,
  classRoom,
  flashMessage,
  classRoomScheduled,
  classRoomCompleted,
});

const store = configureStore({
  reducer,
});

export default store;
