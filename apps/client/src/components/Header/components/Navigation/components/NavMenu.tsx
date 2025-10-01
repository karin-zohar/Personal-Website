import React, { FC } from "react";
import { Menu, MenuProps } from "antd";
import useStore from "@/store/store";
import { SectionKey } from "@/store/slices/navigationSlice";

type NavMenuProps = {
  layout: "horizontal" | "vertical";
};

type MenuItem = Required<MenuProps>["items"][number];

const NavMenu: FC<NavMenuProps> = ({ layout }) => {
  const { getLocalizedText, scrollTo } = useStore();

  const navItems = [
    {
      key: "about",
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

  const handleItemClick: MenuProps["onClick"] = ({ key }) => {
    console.log("key: ", key);
    scrollTo(key as SectionKey);
  };

  return (
    <Menu
      items={localizedNavItems}
      mode={layout}
      className={"nav-menu"}
      onClick={handleItemClick}
    />
  );
};

export default NavMenu;
