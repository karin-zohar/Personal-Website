import React, { FC } from "react";
import { Flex } from "antd";
import ToggleTheme from "./ToggleTheme";
import SetLanguage from "./SetLanguage";
import NavMenu from "./NavMenu";

type NavContentProps = {
  layout: "horizontal" | "vertical";
};

const NavContent: FC<NavContentProps> = ({ layout }) => {
  return (
    <Flex gap={10} className="top gutter" vertical={layout === "vertical"}>
      <Flex className="preferences" gap={6}>
        <ToggleTheme />
        <SetLanguage />
      </Flex>
      <NavMenu layout={layout} />
    </Flex>
  );
};

export default NavContent;
