import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    playing: false,
    speed: 0.01, // 100 ms
    progress: 0,
  },
  reducers: {
    setSpeed(state, action) {
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
  setSpeed,
  togglePlay,
  setProgress,
 } = playerSlice.actions;
export default playerSlice.reducer;
