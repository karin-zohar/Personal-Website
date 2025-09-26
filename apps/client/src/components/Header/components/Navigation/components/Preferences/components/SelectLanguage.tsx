import React from "react";
import useStore from "@/store/store";
import GenSelect from "@/libs/ui/components/GenSelect/GenSelect";

const SelectLanguage = () => {
  const { language, setLanguage } = useStore();

  const languageOptions = [
    { label: "English", value: "english" },
    { label: "עברית", value: "hebrew" },
  ];

  return (
    <GenSelect
      options={languageOptions}
      value={language}
      onChange={(value) => setLanguage(value)}
    />
  );
};

export default SelectLanguage;
