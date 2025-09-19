import React, { useRef } from "react";
import Hero from "../Hero/Hero";
import Navigation from "../Navigation/Navigation";

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
