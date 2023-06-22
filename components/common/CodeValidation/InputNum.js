import colors from "@/configs/colors";
import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  gap: 10px;
  margin: 10px 0;

  & input {
    display: flex;
    margin: auto;
    padding: 10px;
    width: 100%;
    border-radius: 8px;
    font-size: 20px;
    text-align: center;
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
  & input:focus {
    border: 2px solid ${colors.lightestGray};
  }
`;

/**
 * @typedef {Object} InputPropsTemp
 * @property { Boolean } hasError
 * @property { String } mWidth
 * @param { InputPropsTemp & React.InputHTMLAttributes<InputProps> } param0
 */
const InputNum = forwardRef(
  (
    {
      hasError,
      children,
      label,
      customRef,
      mWidth = "calc(50% - 5px)",
      ...rest
    },
    ref
  ) => {
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
        <input ref={ref} {...rest} />

        {children}
      </InputContainer>
    );
  }
);

export default InputNum;
