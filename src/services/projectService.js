const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/api/projects";

export const fetchProjects = async (teamId) => {
  try {
    const response = await fetch(`${API_BASE_URL}?team_id=${teamId}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    try {
      return await response.json();
    } catch (jsonError) {
      const text = await response.text();
      throw new Error(`Invalid JSON response: ${text}`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    try {
      return await response.json();
    } catch (jsonError) {
      const text = await response.text();
      throw new Error(`Invalid JSON response: ${text}`);
    }
  } catch (error) {
    console.error('Create project error:', error);
    throw error;
  }
};

export const patchProject = async (projectId, projectData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${projectId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    try {
      return await response.json();
    } catch (jsonError) {
      const text = await response.text();
      throw new Error(`Invalid JSON response: ${text}`);
    }
  } catch (error) {
    console.error('Create project error:', error);
    throw error;
  }
};