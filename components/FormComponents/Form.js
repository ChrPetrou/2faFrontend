import colors from "@/configs/colors";
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
  & span {
    cursor: pointer;
    width: 100%;
    color: ${colors.blue};
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.15s linear;
    :hover {
      color: ${colors.purble};
    }
  }
`;

export default FormContainer;
