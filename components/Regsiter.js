import { Formik } from "formik";
import React from "react";
import styled, { keyframes } from "styled-components";
import * as Yup from "yup";
import CTA from "./common/CTA";
import Section from "./common/Section";
import ErrorTag from "./FormComponents/ErrorTag";
import Form from "./FormComponents/Form";
import InputField from "./FormComponents/InputField";
import "yup-phone";
import InputF from "./FormComponents/InputF";

const Test = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;

const Register = ({
  isSignInSection,
  step,
  setStep,
  initialValues,
  customRef,
  setIntialValues,
}) => {
  let signupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    // phoneNumber: Yup.string()
    //   .phone("Invalid phone number")
    //   .required("Phone number is required"),
  });

  return (
    <Section
      customRef={customRef}
      isSignInSection={isSignInSection}
      title={"Register"}
      // subtitle={`Don't have an account?`}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          email: "",
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          sessionStorage.setItem("User", JSON.stringify(values.email));
          setStep(step + 1);
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <>
            <Form method="post">
              <Test>
                <InputF
                  label={"First Name"}
                  mWidth={"48%"}
                  value={values.firstName}
                  hasError={errors.firstName && touched.firstName}
                  name="firstName"
                  type={"text"}
                  onChange={handleChange}
                >
                  {errors.firstName && touched.firstName && (
                    <ErrorTag text={errors.firstName} />
                  )}
                </InputF>
                <InputF
                  label={"Last Name"}
                  mWidth={"48%"}
                  hasError={errors.lastName && touched.lastName}
                  name="lastName"
                  value={values.lastName}
                  type={"text"}
                  onChange={handleChange}
                >
                  {errors.lastName && touched.lastName && (
                    <ErrorTag text={errors.lastName} />
                  )}
                </InputF>
              </Test>
              <InputF
                label={"Email"}
                value={values.email}
                mWidth={"48%"}
                hasError={errors.email && touched.email}
                name="email"
                type={"email"}
                onChange={handleChange}
              >
                {errors.email && touched.email && (
                  <ErrorTag text={errors.email} />
                )}
              </InputF>
              <Test>
                <InputF
                  mWidth={"48%"}
                  label={"Password"}
                  name="password"
                  value={values.password}
                  type={"password"}
                  onChange={handleChange}
                  hasError={errors.password && touched.password}
                >
                  {errors.password && touched.password && (
                    <ErrorTag text={errors.password} />
                  )}
                </InputF>
                <InputF
                  value={values.confirmPassword}
                  mWidth={"48%"}
                  label={"Confirm Password"}
                  hasError={errors.confirmPassword && touched.confirmPassword}
                  name="confirmPassword"
                  type={"paswword"}
                  onChange={handleChange}
                >
                  {errors.confirmPassword && touched.confirmPassword && (
                    <ErrorTag text={errors.confirmPassword} />
                  )}
                </InputF>
              </Test>
              <CTA onClick={() => handleSubmit()} text={"Register"} />
            </Form>
          </>
        )}
      </Formik>
    </Section>
  );
};

export default Register;
