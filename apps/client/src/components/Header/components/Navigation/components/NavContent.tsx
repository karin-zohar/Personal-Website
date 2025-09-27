import React, { FC } from "react";
import { Flex } from "antd";
import NavMenu from "./NavMenu";
import clsx from "clsx";
import Preferences from "./Preferences/Preferences";

type NavContentProps = {
  layout: "horizontal" | "vertical";
};

const NavContent: FC<NavContentProps> = ({ layout }) => {
  return (
    <Flex
      gap={10}
      className={clsx({
        "top gutter": layout === "horizontal",
      })}
      vertical={layout === "vertical"}
    >
      <NavMenu layout={layout} />
      <Preferences />
    </Flex>
  );
};

export default NavContent;
