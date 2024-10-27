import React from "react";
import { Formik, Form, Field } from "formik";

interface CapsuleSearchFormProps {
  onSearch: (searchTerm: string) => void;
}

const CapsuleSearchForm: React.FC<CapsuleSearchFormProps> = ({ onSearch }) => {
  return (
    <Formik
      initialValues={{ search: "" }}
      onSubmit={(values) => onSearch(values.search)}
    >
      {({ values, handleChange }) => (
        <Form>
          <Field
            name="search"
            placeholder="Search Capsules"
            className="w-full px-4 py-2 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
            value={values.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              onSearch(e.target.value);
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CapsuleSearchForm;
