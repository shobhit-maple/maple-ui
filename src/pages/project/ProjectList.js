import React, {useState} from 'react';
import ProjectCard from './ProjectCard';
import '../../styles/project/ProjectList.css';
import CreateProject from './CreateProject';
import {fetchProjects} from "../../services/projectService";
import {AiOutlinePlus} from "react-icons/ai";
import EditProject from "./EditProject";

const ProjectList = ({selectedTeam, projects, setProjects}) => {
  const [isCreateProjectOpen, setCreateProjectOpen] = useState(false);
  const [isEditProjectOpen, setEditProjectOpen] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);

  const handleOpenCreateProject = () => {
    setCreateProjectOpen(true);
  };

  const handleCloseCreateProject = () => {
    setCreateProjectOpen(false);
  };

  const handleProjectCreated = async () => {
    try {
      const updatedProjects = await fetchProjects(selectedTeam);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Failed to refresh projects:', error);
    }
  };

  const handleOpenEditProject = (projectId) => {
    setEditProjectId(projectId);
    setEditProjectOpen(true);
  };

  const handleCloseEditProject = () => {
    setEditProjectOpen(false);
    setEditProjectId(null);
  };

  const handleProjectEdited = async () => {
    try {
      const updatedProjects = await fetchProjects(selectedTeam);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Failed to refresh projects:', error);
    }
    handleCloseEditProject();
  };

  return (
      <div className="project-list">
        <div className="project-header">
          <button className="primary-btn" onClick={handleOpenCreateProject}>
            <AiOutlinePlus className="icon"/> Create
          </button>
        </div>
        <div className="project-grid">
          {projects.content.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project}
                             onClick={() => handleOpenEditProject(project.id)}/>
                {editProjectId === project.id && (
                    <EditProject
                        project={project}
                        selectedTeam={selectedTeam}
                        isOpen={editProjectId === project.id}
                        onClose={handleCloseEditProject}
                        onProjectEdited={handleProjectEdited}
                    />
                )}
              </div>
          ))}
        </div>

        <CreateProject
            selectedTeam={selectedTeam}
            isOpen={isCreateProjectOpen}
            onClose={handleCloseCreateProject}
            onProjectCreated={handleProjectCreated}
        />
      </div>
  );
};

export default ProjectList;
