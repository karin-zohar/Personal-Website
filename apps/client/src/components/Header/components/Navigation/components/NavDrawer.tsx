import React, { FC } from "react";
import { Button, Drawer } from "antd";
import NavContent from "./NavContent";
import clsx from "clsx";

type NavDrawerProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const NavDrawer: FC<NavDrawerProps> = ({ open, onOpen, onClose }) => {
  return (
    <>
      <Button
        className={clsx("open-nav-drawer-button", { "drawer-open": open })}
        type="text"
        onClick={onOpen}
      >
        &#9776;
      </Button>
      <Drawer className={clsx("nav-drawer")} open={open} onClose={onClose}>
        <NavContent layout={"vertical"} />
      </Drawer>
    </>
  );
};

export default NavDrawer;
