import React, { FC } from "react";
import { Menu, MenuProps } from "antd";
import useStore from "@/store/store";

type NavMenuProps = {
  layout: "horizontal" | "vertical";
};

type MenuItem = Required<MenuProps>["items"][number];

const NavMenu: FC<NavMenuProps> = ({ layout }) => {
  const { getLocalizedText } = useStore();

  const navItems = [
    {
      key: "about-me",
      label: {
        english: "About Me",
        hebrew: "קצת עלי",
      },
    },
    {
      key: "projects",
      label: {
        english: "Projects",
        hebrew: "פרוייקטים",
      },
    },
    {
      key: "chatbot",
      label: {
        english: "Chatbot",
        hebrew: "צ'אטבוט",
      },
    },
    {
      key: "contact",
      label: {
        english: "Contact Me",
        hebrew: "צרו קשר",
      },
    },
  ];

  const localizedNavItems: MenuItem[] = navItems.map((item) => ({
    ...item,
    label: getLocalizedText(item.label),
  }));

  return (
    <Menu items={localizedNavItems} mode={layout} style={{ width: "100%" }} />
  );
};

export default NavMenu;
