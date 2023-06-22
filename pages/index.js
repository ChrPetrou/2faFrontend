import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import * as Yup from "yup";
import CTA from "@/components/common/CTA";
import SignIn from "@/components/SignIn";
import CodeValidation from "@/components/CodeValidation";
import signInInitials from "@/configs/signInInitials";
import Register from "@/components/Regsiter";

const Container = styled.div`
  display: flex;
  margin: auto;
  width: 100%;
  max-width: 1140px;
  padding: 20px;
`;

const ContainerInner = styled.div`
  display: flex;
  /* flex-direction: column; */
  background-color: white;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  min-height: 60vh;
  position: relative;
  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

const SectionSwitcher = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  position: absolute;
  background: rgb(153, 19, 116);
  background: linear-gradient(
    55deg,
    rgba(153, 19, 116, 1) 0%,
    rgba(35, 122, 161, 1) 81%
  );
  left: 0;
  transform: ${({ position }) =>
    position ? "translateX(0)" : "translateX(100%)"};
  top: 0;
  width: 50%;
  z-index: 1;
  transition: all 0.35s linear;
  border-radius: 8px;
  height: 100%;
  & h1 {
    color: white;
  }
  @media screen and (max-width: 850px) {
    height: ${({ mHeight }) => (mHeight ? `${mHeight}px` : "50%")};
    width: 100%;
    transform: unset;
    top: ${({ position, mHeight }) =>
      !position ? `calc(100% - ${mHeight}px)` : "0"};
    /* transform: ${({ position }) =>
      position ? "translateY(0)" : "translateY(100%)"}; */
  }
`;

const index = () => {
  const [isSignInSection, setIsSignInSection] = useState(true);
  const [signInValues, setSignInValues] = useState({ ...signInInitials });
  const [height, setHeight] = useState(0);
  const [step, setStep] = useState(0);
  const ref = useRef();
  const ref2 = useRef();

  useEffect(() => {
    if (isSignInSection) {
      if (ref.current) {
        setHeight(ref.current.clientHeight);
      }
    } else {
      if (ref2.current) {
        setHeight(ref2.current.clientHeight);
      }
    }
  }, [isSignInSection]);

  return (
    <Container>
      <ContainerInner>
        <SectionSwitcher position={isSignInSection} mHeight={height}>
          <h1>
            {isSignInSection
              ? "Don't have an account?"
              : "Already have an account?"}
          </h1>
          <CTA
            onClick={() => setIsSignInSection(!isSignInSection)}
            text={isSignInSection ? "Register" : "Sign In"}
            mWidth={"200px"}
            style={{
              background: "none",
              border: "1px solid white",
            }}
          />
        </SectionSwitcher>
        <Register
          customRef={ref}
          isSignInSection={isSignInSection}
          step={step}
          setStep={setStep}
        />

        {step == 0 && (
          <SignIn
            customRef={ref2}
            isSignInSection={isSignInSection}
            step={step}
            setStep={setStep}
          />
        )}
        {step == 1 && <CodeValidation />}
      </ContainerInner>
    </Container>
  );
};

export default index;
