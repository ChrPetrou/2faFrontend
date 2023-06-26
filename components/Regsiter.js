import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import CTA from "./common/CTA";
import Section from "./common/Section";
import ErrorTag from "./FormComponents/ErrorTag";
import Form from "./FormComponents/Form";
import "yup-phone";
import InputF from "./FormComponents/InputF";
import { isValidNumber } from "libphonenumber-js";
import PhoneSelection from "./FormComponents/PhoneSelection";

const Test = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 1;
  width: 100%;
  gap: 10px;
`;

const PhoneContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  max-width: 50%;
  @media screen and (max-width: 880px) {
    max-width: 100%;
  }
  /* border: 1px solid red; */
`;

const Register = ({
  isSignInSection,
  step,
  setStep,
  initialValues,
  customRef,
  setIntialValues,
}) => {
  const [phoneDialCode, setPhoneDialCode] = useState("+357");
  const [cleanNumber, setCleanNumber] = useState("");
  //custome phoneSchema for phone validation
  const phoneSchema = yup.string().test({
    name: "phone",
    message: "Phone number is not valid",
    test: function (value) {
      const { path, createError } = this;

      try {
        const phoneNumber = isValidNumber(value);

        if (!phoneNumber) {
          throw createError({ path });
        }
      } catch (error) {
        throw createError({ path });
      }

      return true;
    },
  });

  let signupSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "Password must be 8 characters long"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    // ),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phoneNumber: phoneSchema.required("Phone number is required"),
  });

  const handlePhone = (value, setFieldValue, phoneNumber) => {
    setCleanNumber(value);
    setFieldValue("phoneNumber", phoneDialCode + value);
    console.log(phoneNumber);
  };

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
          phoneNumber: "",
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          console.log(values);
          sessionStorage.setItem("User", JSON.stringify(values));
          setStep(step + 1);
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
        }) => (
          <>
            <Form method="post">
              <Test>
                <InputF
                  label={"First Name"}
                  mWidth={"calc(50% - 10px)"}
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
                  mWidth={"calc(50% - 10px)"}
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
              <Test>
                <InputF
                  label={"Email"}
                  autoComplete="false"
                  value={values.email}
                  mWidth={"calc(50% - 10px)"}
                  hasError={errors.email && touched.email}
                  name="email"
                  type={"email"}
                  onChange={handleChange}
                >
                  {errors.email && touched.email && (
                    <ErrorTag text={errors.email} />
                  )}
                </InputF>
                <PhoneContainer>
                  <PhoneSelection
                    phoneDialCode={phoneDialCode}
                    setPhoneDialCode={setPhoneDialCode}
                  />
                  <InputF
                    label={"Phone Number"}
                    value={cleanNumber}
                    mWidth={"100%"}
                    style={{ borderRadius: "0px 8px 8px 0px " }}
                    hasError={errors.phoneNumber && touched.phoneNumber}
                    name="phoneNumber"
                    type={"number"}
                    onChange={(e) => {
                      handlePhone(
                        e.target.value,
                        setFieldValue,
                        values.phoneNumber
                      );
                    }}
                  >
                    {errors.phoneNumber && touched.phoneNumber && (
                      <ErrorTag text={errors.phoneNumber} />
                    )}
                  </InputF>
                </PhoneContainer>
              </Test>
              <Test>
                <InputF
                  mWidth={"calc(50% - 10px)"}
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
                  mWidth={"calc(50% - 10px)"}
                  label={"Confirm Password"}
                  hasError={errors.confirmPassword && touched.confirmPassword}
                  name="confirmPassword"
                  type={"password"}
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
