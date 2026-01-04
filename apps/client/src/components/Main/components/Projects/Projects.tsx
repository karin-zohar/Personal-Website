import React from "react";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import { ProjectCardProps } from "./Projects.types";
import "./projects.style.css";

const Projects = () => {
  // Place holder data
  const projects: ProjectCardProps[] = [
    {
      projectKey: "test",
      projectUrl: "https://www.google.com",
      title: { english: "test", hebrew: "טסט" },
      imgUrl:
        "https://images.unsplash.com/photo-1761839259488-2bdeeae794f5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["react", "node"],
    },
    {
      projectKey: "test2",
      projectUrl: "https://www.google.com",
      title: { english: "test", hebrew: "טסט" },
      imgUrl:
        "https://images.unsplash.com/photo-1761839259488-2bdeeae794f5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["react", "node"],
    },
  ];

  return (
    <div className="projects-section">
      <ul className="project-cards-list">
        {projects.map(({ projectKey, title, projectUrl, imgUrl, tags }) => (
          <li key={projectKey}>
            <ProjectCard
              projectKey={projectKey}
              title={title}
              projectUrl={projectUrl}
              imgUrl={imgUrl}
              tags={tags}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
