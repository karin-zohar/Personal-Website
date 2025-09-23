import React, { FC } from "react";
import { Button, Drawer } from "antd";
import NavContent from "./NavContent";

type NavDrawerProps = {
  api: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

const NavDrawer: FC<NavDrawerProps> = ({ api }) => {
  const { open, onOpen, onClose } = api;
  return (
    <>
      <Button className="open-nav-drawer-button" type="text" onClick={onOpen}>
        &#9776;
      </Button>
      <Drawer className="nav-drawer" open={open} onClose={onClose}>
        <NavContent layout={"vertical"} />
      </Drawer>
    </>
  );
};

export default NavDrawer;
