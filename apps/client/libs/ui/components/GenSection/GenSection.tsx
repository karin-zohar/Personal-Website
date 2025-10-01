import React, { forwardRef, ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
};

const GenSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, children }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        style={{ border: "2px solid red", height: 500, marginBlock: 20 }}
      >
        {children}
      </div>
    );
  }
);

GenSection.displayName = "GenSection";

export default GenSection;
