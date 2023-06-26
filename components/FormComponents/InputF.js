import colors from "@/configs/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  gap: 10px;
  margin: 10px 0;
  max-width: ${({ mWidth }) => mWidth};
  & input {
    display: flex;
    padding: 10px;
    width: 100%;
    border-radius: 8px;
    background: ${({ inputBg }) => inputBg};
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

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }

  & svg {
    /* position: absolute; */

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    margin-right: 10px;
    background: white;
    /* margin-right: calc(0px + 10px); */
  }

  & input:focus + *,
  &[data-valid="true"] > input + * {
    transform: translate(10px, calc(-50% - 0px));
    background: ${({ labelClr }) => labelClr};
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

  height: 20px;
  padding: 0 10px;
  transform: translate(10px, calc(50% - 2px));
  transition: all 0.15s linear;
  background: ${({ isClicked, labelBg }) =>
    isClicked ? labelBg : "transparent"};
  position: absolute;
  & p {
    color: ${({ hasError, labelClr }) => (hasError ? `red` : `${labelClr}`)};

    @media only screen and (max-width: 950px) {
      font-size: 16px;
    }
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
  inputBg = "white",
  labelBg = "white",
  labelClr = colors.lightestGray,
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
      inputBg={inputBg}
      onClick={() => setIsClicked(true)}
      data-valid={rest.value !== ""}
    >
      <input {...rest} />
      <Title
        hasError={hasError}
        isClicked={isClicked}
        labelBg={labelBg}
        labelClr={labelClr}
      >
        <p>{label}</p>
      </Title>
      {children}
    </InputContainer>
  );
};

export default InputF;
