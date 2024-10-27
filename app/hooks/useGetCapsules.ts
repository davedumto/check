"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCapsules } from "../store/slices/capsuleSlice";
import { RootState, AppDispatch } from "../store/store";

export const useGetCapsules = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { capsules, loading, error } = useSelector(
    (state: RootState) => state.capsules
  );

  useEffect(() => {
    dispatch(fetchCapsules());
  }, [dispatch]);
  return { capsules, loading, error };
};
