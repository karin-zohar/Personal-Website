import React from "react";
import { Flex } from "antd";
import SelectTheme from "./components/SelectTheme";
import SelectLanguage from "./components/SelectLanguage";

const Preferences = () => {
  return (
    <Flex className="preferences" gap={6}>
      <SelectTheme />
      <SelectLanguage />
    </Flex>
  );
};

export default Preferences;
