/* eslint-disable */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { Capsule } from "../types";
import { useGetCapsules } from "../hooks/useGetCapsules";
import CapsuleInterface from "./CapsuleInterface";
import Table from "./Table";
import ModalWrapper from "./ModalForm";
import CapsuleForm from "./CapsuleForm";
import CapsuleSearchForm from "./CapsuleSearchForm";
import {
  setCapsules,
  setLocalCapsules,
  setEditableCapsule,
  setIsEditing,
  deleteCapsule,
  filterCapsules,
  filterCapsulesBySearchTerm,
  updateCapsule,
  setLoading,
  setError,
} from "../store/slices/capsuleLandingSlice";
import { RootState } from "../store/store";

export default function Landing() {
  const dispatch = useDispatch();
  const { localCapsules, editableCapsule, isEditing, loading, error } =
    useSelector((state: RootState) => state.capsuleLanding);
  const {
    capsules: fetchedCapsules = [],
    loading: loadingCapsules,
    error: capsulesError,
  } = useGetCapsules();

  useEffect(() => {
    dispatch(setLoading(loadingCapsules));
    if (!loadingCapsules && fetchedCapsules.length > 0) {
      dispatch(setCapsules(fetchedCapsules));
    }
    if (capsulesError) dispatch(setError(capsulesError));
  }, [loadingCapsules, fetchedCapsules, capsulesError, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#4A90E2" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  const handleDelete = (index: number) => {
    dispatch(deleteCapsule(index));
  };

  const handleSearch = (filters: {
    status?: string;
    originalLaunch?: string;
    type?: string;
  }) => {
    dispatch(filterCapsules(filters));
  };

  const handleEditCapsule = (capsule: Capsule) => {
    dispatch(setEditableCapsule(capsule));
    dispatch(setIsEditing(true));
  };

  const handleSearchAll = (searchTerm: string) => {
    dispatch(filterCapsulesBySearchTerm(searchTerm));
  };

  const handleSave = (values: Capsule) => {
    dispatch(updateCapsule(values));
  };

  return (
    <div className="py-6 flex flex-col gap-[3rem]">
      <div>
        <CapsuleInterface capsules={localCapsules} />
      </div>
      <div className="shadow-md rounded-lg">
        <div>
          <CapsuleForm
            onSearch={isEditing ? handleSave : handleSearch}
            initialValues={editableCapsule}
          />
        </div>
        <div className="flex justify-between items-center p-4">
          <ModalWrapper
            setLocalCapsules={(capsules): any =>
              dispatch(setLocalCapsules(capsules))
            }
          />
          <CapsuleSearchForm onSearch={handleSearchAll} />
        </div>
      </div>

      <div>
        <Table
          capsules={localCapsules}
          loading={loading}
          error={error}
          onEdit={handleEditCapsule}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
