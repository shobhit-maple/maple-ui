import React, { useState } from 'react';
import { createProject } from '../../services/projectService';
import ProjectTypes from "./ProjectTypes";
import '../../styles/shared/Utils.css';
import ModalHeader from "../shared/ModalHeader";

const CreateProject = ({ selectedTeam, isOpen, onClose, onProjectCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: Object.keys(ProjectTypes)[0],
    team_id: selectedTeam
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      onProjectCreated();
      onClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  if (!isOpen) return null;

  return (
      <div className="modal">
        <div className="modal-content">
          <ModalHeader title="Create project" />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="type">Project Type</label>
              <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
              >
                {Object.entries(ProjectTypes).map(([key, {label}]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-btn">Create</button>
              <button type="button" className="secondary-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default CreateProject;
