import { combineReducers } from '@reduxjs/toolkit';
import appReducer from 'components/App/App.slice';
import playerReducer from 'components/Player/Player.slice';

const rootReducer = combineReducers({
  app: appReducer,
  player: playerReducer,
});

export default rootReducer;
