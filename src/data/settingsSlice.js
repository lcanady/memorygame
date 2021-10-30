import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: false,
  players: 1,
  grid: false,
  started: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme;
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
  },
});

export const { toggleTheme, toggleGrid, toggleStarted, setPlayers } =
  settingsSlice.actions;

export default settingsSlice.reducer;
