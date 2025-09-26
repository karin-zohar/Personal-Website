import React from "react";
import useStore from "@/store/store";
import { MoonIcon, SunIcon } from "@/libs/ui/icons";
import GenSelect from "@/libs/ui/components/GenSelect/GenSelect";

const SelectTheme = () => {
  const { theme, setTheme } = useStore();
  const themeOptions = [
    {
      label: <SunIcon />,
      value: "light",
    },
    {
      label: <MoonIcon />,
      value: "dark",
    },
  ];

  return (
    <GenSelect
      options={themeOptions}
      value={theme}
      onChange={(value) => setTheme(value)}
    />
  );
};

export default SelectTheme;
