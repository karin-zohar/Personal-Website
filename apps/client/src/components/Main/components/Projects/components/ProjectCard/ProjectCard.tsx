import { Dictionary } from "@/store/slices/i18n.slice";
import useStore from "@/store/store";
import { Tag } from "antd";
import React, { FC } from "react";
import "./project-card.style.css";

type ProjectCardProps = {
  key: string;
  imgUrl: string;
  title: Dictionary;
  tags: string[];
};

const ProjectCard: FC<ProjectCardProps> = ({ key, imgUrl, title, tags }) => {
  const { getLocalizedText } = useStore();
  return (
    <div className="project-card" key={key}>
      <span className="title">{getLocalizedText(title)}</span>
      <div className="tags-container">
        {tags.map((tag) => (
          <Tag className="project-tag">{`#${tag}`}</Tag>
        ))}
      </div>
      <div className="project-image-container">
        <img src={imgUrl} />
      </div>
    </div>
  );
};

export default ProjectCard;
