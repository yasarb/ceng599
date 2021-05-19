import { createSlice } from '@reduxjs/toolkit';
import { AlgorithmService } from 'algorithms';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    activeAlgorithm: null,
  },
  reducers: {
    updateAlgorithm(state, action) {
      state.activeAlgorithm = action.payload;
      document.title = Object.assign({}, ...AlgorithmService.listAlgoNames().map((x) => ({[x.key]: x.name})))[action.payload];
    },
  },
});

export const { updateAlgorithm } = appSlice.actions;
export default appSlice.reducer;
