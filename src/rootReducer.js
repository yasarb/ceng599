import { combineReducers } from '@reduxjs/toolkit';
import appReducer from 'components/App/App.slice';

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
