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
import { userApiAgent } from "@/utils/userApiAgent";
import axios from "axios";
import countryCodes from "@/configs/countryCodes";
import FormSchema from "./FormComponents/FormSchema";

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
  max-width: calc(50% - 10px);
  @media screen and (max-width: 880px) {
    max-width: 100%;
  }
  /* border: 1px solid red; */
`;

const Register = ({ isSignInSection, step, setStep, customRef }) => {
  const [phoneCode, setphoneCode] = useState({
    dialCode: "",
    country: "",
  });

  const [cleanNumber, setCleanNumber] = useState("");
  const [initialValues, setInitialValues] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
  });

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setphoneCode({
          dialCode: data.country_calling_code,
          country: data.country_code,
        });
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //custome phoneSchema for phone validation
  const phoneSchema = yup.string().test({
    name: "phone",
    message: "Phone number is not valid",
    test: function (value) {
      const { path, createError } = this;

      try {
        const phone = isValidNumber(value);

        if (!phone) {
          throw createError({ path });
        }
      } catch (error) {
        throw createError({ path });
      }

      return true;
    },
  });

  let signupSchema = yup.object().shape({
    firstname: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    surname: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(3, "Password must be 8 characters long"),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phone: phoneSchema.required("Phone number is required"),
    country: yup.string().required("Required"),
  });

  const handlePhone = (value, setFieldValue, phone) => {
    setCleanNumber(value);
    setFieldValue("phone", phoneCode.dialCode + " " + value);
  };
  const [errorMessage, setErrorMessage] = useState("");

  const registerFunc = async (values) => {
    try {
      setErrorMessage("");
      const userR = await userApiAgent.register(values);
      setErrorMessage(null);
      return userR;
    } catch (err) {
      console.log(err);
      if (err.response.status >= 400 || err.response.status <= 499) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    const storage = JSON.parse(sessionStorage.getItem("User"));

    if (storage?.user) {
      let country = "";
      let phone = storage?.user.phone;
      countryCodes.map((element, index) => {
        if (phone.startsWith(element.dial_code)) {
          country = element.code;
          setphoneCode({ dialCode: element.dial_code, country: element.code });
          setCleanNumber(phone.substring(element.dial_code.length));
        }
      });
      setInitialValues({
        firstname: storage?.user.firstName,
        surname: storage?.user.lastName,
        email: storage?.user.email,
        password: "",
        confirmPassword: "",
        phone: phone,
        country: country,
      });
    } else {
      getGeoInfo();
    }
  }, []);

  console.log(initialValues.phone);

  return (
    <Section
      customRef={customRef}
      isSignInSection={isSignInSection}
      title={"Register"}
      // subtitle={`Don't have an account?`}
    >
      <FormSchema
        schema={signupSchema}
        initialValues={initialValues}
        Function={registerFunc}
        setStep={setStep}
        step={step}
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
                  value={values.firstname}
                  hasError={errors.firstname && touched.firstname}
                  name="firstname"
                  type={"text"}
                  onChange={handleChange}
                >
                  {errors.firstname && touched.firstname && (
                    <ErrorTag text={errors.firstname} />
                  )}
                </InputF>
                <InputF
                  label={"Last Name"}
                  mWidth={"calc(50% - 10px)"}
                  hasError={errors.surname && touched.surname}
                  name="surname"
                  value={values.surname}
                  type={"text"}
                  onChange={handleChange}
                >
                  {errors.surname && touched.surname && (
                    <ErrorTag text={errors.surname} />
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
                    phoneCode={phoneCode}
                    setphoneCode={setphoneCode}
                    onChange={handleChange}
                    phone={cleanNumber}
                    setFieldValue={setFieldValue}
                  />
                  {errors.country && touched.country && (
                    <ErrorTag text={errors.country} />
                  )}
                  <InputF
                    label={"Phone Number"}
                    value={cleanNumber}
                    mWidth={"100%"}
                    style={{ borderRadius: "0px 8px 8px 0px " }}
                    hasError={errors.phone && touched.phone}
                    name="phone"
                    type={"number"}
                    onInput={(e) => {
                      handlePhone(e.target.value, setFieldValue, values.phone);
                    }}
                    onChange={(e) => {
                      handlePhone(e.target.value, setFieldValue, values.phone);
                    }}
                  >
                    {errors.phone && touched.phone && (
                      <ErrorTag text={errors.phone} />
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
              {errorMessage && (
                <ErrorTag
                  text={errorMessage}
                  style={{
                    justifyContent: "center",
                  }}
                />
              )}
              <CTA onClick={() => handleSubmit()} text={"Register"} />
            </Form>
          </>
        )}
      </FormSchema>
    </Section>
  );
};

export default Register;
