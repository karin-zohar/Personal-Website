import React, { FC } from "react";
import { Flex } from "antd";
import SelectTheme from "./SelectTheme";
import SelectLanguage from "./SelectLanguage";
import NavMenu from "./NavMenu";
import clsx from "clsx";

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
      <Flex className="preferences" gap={6}>
        <SelectTheme />
        <SelectLanguage />
      </Flex>
    </Flex>
  );
};

export default NavContent;
