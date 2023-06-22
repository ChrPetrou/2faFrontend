import React from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  width: 100%;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: red; */
  margin: auto;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;

  & p {
    width: 100%;
    font-size: 18px;
    text-align: center;
  }
`;

export default FormContainer;
