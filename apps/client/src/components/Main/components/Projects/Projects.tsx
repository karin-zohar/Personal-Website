import React from "react";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import { Flex } from "antd";

const Projects = () => {
  return (
    <div>
      <Flex className="project-cards-list" gap="20px" vertical>
        <ProjectCard
          key="test"
          title={{ english: "test", hebrew: "טסט" }}
          imgUrl="https://images.unsplash.com/photo-1761839259488-2bdeeae794f5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          tags={["react", "node"]}
        />
        <ProjectCard
          key="test2"
          title={{ english: "test", hebrew: "טסט" }}
          imgUrl="https://images.unsplash.com/photo-1761839259488-2bdeeae794f5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          tags={["react", "node"]}
        />
        <ProjectCard
          key="test3"
          title={{ english: "test", hebrew: "טסט" }}
          imgUrl="https://images.unsplash.com/photo-1761839259488-2bdeeae794f5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          tags={["react", "node"]}
        />
      </Flex>
    </div>
  );
};

export default Projects;
