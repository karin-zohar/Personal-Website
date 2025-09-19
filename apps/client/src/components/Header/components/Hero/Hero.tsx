import React, { forwardRef } from "react";

const Hero = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} style={{ backgroundColor: "#E9B3FB", height: 500 }}>
      {/* Hero content */}
    </div>
  );
});

export default Hero;
