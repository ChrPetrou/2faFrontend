import colors from "@/configs/colors";
import countryCodes from "@/configs/countryCodes";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import InputF from "./InputF";

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 20%;
  margin: 10px 0;
  border: 1px solid ${colors.lightestGray};
  border-radius: 8px 0 0 8px;
  border-right: none;
  background-color: #0000;
  & p {
    font-size: 15px;
    font-weight: 600;
  }
`;

const CountryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  max-height: 190px;
  width: 100%;
  top: 100%;
  border-radius: 8px;
  backdrop-filter: blur(3px);
  border: 1px solid ${colors.lightestGray};
  background: #00000085;
  color: white;

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
  /* border: 1px solid ${colors.lightestGray}; */
  border-radius: 8px;
  margin-bottom: auto;
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
    width: 32px;
    height: 32px;
  }
`;

const PhoneSelection = ({ phoneCode, setphoneCode, setFieldValue, phone }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isCollapsed, setIsCollapsed] = useState("");
  const ref = useRef();

  useEffect(() => {
    setFieldValue("country", phoneCode.country);
  }, [phoneCode.country]);

  useOnClickOutside(ref, () => setIsCollapsed(false));
  return (
    <Container ref={ref} onClick={() => setIsCollapsed(!isCollapsed)}>
      <p>{phoneCode.dialCode}</p>
      {isCollapsed && (
        <CountryContainer onClick={(e) => e.stopPropagation()}>
          <InputF
            style={{
              margin: "0px",
              border: "none",
              borderBottom: `1px solid ${colors.lightestGray}`,
              color: "white",
              fontWeight: "600",
            }}
            labelClr="white"
            labelBg="transparent"
            inputBg="transparent"
            mWidth="100%"
            type={"text"}
            label={"Search"}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <CountrySelectionContainer>
            {countryCodes
              .filter(
                (a) =>
                  a.name.toUpperCase().includes(searchInput.toUpperCase()) ||
                  a.dial_code.includes(searchInput)
              )
              .map((element, index) => (
                <CountrySelection
                  key={index}
                  onClick={() => {
                    setphoneCode({
                      dialCode: element.dial_code,
                      country: element.code,
                    });
                    setFieldValue("phone", element.dial_code + phone);

                    setIsCollapsed(false);
                  }}
                >
                  <Image
                    src={
                      `/assets/images/flags/32x32/${element.code.toLocaleLowerCase()}.png` ||
                      ""
                    }
                    // src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${element.code}.svg`}
                    width={32}
                    height={32}
                    priority
                    alt={`${element.code} flag`}
                  />
                  <p>{element.name}</p>
                  <p>{element.dial_code}</p>
                </CountrySelection>
              ))}
          </CountrySelectionContainer>
        </CountryContainer>
      )}
    </Container>
  );
};

export default PhoneSelection;
