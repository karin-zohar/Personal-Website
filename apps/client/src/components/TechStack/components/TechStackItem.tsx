import React, { FC } from "react";
import { Flex } from "antd";

type TechStackItemProps = {
  name: string;
  icon?: any;
};

const TechStackItem: FC<TechStackItemProps> = ({ name, icon: Icon }) => {
  return (
    <div className="tech-stack-item">
      <Flex className="tech-stack-item-inner">
        {Icon && <Icon />}
        <span className="tech-stack-item-name">{name}</span>
      </Flex>
    </div>
  );
};

export default TechStackItem;
