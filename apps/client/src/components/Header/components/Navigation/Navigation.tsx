import React, { FC, RefObject, useEffect, useState } from "react";
import "./navigation.style.css";
import { useWindowSize } from "react-use";

type NavigationProps = {
  heroRef: RefObject<HTMLElement | null>;
};

const Navigation: FC<NavigationProps> = ({ heroRef }) => {
  const { width } = useWindowSize();
  const [isTopNav, setIsTopNav] = useState(width > 600);

  useEffect(() => {
    if (width < 600 || !heroRef.current) {
      setIsTopNav(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTopNav(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroRef.current);

    return () => {
      observer.disconnect();
    };
  }, [width]);

  return (
    <div className="navigation">
      {isTopNav ? <span className="top gutter">hi</span> : <span>bye</span>}
    </div>
  );
};

export default Navigation;
