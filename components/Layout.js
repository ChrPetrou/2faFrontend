import colors from "@/configs/colors";
import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  margin: auto;
  background-color: ${colors.bgColor};
`;

const Layout = ({ children, style }) => {
  return (
    <Container
      style={{
        ...style,
      }}
    >
      {children}
    </Container>
  );
};

export default Layout;
