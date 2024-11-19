import React from 'react';
import '../../styles/project/ProjectCard.css';
import ProjectTypes from "./ProjectTypes";

const ProjectCard = ({project, onClick}) => {

  const projectType = ProjectTypes[project.data.type];

  return (
      <div className={`project-card ${projectType.className}`} key={project.id} onClick={onClick}>
        <p className="project-card-name">{project.data.name}</p>
        <p className="project-card-description">{project.data.description}</p>
        {projectType.icon}
      </div>
  );
};

export default ProjectCard;
