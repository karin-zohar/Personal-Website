import React, { FC, RefObject, useEffect, useState } from "react";
import "./navigation.style.css";
import { useWindowSize } from "react-use";

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
        <span className="top gutter">top nav</span>
      ) : (
        <span>&#9776;</span>
      )}
    </div>
  );
};

export default Navigation;
