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
      document.title = AlgorithmService.getAlgoTitle(action.payload);
    },
  },
});

export const { updateAlgorithm } = appSlice.actions;
export default appSlice.reducer;
