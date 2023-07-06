import { Formik } from "formik";
import React from "react";

const FormSchema = ({
  initialValues,
  schema,
  children,
  Function,
  setStep,
  step,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values) => {
        const response = await Function(values);
        console.log(response);
        if (response) {
          console.log(values);
          sessionStorage.setItem("User", JSON.stringify(response));
          setStep(step + 1);
        }
      }}
      enableReinitialize={true}
    >
      {children}
    </Formik>
  );
};

export default FormSchema;
