import React, { useRef } from "react";
import { Hero, Navigation } from "./components/Header.components.index";

const Header = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  return (
    <header>
      <Hero ref={heroRef} />
      <Navigation heroRef={heroRef} />
    </header>
  );
};

export default Header;
