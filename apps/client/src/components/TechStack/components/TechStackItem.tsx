import React, { FC } from "react";
import { Flex } from "antd";

type TechStackItemProps = {
  name: string;
  icon: any;
};

const TechStackItem: FC<TechStackItemProps> = ({ name, icon: Icon }) => {
  return (
    <div className="tech-stack-item">
      <Flex className="tech-stack-item-inner">
        <Icon />
        {/* <Text className="tech-stack-item-name">{name}</Text> */}
        <span className="tech-stack-item-name">{name}</span>
      </Flex>
    </div>
  );
};

export default TechStackItem;
