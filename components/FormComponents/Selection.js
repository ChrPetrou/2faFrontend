import colors from "@/configs/colors";
import countryCodes from "@/configs/countryCodes";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import InputF from "./InputF";

const Container = styled.div`
  display: flex;
  width: 20%;
  margin: 10px 0;
  border: 1px solid ${colors.lightestGray};
  border-radius: 8px 0 0 8px;
  border-right: none;
`;

const CountryContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 200px;
  width: 100%;
  top: 100%;
  border-radius: 8px;
  backdrop-filter: blur(3px);
  overflow-y: scroll;
  z-index: 1;

  ::-webkit-scrollbar {
    width: 8px;
    display: none;
    border-radius: 8px; /* Adjust border-radius to match container */
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px; /* Adjust border-radius to match container */
  }

  ::-webkit-scrollbar-thumb {
    background: #888;

    width: 1px;
    border-radius: 8px; /* Adjust border-radius to match container */
  }

  /* Firefox */
  * {
    scrollbar-color: #888;
    scrollbar-width: thin;
  }
`;

const CountrySelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${colors.lightestGray};
  border-radius: 8px;
  /* background-color: #c3c2c28a; */
  /* filter: blur(8px); */
  backdrop-filter: blur(3px);
  overflow-y: scroll;
  z-index: 1;

  ::-webkit-scrollbar {
    width: 8px;
    display: none;
    border-radius: 8px; /* Adjust border-radius to match container */
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px; /* Adjust border-radius to match container */
  }

  ::-webkit-scrollbar-thumb {
    background: #888;

    width: 1px;
    border-radius: 8px; /* Adjust border-radius to match container */
  }

  /* Firefox */
  * {
    scrollbar-color: #888;
    scrollbar-width: thin;
  }
`;

const CountrySelection = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid ${colors.lightestGray};
  &:hover {
    background-color: #0000007a;
  }
  & img {
    width: 35px;
    height: 35px;
  }
`;

const Selection = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <Container>
      <CountryContainer>
        <InputF mWidth="100%" type={"text"} label={"Search"} />
        <CountrySelectionContainer>
          {countryCodes.map((element, index) => (
            <CountrySelection key={index}>
              <Image
                src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${element.code}.svg`}
                width={150}
                height={150}
                rel="preload"
                priority
                alt={`${element.name} flag`}
              />
              <p>{element.name}</p>
              <p>{element.dial_code}</p>
            </CountrySelection>
          ))}
        </CountrySelectionContainer>
      </CountryContainer>
    </Container>
  );
};

export default Selection;
