import React, { FC } from "react";
import { Button, Drawer } from "antd";
import NavContent from "./NavContent";
import clsx from "clsx";
import useStore from "@/store/store";

type NavDrawerProps = {
  api: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

const NavDrawer: FC<NavDrawerProps> = ({ api }) => {
  const { theme } = useStore();
  const { open, onOpen, onClose } = api;
  return (
    <>
      <Button
        className={clsx("open-nav-drawer-button", { "drawer-open": open })}
        type="text"
        onClick={onOpen}
      >
        &#9776;
      </Button>
      <Drawer
        className={clsx("nav-drawer", "theme", theme)}
        open={open}
        onClose={onClose}
      >
        <NavContent layout={"vertical"} />
      </Drawer>
    </>
  );
};

export default NavDrawer;
