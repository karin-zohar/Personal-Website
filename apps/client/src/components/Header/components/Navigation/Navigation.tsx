import React, { FC, RefObject, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import ToggleThemeButton from "./components/ToggleThemeButton";
import { Button, Drawer, Flex } from "antd";
import SetLanguageButton from "./components/SetLanguageButton";
import NavMenu from "./components/NavMenu";
import "./navigation.style.css";
import NavContent from "./components/NavContent";
import NavDrawer from "./components/NavDrawer";

type NavigationProps = {
  heroRef: RefObject<HTMLElement | null>;
};

const Navigation: FC<NavigationProps> = ({ heroRef }) => {
  const { width: windowWidth } = useWindowSize();
  const [isTopNav, setIsTopNav] = useState<boolean>(windowWidth > 600);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (windowWidth < 600 || !heroRef.current) {
      setIsTopNav(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([hero]) => {
        setIsTopNav(hero.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroRef.current);

    return () => {
      observer.disconnect();
    };
  }, [windowWidth]);

  const navDrawerApi = {
    open: isNavDrawerOpen,
    onOpen: () => {
      setIsNavDrawerOpen(true);
    },
    onClose: () => {
      setIsNavDrawerOpen(false);
    },
  };

  return (
    <div className="navigation">
      {isTopNav ? (
        <NavContent layout={"horizontal"} />
      ) : (
        <NavDrawer api={navDrawerApi} />
      )}
    </div>
  );
};

export default Navigation;
