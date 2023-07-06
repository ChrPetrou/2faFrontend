import colors from "@/configs/colors";
import React from "react";
import styled from "styled-components";

const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 20px;

  flex-direction: column;
  position: relative;
  width: 100%;

  width: ${({ isSignInSection }) => (isSignInSection ? "30%" : "70%")};
  opacity: ${({ isSignInSection }) => (isSignInSection ? "0" : "1")};
  & h1 {
    position: relative;
  }

  & > svg {
  }

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
      {children}
    </SectionContainer>
  );
};

export default Section;
