import React, { FC, RefObject, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import NavContent from "./components/NavContent";
import NavDrawer from "./components/NavDrawer";
import "./navigation.style.css";

type NavigationProps = {
  heroRef: RefObject<HTMLElement | null>;
};

const NARROW_SCREEN_WIDTH = 800;

const Navigation: FC<NavigationProps> = ({ heroRef }) => {
  const { width: windowWidth } = useWindowSize();
  const [isTopNav, setIsTopNav] = useState<boolean>(
    windowWidth > NARROW_SCREEN_WIDTH
  );
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (windowWidth < NARROW_SCREEN_WIDTH || !heroRef.current) {
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
