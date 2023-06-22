import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  overflow: hidden;
  transition: background 1s linear;
  background: linear-gradient(
    55deg,
    rgba(153, 19, 116, 1) 0%,
    rgba(35, 122, 161, 1) 81%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  max-width: ${({ mWidth }) => mWidth};
  margin-top: auto;
  margin: 20px auto;
  color: white;
  cursor: pointer;
  :hover {
    transition: background 1s linear;
    opacity: 0.8;
    background: linear-gradient(
      55deg,
      rgba(153, 19, 116, 1) 56%,
      rgba(35, 122, 161, 1) 96%
    );
  }
`;

const CTA = ({ onClick, text, mWidth = "200px", style }) => {
  return (
    <ButtonContainer style={style} mWidth={mWidth} onClick={onClick}>
      <p>{text}</p>
    </ButtonContainer>
  );
};

export default CTA;
