import colors from "@/configs/colors";
import React from "react";
import styled from "styled-components";

const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 20px;
  flex: 1;
  transition: flex 1s linear;
  flex-direction: column;
  position: relative;
  & h1 {
    position: relative;
  }
  & h2 {
    position: absolute;
    font-size: 30px;
    color: white;

    /* margin-top: ${({ isSignInSection }) =>
      isSignInSection ? "20%" : "0%"}; */
    top: 0;
    left: 50%;
    width: 100%;
    text-align: center;
    padding: 20px 0;
    transition: opacity 0.4s linear;
    opacity: ${({ isSignInSection }) => (isSignInSection ? "1" : "0")};
    transform: translate(-50%, 0%);
  }

  & > svg {
    cursor: pointer;
    position: absolute;
    left: 10px;
    top: 10px;
    transition: color 0.15s linear;
    color: ${colors.blue};
    :hover {
      color: ${colors.purble};
    }
  }

  width: 50%;
  @media screen and (max-width: 850px) {
    width: 100%;
  }
`;

const Section = ({
  isSignInSection = "false",
  title,
  subtitle,
  children,
  customRef,
}) => {
  return (
    <SectionContainer ref={customRef} isSignInSection={isSignInSection}>
      <h1>{title}</h1>
      <h2> {subtitle}</h2>
      {children}
    </SectionContainer>
  );
};

export default Section;
