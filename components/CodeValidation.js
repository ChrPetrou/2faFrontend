import React from "react";
import Section from "./common/Section";

const CodeValidation = ({ isSignInSection, customRef }) => {
  return (
    <Section
      customRef={customRef}
      isSignInSection={isSignInSection ? false : true}
      title={"Verify Code"}
    ></Section>
  );
};

export default CodeValidation;
