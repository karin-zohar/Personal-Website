import useStore from "@/store/store";
import { Select } from "antd";
import React from "react";

const SetLanguageButton = () => {
  const { language, setLanguage } = useStore();

  const languageOptions = [
    { label: "English", value: "english" },
    { label: "עברית", value: "hebrew" },
  ];

  return (
    <Select
      options={languageOptions}
      value={language}
      onChange={(value) => setLanguage(value)}
    />
  );
};

export default SetLanguageButton;
