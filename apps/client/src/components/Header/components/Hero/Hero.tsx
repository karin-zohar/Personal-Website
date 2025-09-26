import React, { forwardRef } from "react";

const Hero = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        background:
          "linear-gradient(160deg, var(--accent) 10%, transparent 50%",
        height: 500,
      }}
    >
      {/* Hero content */}
    </div>
  );
});

export default Hero;
