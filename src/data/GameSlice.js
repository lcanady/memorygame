import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameMap: [],
  max: false,
  score: 0,
  clock: 0,
  pauseClock: true,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    toggleMax: (state, { payload }) => {
      state.max = payload ? true : false;
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

export const { toggleMax, setGameMap, setScore, setClock, setPauseClock } =
  gameSlice.actions;

export default gameSlice.reducer;
