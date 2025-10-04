import React from "react";
import "./tech-stack.style.css";
import TechStackItem from "./components/TechStackItem";
import { Flex } from "antd";
import { techStackItems } from "./TechStack.const";
import { ReactIcon } from "./assets";

const TechStack = () => {
  console.log("ReactIcon: ", ReactIcon);
  return (
    <div className="tech-stack">
      <Flex className="tech-stack-items-container" gap={"4rem"}>
        {techStackItems.map(({ name, icon }) => (
          <TechStackItem name={name} key={name} icon={icon} />
        ))}
        {techStackItems.map(({ name, icon }) => (
          <TechStackItem name={name} key={`${name}-2`} icon={icon} />
        ))}
      </Flex>
    </div>
  );
};

export default TechStack;
