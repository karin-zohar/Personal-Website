import React, { FC } from "react";
import { Menu, MenuProps } from "antd";
import useStore from "@/store/store";
import { SectionKey } from "@/store/slices/SectionSlice";
import useScrollSpy from "@/libs/ui/hooks/useScrollSpy";

type NavMenuProps = {
  layout: "horizontal" | "vertical";
  closeDrawer?: () => void;
};

type MenuItem = Required<MenuProps>["items"][number];

const NavMenu: FC<NavMenuProps> = ({ layout, closeDrawer }) => {
  const { getLocalizedText, scrollTo, sectionRefs } = useStore();
  const activeKey = useScrollSpy(sectionRefs);
  const navItems = [
    {
      key: "about",
      label: {
        english: "About Me",
        hebrew: "קצת עלי",
      },
    },
    // {
    //   key: "projects",
    //   label: {
    //     english: "Projects",
    //     hebrew: "פרוייקטים",
    //   },
    // },
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
    scrollTo(key as SectionKey);
    closeDrawer?.();
  };

  return (
    <Menu
      items={localizedNavItems}
      mode={layout}
      className={"nav-menu"}
      onClick={handleItemClick}
      selectedKeys={[activeKey]}
    />
  );
};

export default NavMenu;
