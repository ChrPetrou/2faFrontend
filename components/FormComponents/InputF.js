import colors from "@/configs/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 10px 0;
  max-width: ${({ mWidth }) => mWidth};
  & input {
    display: flex;
    padding: 10px;
    width: 100%;
    border-radius: 8px;
    outline: none;
    border: ${({ hasError }) =>
      hasError ? "1px solid red" : `1px solid ${colors.lightestGray}`};
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }

  & input[type="submit"] {
    overflow: hidden;
    transition: background 1s linear;
    background: linear-gradient(
      55deg,
      rgba(153, 19, 116, 1) 0%,
      rgba(35, 122, 161, 1) 81%
    );
    display: flex;
    justify-content: center;
    max-width: 200px;
    margin: auto;
    color: white;
    cursor: pointer;
    :hover {
      background: linear-gradient(
        55deg,
        rgba(153, 19, 116, 1) 56%,
        rgba(35, 122, 161, 1) 96%
      );
    }
  }

  & input:focus + *,
  &[data-valid="true"] > input + * {
    transform: translate(10px, calc(-50% - 0px));
  }
  @media screen and (max-width: 650px) {
    max-width: 100%;
  }
`;

const Title = styled.div`
  display: flex;
  pointer-events: none;
  top: 0;
  left: 0;
  margin: auto;
  /* width: 10px; */
  height: 20px;
  padding: 0 10px;
  transform: translate(10px, calc(50% - 2px));
  /* transform: ${({ isClicked }) =>
    isClicked
      ? "translate(10px, calc(-50% - 0px)) "
      : "translate(10px, calc(50% - 2px))"}; */

  transition: all 0.15s linear;
  background: ${({ isClicked }) => (isClicked ? "white" : "transparent")};
  position: absolute;
  & p {
    color: ${({ hasError }) => (hasError ? `red` : `${colors.lightestGray}`)};
  }
`;

/**
 * @typedef {Object} InputPropsTemp
 * @property { Boolean } hasError
 * @property { String } mWidth
 * @param { InputPropsTemp & React.InputHTMLAttributes<InputProps> } param0
 */
const InputF = ({
  hasError,
  children,
  label,
  mWidth = "calc(50% - 5px)",
  ...rest
}) => {
  //   useEffect(() => {
  //     setisError(false);
  //     if (value?.length === 0 || value === undefined) {
  //       setIsClicked(false);
  //     } else {
  //       setIsClicked(true);
  //     }
  //   }, [value]);

  const [isClicked, setIsClicked] = useState(false);
  const [isError, setisError] = useState(hasError);

  return (
    <InputContainer
      hasError={hasError}
      mWidth={mWidth}
      onClick={() => setIsClicked(true)}
      data-valid={rest.value !== ""}
    >
      <input {...rest} />
      <Title hasError={hasError} isClicked={isClicked}>
        <p>{label}</p>
      </Title>
      {children}
    </InputContainer>
  );
};

export default InputF;
