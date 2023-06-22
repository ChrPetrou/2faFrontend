import { Formik } from "formik";
import React from "react";
import styled, { keyframes } from "styled-components";
import * as Yup from "yup";
import CTA from "./common/CTA";
import Section from "./common/Section";
import ErrorTag from "./FormComponents/ErrorTag";
import Form from "./FormComponents/Form";
import InputF from "./FormComponents/InputF";
import InputField from "./FormComponents/InputField";

const changeText = keyframes`
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const SignIn = ({
  isSignInSection,
  step,
  setStep,
  customRef,
  initialValues,
  setIntialValues,
}) => {
  const signInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required()
      .min(8, "Password must be 8 characters long"),
  });

  return (
    <Section
      customRef={customRef}
      isSignInSection={isSignInSection ? false : true}
      title={"Sign In"}
      // subtitle={"Already have an account?"}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          // same shape as initial values
          sessionStorage.setItem("User", JSON.stringify(values.email));
          setStep(step + 1);
          console.log(values);
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <>
            <Form action="/action_page.php" method="post">
              <InputF
                label={"Email"}
                mWidth={"50%"}
                hasError={errors.email && touched.email}
                name="email"
                value={values.email}
                type={"email"}
                onChange={handleChange}
              >
                {errors.email && touched.email && (
                  <ErrorTag text={errors.email} />
                )}
              </InputF>
              <InputF
                value={values.password}
                mWidth={"50%"}
                label={"Password"}
                hasError={errors.password && touched.password}
                name="password"
                type={"password"}
                onChange={handleChange}
              >
                {errors.password && touched.password && (
                  <ErrorTag text={errors.password} />
                )}
              </InputF>
              <CTA onClick={() => handleSubmit()} text={"Sign In"} />
            </Form>
          </>
        )}
      </Formik>
    </Section>
  );
};

export default SignIn;
