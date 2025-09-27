import React, { useRef } from "react";
import { Hero, Navigation } from "./components/Header.components.index";
import "./header.style.css";

const Header = () => {
  return (
    <header>
      <Navigation />
      <Hero />
    </header>
  );
};

export default Header;
