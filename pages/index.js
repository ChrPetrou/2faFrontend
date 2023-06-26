import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import * as Yup from "yup";
import CTA from "@/components/common/CTA";
import SignIn from "@/components/SignIn";
import CodeValidation from "@/components/common/CodeValidation/CodeValidation";
import signInInitials from "@/configs/signInInitials";
import Register from "@/components/Regsiter";
import useWindowSize from "@/utils/hooks/useWindowSize";

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
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: absolute;
  background: linear-gradient(
    55deg,
    rgba(153, 19, 116, 1) 0%,
    rgba(35, 122, 161, 1) 81%
  );
  left: ${({ position, mWidth }) =>
    position ? "0" : `calc(100% - ${mWidth}px )`};

  width: ${({ mWidth }) => `${mWidth}px`};
  z-index: 2;
  transition: all 0.35s linear;
  border-radius: 8px;
  height: 100%;
  & h1 {
    text-align: center;
    color: white;
  }
  @media screen and (max-width: 850px) {
    height: ${({ mHeight }) => (mHeight ? `${mHeight}px` : "50%")};
    width: 100%;
    min-width: 100%;
    transform: unset;
    left: unset;
    top: ${({ position, mHeight }) =>
      !position ? `calc(100% - ${mHeight}px)` : "0"};
    /* transform: ${({ position }) =>
      position ? "translateY(0)" : "translateY(100%)"}; */
  }
`;

const index = () => {
  const [isSignInSection, setIsSignInSection] = useState(true);
  const [signInValues, setSignInValues] = useState({ ...signInInitials });
  const [switchHeight, setSwitchHeight] = useState(0);
  const [switchWidth, setSwitchWidth] = useState(0);
  const [step, setStep] = useState(0);
  const ref = useRef();
  const ref2 = useRef();

  const { width } = useWindowSize();

  useEffect(() => {
    if (isSignInSection) {
      if (ref.current) {
        setSwitchWidth(ref.current.clientWidth);
        setSwitchHeight(ref.current.clientHeight);
      }
    } else {
      if (ref2.current) {
        setSwitchWidth(ref2.current.clientWidth);
        setSwitchHeight(ref2.current.clientHeight);
      }
    }
  }, [isSignInSection, width]);

  return (
    <Container>
      <ContainerInner>
        <SectionSwitcher
          position={isSignInSection}
          mWidth={switchWidth}
          mHeight={switchHeight}
        >
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
        {step == 1 && (
          <CodeValidation step={step} setStep={setStep} customRef={ref2} />
        )}
      </ContainerInner>
    </Container>
  );
};

export default index;
