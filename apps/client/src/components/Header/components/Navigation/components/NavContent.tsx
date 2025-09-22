import React, { FC } from "react";
import { Flex } from "antd";
import ToggleThemeButton from "./ToggleThemeButton";
import SetLanguageButton from "./SetLanguageButton";
import NavMenu from "./NavMenu";

type NavContentProps = {
  layout: "horizontal" | "vertical";
};

const NavContent: FC<NavContentProps> = ({ layout }) => {
  return (
    <Flex gap={10} className="top gutter" vertical={layout === "vertical"}>
      <Flex className="preferences" gap={6}>
        <ToggleThemeButton />
        <SetLanguageButton />
      </Flex>
      <NavMenu layout={layout} />
    </Flex>
  );
};

export default NavContent;
