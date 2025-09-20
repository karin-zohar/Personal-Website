import React, { FC, RefObject, useEffect, useState } from "react";
import "./navigation.style.css";
import { useWindowSize } from "react-use";
import ToggleThemeButton from "./components/ToggleThemeButton";
import { Flex } from "antd";

type NavigationProps = {
  heroRef: RefObject<HTMLElement | null>;
};

const Navigation: FC<NavigationProps> = ({ heroRef }) => {
  const { width: windowWidth } = useWindowSize();
  const [isTopNav, setIsTopNav] = useState(windowWidth > 600);

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

  return (
    <div className="navigation">
      {isTopNav ? (
        <Flex gap={6} className="top gutter">
          <span>top nav</span>
          <span>פרוייקטים</span>
          <ToggleThemeButton />
        </Flex>
      ) : (
        <span>&#9776;</span>
      )}
    </div>
  );
};

export default Navigation;
