import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./StateSlice";

export const store = configureStore({
  reducer: {
    state: stateSlice,
  },
});

export default store;
