import { createSlice } from '@reduxjs/toolkit';
import { AlgorithmService } from 'algorithms';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    activeAlgorithm: 'homepage',
    activeFile: 'readme',
  },
  reducers: {
    updateAlgorithm(state, action) {
      state.activeAlgorithm = action.payload;
      document.title = AlgorithmService.getAlgoTitle(action.payload);

      if (action.payload !== 'homepage') {
        state.activeFile = 'code';
      }
    },
    updateActiveFile(state, action) {
      state.activeFile = action.payload;
    }
  },
});

export const { updateAlgorithm, updateActiveFile } = appSlice.actions;
export default appSlice.reducer;
