import React, { FC } from "react";

type TechStackItemProps = {
  name: string;
};

const TechStackItem: FC<TechStackItemProps> = ({ name }) => {
  return (
    <div className="tech-stack-item">
      <div className="tech-stack-item-inner">{name}</div>
    </div>
  );
};

export default TechStackItem;
