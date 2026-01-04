import React, { FC } from "react";
import useStore from "@/store/store";
import { ProjectCardProps } from "../../Projects.types";
import { Tag } from "antd";
import "./project-card.style.css";

const ProjectCard: FC<ProjectCardProps> = ({
  projectKey,
  title,
  projectUrl,
  imgUrl,
  tags,
}) => {
  const { getLocalizedText } = useStore();
  return (
    <a
      className="project-card"
      key={projectKey}
      href={projectUrl}
      target={"_blank"}
    >
      <span className="title">{getLocalizedText(title)}</span>
      <div className="tags-container">
        {tags.map((tag, idx) => (
          <Tag key={idx} className="project-tag">{`#${tag}`}</Tag>
        ))}
      </div>
      <div className="project-image-container">
        <img src={imgUrl} />
      </div>
    </a>
  );
};

export default ProjectCard;
