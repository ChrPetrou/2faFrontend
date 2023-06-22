import React from "react";
import styled from "styled-components";

const ErrorTagContainer = styled.div`
  display: flex;
  position: absolute;
  top: calc(100% + 5px);
  width: 100%;
  & p {
    color: red;
  }
`;

const ErrorTag = ({ text }) => {
  return (
    <ErrorTagContainer>
      <p>{text}</p>
    </ErrorTagContainer>
  );
};

export default ErrorTag;
