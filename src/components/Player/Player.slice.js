import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    playing: false,
    speed: 1,
    progress: 0,
  },
  reducers: {
    updateSpeed(state, action) {
      state.speed = action.payload;
    },
    togglePlay(state, action) {
      state.playing = !state.playing;
    },
    setProgress(state, action) {
      let progress = parseInt(action.payload);
      progress = Math.max(0, progress);
      progress = Math.min(progress, 100);
      state.progress = progress;
    }
  },
});

export const { 
  updateSpeed,
  togglePlay,
  setProgress,
 } = playerSlice.actions;
export default playerSlice.reducer;
