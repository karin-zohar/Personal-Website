import React, { FC } from "react";

type TechStackItemProps = {
  name: string;
};

const TechStackItem: FC<TechStackItemProps> = ({ name }) => {
  return <div>{name}</div>;
};

export default TechStackItem;
