import React from "react";
import useStore from "@/store/store";
import { Select } from "antd";

const SetLanguage = () => {
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

export default SetLanguage;
