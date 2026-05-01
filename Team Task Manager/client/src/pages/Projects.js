import React, { useEffect, useState } from 'react';
import { projectsAPI } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getAll();
      setProjects(response.data.projects);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await projectsAPI.create(formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      setError('Failed to create project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        fetchProjects();
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Projects</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="project-form card">
          <h3>Create New Project</h3>
          <form onSubmit={handleCreateProject}>
            <input
              type="text"
              placeholder="Project Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <button type="submit" className="btn-primary">Create Project</button>
          </form>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className={`status-badge status-${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
              </div>
              
              {project.description && <p>{project.description}</p>}
              
              <div className="progress-info">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${project.taskStats.progress}%` }}
                  ></div>
                </div>
                <small>
                  {project.taskStats.completed}/{project.taskStats.total} tasks completed
                </small>
              </div>

              <div className="project-actions">
                <Link to={`/projects/${project._id}`} className="btn-primary">
                  View
                </Link>
                <button onClick={() => handleDelete(project._id)} className="btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
