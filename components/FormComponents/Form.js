import React from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: red; */
  margin: auto;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Form = ({ children }) => {
  return <FormContainer>{children}</FormContainer>;
};

export default Form;
