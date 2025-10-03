import React, { forwardRef, ReactNode } from "react";
import "./gen-section.style.css";
import clsx from "clsx";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

const GenSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, children, className }, ref) => {
    return (
      <div className={clsx("gen-section", className)} ref={ref} id={id}>
        {children}
      </div>
    );
  }
);

GenSection.displayName = "GenSection";

export default GenSection;
