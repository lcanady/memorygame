import { configureStore } from "@reduxjs/toolkit";
import GameSlice from "./GameSlice";
import settingsSlice from "./settingsSlice";

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    game: GameSlice,
  },
});
