import { configureStore } from "@reduxjs/toolkit";
import capsuleReducer from "./slices/capsuleSlice";
import capsuleLandingReducer from "./slices/capsuleLandingSlice";

export const store = configureStore({
  reducer: {
    capsules: capsuleReducer,
    capsuleLanding: capsuleLandingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
