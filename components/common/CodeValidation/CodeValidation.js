import React, { useRef, useState } from "react";
import Section from "../Section";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Formik } from "formik";
import Form from "@/components/FormComponents/Form";
import InputNum from "./InputNum";
import CTA from "../CTA";
import { userApiAgent } from "@/utils/userApiAgent";
import colors from "@/configs/colors";

const CodeValidation = ({ isSignInSection, customRef, step, setStep }) => {
  const inputRefs = useRef([]);

  const handleInput = (index, e) => {
    const maxLength = parseInt(e.target.getAttribute("maxlength"));
    const currentLength = e.target.value.length;
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(1, 2);
    }
    if (currentLength >= maxLength && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleRef = (ref, index) => {
    inputRefs.current[index] = ref;
  };

  const authFunction = async (values, email) => {
    try {
      const auth = await userApiAgent.authanticate({
        email: email,
        code: values,
      });
      return auth;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Section
      customRef={customRef}
      isSignInSection={isSignInSection ? false : true}
      title={"Two-Factor Authentication"}
    >
      <IoMdArrowRoundBack size={30} onClick={() => setStep(step - 1)} />
      <Formik
        initialValues={{
          myArray: ["", "", "", "", "", ""], // Initialize the array with empty values
        }}
        onSubmit={async (values) => {
          const email = JSON.parse(sessionStorage.getItem("User")).user.email;

          const response = await authFunction(values.myArray.join(""), email);
          if (response) {
            console.log(response);
          }
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <>
            <Form style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <p>
                A message with a verification code has been sent to your device.
              </p>

              {Array.from({ length: 6 }, (_, index) => {
                return (
                  <InputNum
                    key={index}
                    type="number"
                    ref={(ref) => handleRef(ref, index)}
                    maxLength="1"
                    id={`myArray[${index}]`}
                    value={values[index]}
                    onChange={handleChange}
                    onInput={(e) => handleInput(index, e)}
                  />
                );
              })}

              <p>Enter the code to continue.</p>
              <CTA
                disabled={values.myArray.join("").length < 6}
                onClick={() => handleSubmit()}
                text={"Verify"}
              />
              <span onClick={() => console.log()}>
                Didn't get a verification code?
              </span>
            </Form>
          </>
        )}
      </Formik>
    </Section>
  );
};

export default CodeValidation;
