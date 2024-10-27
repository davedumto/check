import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { Capsule } from "../types";
import { convertToISODate } from "../utils/dateHelpers";

interface CapsuleSearchValues {
  status?: string;
  original_launch?: string;
  type?: string;
}

interface CapsuleSearchFormProps {
  onSearch: (
    filters: CapsuleSearchValues
  ) => void | ((values: Capsule) => void);
  initialValues?: Capsule | null;
}

const CapsuleForm: React.FC<CapsuleSearchFormProps> = ({
  onSearch,
  initialValues,
}) => {
  const defaultValues = {
    status: "All",
    original_launch: "",
    type: "",
  };

  const formValues = initialValues || defaultValues;
  const validationSchema = Yup.object({
    status: Yup.string().optional(),
    original_launch: Yup.string().optional(),
    type: Yup.string().optional(),
  });

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formattedValues: CapsuleSearchValues = {
          ...values,
          original_launch: values.original_launch
            ? convertToISODate(values.original_launch) || ""
            : "",
        };
        onSearch(formattedValues);
        console.log(formattedValues);
      }}
      enableReinitialize
    >
      <Form className="w-full p-6 bg-white rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {/* Status Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="status"
              className="text-xl font-medium text-gray-700"
            >
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
          </div>

          {/* Original Launch Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="original_launch"
              className="text-xl font-medium text-gray-700"
            >
              Original Launch
            </label>
            <Field
              name="original_launch"
              type="text"
              placeholder="19th April 2024: 8:08 AM"
              className="w-full px-4 py-2 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
            />
          </div>

          {/* Type Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="text-xl font-medium text-gray-700">
              Type
            </label>
            <Field
              name="type"
              type="text"
              placeholder="Enter type"
              className="w-full px-4 py-2 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center">
            <button
              type="submit"
              className="w-full px-6 py-2.5 text-xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              {initialValues ? "SAVE" : "FILTER"}
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default CapsuleForm;
