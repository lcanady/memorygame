import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: false,
  players: 1,
  grid: false,
  started: false,
  gameMap: [],
  max: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme;
    },
    toggleMax: (state) => {
      state.max = !state.max;
    },
    toggleGrid: (state) => {
      state.grid = !state.grid;
    },
    toggleStarted: (state) => {
      state.started = !state.started;
    },
    setPlayers: (state, { payload }) => {
      state.players = payload;
    },

    setGameMap: (state, { payload }) => {
      state.gameMap = payload;
    },
  },
});

export const {
  toggleMax,
  setGameMap,
  toggleTheme,
  toggleGrid,
  toggleStarted,
  setPlayers,
} = settingsSlice.actions;

export default settingsSlice.reducer;
