import React, { forwardRef } from "react";
import "./hero.style.css";

const Hero = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div className={"hero"} ref={ref}>
      {/* Hero content */}
    </div>
  );
});

export default Hero;
