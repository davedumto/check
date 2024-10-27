import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Capsule } from "@/app/types";
import { RootState } from "./../store";

interface CapsulesState {
  capsules: Capsule[];
  loading: boolean;
  error: string | null;
}
const initialState: CapsulesState = {
  capsules: [],
  loading: false,
  error: null,
};

// creating an async thunk
export const fetchCapsules = createAsyncThunk(
  "capsules/fetchCapsules",
  async (_, { getState }) => {
    const { capsules } = (getState() as RootState).capsules;
    if (capsules.length > 0) return capsules;

    const response = await axios.get<Capsule[]>(
      "https://api.spacexdata.com/v3/capsules"
    );
    return response.data;
  }
);

const capsuleSlice = createSlice({
  name: "capsules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCapsules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCapsules.fulfilled,
        (state, action: PayloadAction<Capsule[]>) => {
          state.capsules = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCapsules.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch capsules";
      });
  },
});

export default capsuleSlice.reducer;
