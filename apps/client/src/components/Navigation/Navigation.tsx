import React, { FC, RefObject, useEffect, useState } from "react";
import "./navigation.style.css";

type NavigationProps = {
  heroRef: RefObject<HTMLElement | null>;
};

const Navigation: FC<NavigationProps> = ({ heroRef }) => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTop(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="navigation">
      {isTop ? <span className="top gutter">hi</span> : <span>bye</span>}
    </div>
  );
};

export default Navigation;
