import React, { FC } from "react";
import { Flex } from "antd";

type TechStackItemProps = {
  name: string;
  icon?: any;
};

const TechStackItem: FC<TechStackItemProps> = ({ name, icon: Icon }) => {
  return (
    <Flex className="tech-stack-item">
      {Icon && <Icon />}
      <span className="tech-stack-item-name">{name}</span>
    </Flex>
  );
};

export default TechStackItem;
