import React from "react";
import { Select } from "antd";
import useStore from "@/store/store";

const SelectTheme = () => {
  const { theme, setTheme, getLocalizedText } = useStore();
  const themeOptions = [
    {
      label: {
        english: "light",
        hebrew: "בהיר",
      },
      value: "light",
    },
    {
      label: {
        english: "dark",
        hebrew: "כהה",
      },
      value: "dark",
    },
  ];

  const localizedThemeOptions = themeOptions.map((option) => ({
    ...option,
    label: getLocalizedText(option.label),
  }));

  return (
    <Select
      options={localizedThemeOptions}
      value={theme}
      onChange={(value) => setTheme(value)}
    />
  );
};

export default SelectTheme;
