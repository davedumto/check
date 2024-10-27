import React from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Capsule } from "../types";
import type { FormValues, ModalProps, ModalPortalProps } from "../types";
import { convertToISODate } from "../utils/dateHelpers";

interface ModalWrapperProps {
  setLocalCapsules: React.Dispatch<React.SetStateAction<Capsule[]>>;
}

const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
  if (typeof window === "undefined") return null;
  return createPortal(children, document.body);
};

const validationSchema = Yup.object().shape({
  capsule_id: Yup.string().required("Capsule ID is required"),
  status: Yup.string().required("Status is required"),
  original_launch: Yup.string().required("Original Launch Date is required"),
});

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, setLocalCapsules }) => {
  if (!isOpen) return null;

  const initialValues: FormValues = {
    capsule_id: "",
    status: "",
    original_launch: "",
  };

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ): void => {
    console.log("Form values:", values);
    // Add the new capsule to the local state
    const newCapsule: Capsule = {
      capsule_id: values.capsule_id,
      capsule_serial: "default_serial",
      status: values.status.toLowerCase(),
      original_launch: convertToISODate(values.original_launch),
      details: "",
      landings: 0,
      missions: [],
      type: "",
      reuse_count: 0,
    };

    setLocalCapsules((prevCapsules) => [newCapsule, ...prevCapsules]);
    resetForm();
    onClose();
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-md transform scale-100 opacity-100 transition-all duration-300 ease-in-out">
          <div className="relative bg-white rounded-lg shadow-xl p-6">
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 text-2xl hover:text-gray-600 transition-colors"
            >
              X
            </button>

            <h2 className="text-xl font-semibold mb-6">Add New Entry</h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="status" className="text-lg text-gray-500">
                      Capsule ID
                    </label>
                    <Field
                      name="capsule_id"
                      type="text"
                      placeholder="Capsule ID"
                      className="w-full px-4 py-2 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                    />
                    {errors.capsule_id && touched.capsule_id && (
                      <p className="mt-1 text-lg text-red-600">
                        {errors.capsule_id}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="status" className="text-lg text-gray-500">
                      Status
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="w-full px-4 py-2 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                    >
                      <option value="All">All</option>
                      <option value="Active">Active</option>
                      <option value="Destroyed">Destroyed</option>
                      <option value="Retired">Retired</option>
                      <option value="Unknown">Unknown</option>
                    </Field>
                    {errors.status && touched.status && (
                      <p className="mt-1 text-lg text-red-600">
                        {errors.status}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="status" className="text-lg text-gray-500">
                      Original Launch Date
                    </label>
                    <Field
                      name="original_launch"
                      type="text"
                      placeholder="Original Launch Date"
                      className="w-full px-4 py-2 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                    />
                    {errors.original_launch && touched.original_launch && (
                      <p className="mt-1 text-lg text-red-600">
                        {errors.original_launch}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-xl hover:bg-red-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600 transition-colors"
                    >
                      Add Capsule
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({ setLocalCapsules }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-slate-500 text-white text-xl rounded-lg hover:bg-slate-600 transition-colors"
      >
        Add Entries
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setLocalCapsules={setLocalCapsules}
      />
    </div>
  );
};

export default ModalWrapper;
