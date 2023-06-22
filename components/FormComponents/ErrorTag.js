import React from "react";
import styled from "styled-components";

const ErrorTagContainer = styled.div`
  display: flex;
  position: absolute;
  top: calc(100% + 5px);
  width: 100%;
  max-width: 350px;
  & p {
    color: red;
  }
`;

const ErrorTag = ({ text, style }) => {
  return (
    <ErrorTagContainer style={style}>
      <p>{text}</p>
    </ErrorTagContainer>
  );
};

export default ErrorTag;
