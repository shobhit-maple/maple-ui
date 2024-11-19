import React, { useState } from 'react';
import '../../styles/project/EditProject.css'; // Add your styles here
import { patchProject } from '../../services/projectService';
import ProjectTypes from './ProjectTypes';
import '../../styles/shared/Utils.css';
import { FaPencilAlt } from 'react-icons/fa';
import ModalHeader from "../shared/ModalHeader";

const EditProject = ({ project, isOpen, onClose, onProjectEdited }) => {
  const [editableFields, setEditableFields] = useState({
    name: false,
    description: false,
    type: false,
  });

  const [formData, setFormData] = useState({
    name: project.data.name,
    description: project.data.description,
    type: project.data.type,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleEdit = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== project[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length > 0) {
      try {
        await patchProject(project.id, updatedFields);
        onProjectEdited();
        onClose();
      } catch (error) {
        console.error('Failed to update project:', error);
      }
    } else {
      console.log('No changes detected');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
      <div className="modal">
        <div className="modal-content">
          <ModalHeader title="Edit project" />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              {editableFields.name ? (
                  <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                  />
              ) : (
                  <div className="editable-field">
                    <span>{formData.name}</span>
                    <FaPencilAlt onClick={() => handleToggleEdit('name')} />
                  </div>
              )}
            </div>
            <div className="form-group">
              <label>Description</label>
              {editableFields.description ? (
                  <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                  />
              ) : (
                  <div className="editable-field">
                    <span>{formData.description}</span>
                    <FaPencilAlt onClick={() => handleToggleEdit('description')} />
                  </div>
              )}
            </div>
            <div className="form-group">
              <label>Project Type</label>
              {editableFields.type ? (
                  <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                  >
                    {Object.entries(ProjectTypes).map(([key, { label }]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                    ))}
                  </select>
              ) : (
                  <div className="editable-field">
                    <span>{ProjectTypes[formData.type]?.label}</span>
                    <FaPencilAlt onClick={() => handleToggleEdit('type')} />
                  </div>
              )}
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-btn">Confirm</button>
              <button type="button" className="secondary-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default EditProject;
