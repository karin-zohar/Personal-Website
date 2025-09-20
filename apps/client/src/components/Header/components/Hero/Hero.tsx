import React, { forwardRef } from "react";

const Hero = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} style={{ backgroundColor: "var(--teal-500)", height: 500 }}>
      {/* Hero content */}
    </div>
  );
});

export default Hero;
