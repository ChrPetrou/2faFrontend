import { userApiAgent } from "@/utils/userApiAgent";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import * as Yup from "yup";
import CTA from "./common/CTA";
import Section from "./common/Section";
import ErrorTag from "./FormComponents/ErrorTag";
import Form from "./FormComponents/Form";
import InputF from "./FormComponents/InputF";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

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

const SignIn = ({ isSignInSection, step, setStep, customRef }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net)$/,
        "Invalid email format"
      )
      .required("Required"),
    password: Yup.string()
      .required()
      .min(3, "Password must be 8 characters long"),
  });

  const signInFunction = async (value) => {
    try {
      const user = await userApiAgent.signIn(value);
      setErrorMessage(null);
      return user;
    } catch (err) {
      console.log(err);
      if (err.response.status >= 400 || err.response.status <= 499) {
        setErrorMessage("Incorrect email address or password");
      } else {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    const storage = JSON.parse(sessionStorage.getItem("User")).user;

    if (storage) {
      setInitialValues({ email: storage?.email, password: "" });
    }
  }, []);

  // console.log(initialValues.email);
  return (
    <Section
      customRef={customRef}
      isSignInSection={isSignInSection ? false : true}
      title={"Sign In"}
      // subtitle={"Already have an account?"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={async (values) => {
          // same shape as initial values
          const response = await signInFunction(values);
          if (response) {
            console.log(response);
            sessionStorage.setItem("User", JSON.stringify(response));
            setStep(step + 1);
          }
        }}
        validateOnBlur={true}
        validateOnChange={true}
        enableReinitialize={true}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <>
            <Form>
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
                type={passwordVisible ? "text" : "password"}
                onChange={handleChange}
              >
                {!passwordVisible && values?.password?.length != 0 && (
                  <AiOutlineEyeInvisible
                    size={20}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                )}
                {passwordVisible && values?.password?.length != 0 && (
                  <AiOutlineEye
                    size={20}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                )}

                {errors.password && touched.password && (
                  <ErrorTag text={errors.password} />
                )}
              </InputF>
              {errorMessage && (
                <ErrorTag
                  text={errorMessage}
                  style={{
                    justifyContent: "center",
                  }}
                />
              )}
              <CTA onClick={() => handleSubmit()} text={"Sign In"} />
            </Form>
          </>
        )}
      </Formik>
    </Section>
  );
};

export default SignIn;
