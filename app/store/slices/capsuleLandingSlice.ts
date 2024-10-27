import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Capsule } from "@/app/types";

interface CapsuleLandingState {
  capsules: Capsule[];
  localCapsules: Capsule[];
  editableCapsule: Capsule | null;
  isEditing: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: CapsuleLandingState = {
  capsules: [],
  localCapsules: [],
  editableCapsule: null,
  isEditing: false,
  loading: false,
  error: null,
};

const capsuleLandingSlice = createSlice({
  name: "capsuleLanding",
  initialState,
  reducers: {
    setCapsules(state, action: PayloadAction<Capsule[]>) {
      state.capsules = action.payload;
      state.localCapsules = [...action.payload];
    },
    setLocalCapsules(state, action: PayloadAction<Capsule[]>) {
      state.localCapsules = action.payload;
    },
    setEditableCapsule(state, action: PayloadAction<Capsule | null>) {
      state.editableCapsule = action.payload;
    },
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    deleteCapsule(state, action: PayloadAction<number>) {
      state.localCapsules.splice(action.payload, 1);
    },
    filterCapsules(
      state,
      action: PayloadAction<{
        status?: string;
        originalLaunch?: string;
        type?: string;
      }>
    ) {
      const { status, originalLaunch, type } = action.payload;
      state.localCapsules = state.capsules.filter((capsule) => {
        const matchesStatus =
          status === "All" ||
          (status === "Active" && capsule.status === "active") ||
          (status === "Destroyed" && capsule.status === "destroyed") ||
          (status === "Retired" && capsule.status === "retired") ||
          (status === "Unknown" && capsule.status === "unknown");

        const matchesLaunch = originalLaunch
          ? capsule.original_launch &&
            capsule.original_launch.startsWith(originalLaunch)
          : true;

        const matchesType = type ? capsule.type.includes(type) : true;

        return matchesStatus && matchesLaunch && matchesType;
      });
    },
    filterCapsulesBySearchTerm(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase();
      state.localCapsules = searchTerm
        ? state.capsules.filter((capsule) => {
            return (
              capsule.capsule_id.toLowerCase().includes(searchTerm) ||
              capsule.status.toLowerCase().includes(searchTerm) ||
              (capsule.original_launch &&
                capsule.original_launch.toLowerCase().includes(searchTerm)) ||
              capsule.type.toLowerCase().includes(searchTerm)
            );
          })
        : [...state.capsules];
    },
    updateCapsule(state, action: PayloadAction<Capsule>) {
      state.localCapsules = state.localCapsules.map((capsule) =>
        capsule.capsule_serial === action.payload.capsule_serial
          ? action.payload
          : capsule
      );
      state.isEditing = false;
      state.editableCapsule = null;
    },
  },
});

export const {
  setCapsules,
  setLocalCapsules,
  setEditableCapsule,
  setIsEditing,
  setLoading,
  setError,
  deleteCapsule,
  filterCapsules,
  filterCapsulesBySearchTerm,
  updateCapsule,
} = capsuleLandingSlice.actions;

export default capsuleLandingSlice.reducer;
