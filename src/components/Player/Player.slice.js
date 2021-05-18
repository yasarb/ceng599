import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    playing: false,
    speed: 1,
  },
  reducers: {
    updateSpeed(state, action) {
      state.speed = action.payload;
    },
    togglePlay(state, action) {
      state.playing = !state.playing;
    }
  },
});

export const { 
  updateSpeed,
  togglePlay,
 } = playerSlice.actions;
export default playerSlice.reducer;
