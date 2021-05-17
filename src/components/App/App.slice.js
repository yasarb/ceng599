import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    activeAlgorithm: 'hello',
  },
  reducers: {
    updateAlgorithm(state, action) {
      state.activeAlgorithm = action.payload;
    },
  },
});

export const { updateAlgorithm } = appSlice.actions;
export default appSlice.reducer;
