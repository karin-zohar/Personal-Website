import React from "react";
import useStore from "@/store/store";
import { MoonIcon, SunIcon } from "@/libs/ui/icons";
import GenSelect from "@/libs/ui/components/GenSelect/GenSelect";

const SelectTheme = () => {
  const { theme, setTheme, getLocalizedText } = useStore();
  const themeOptions = [
    {
      label: <SunIcon />,
      value: "light",
      title: {
        english: "Light theme",
        hebrew: "ערכת נושא בהירה",
      },
    },
    {
      label: <MoonIcon />,
      value: "dark",
      title: {
        english: "Dark theme",
        hebrew: "ערכת נושא כהה",
      },
    },
  ];

  const localizedThemeOptions = themeOptions.map((option) => ({
    ...option,
    title: getLocalizedText(option.title) as string,
  }));

  return (
    <GenSelect
      options={localizedThemeOptions}
      value={theme}
      onChange={(value) => setTheme(value)}
    />
  );
};

export default SelectTheme;
