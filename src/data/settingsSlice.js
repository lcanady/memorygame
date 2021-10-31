import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: false,
  players: 1,
  grid: false,
  started: false,
  gameMap: [],
  max: false,
  score: 0,
  clock: 0,
  pauseClock: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme;
    },
    toggleMax: (state, { payload }) => {
      state.max = payload ? true : false;
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
    setScore: (state, { payload }) => {
      state.score = payload;
    },
    setClock: (state, { payload }) => {
      state.clock = payload;
    },
    setPauseClock: (state, { payload }) => {
      state.pauseClock = payload;
    },
  },
});

export const {
  setPauseClock,
  setClock,
  setScore,
  toggleMax,
  setGameMap,
  toggleTheme,
  toggleGrid,
  toggleStarted,
  setPlayers,
} = settingsSlice.actions;

export default settingsSlice.reducer;
