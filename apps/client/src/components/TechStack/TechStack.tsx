import React, { Fragment } from "react";
import TechStackItem from "./components/TechStackItem";
import { Flex } from "antd";
import { techStackItems } from "./TechStack.const";
import "./tech-stack.style.css";

const TechStack = () => {
  return (
    <div className="tech-stack">
      <Flex className="tech-stack-items-container" gap={"4rem"}>
        {[...Array(2)].map((_, setIndex) => (
          <Fragment key={setIndex}>
            {techStackItems.map(({ name, icon }) => (
              <TechStackItem
                name={name}
                key={`${name}-${setIndex}`}
                icon={icon}
              />
            ))}
          </Fragment>
        ))}
      </Flex>
    </div>
  );
};

export default TechStack;
