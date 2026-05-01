import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { projectsAPI, tasksAPI } from '../services/api';
import '../styles/project-detail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium'
  });

  const fetchProjectDetails = useCallback(async () => {
    try {
      setLoading(true);
      const projRes = await projectsAPI.getOne(id);
      setProject(projRes.data.project);
      setTasks(projRes.data.tasks);
    } catch (err) {
      setError('Failed to load project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await tasksAPI.create({
        ...formData,
        projectId: id
      });
      setFormData({ title: '', description: '', priority: 'Medium' });
      setShowTaskForm(false);
      fetchProjectDetails();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await tasksAPI.update(taskId, { status: newStatus });
      fetchProjectDetails();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  if (loading) return <div className="loading">Loading project...</div>;

  return (
    <div className="project-detail">
      {project && (
        <>
          <div className="project-header">
            <div>
              <h1>{project.name}</h1>
              {project.description && <p>{project.description}</p>}
            </div>
            <span className={`status-badge status-${project.status.toLowerCase()}`}>
              {project.status}
            </span>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="tasks-section">
            <div className="section-header">
              <h2>Tasks</h2>
              <button className="btn-primary" onClick={() => setShowTaskForm(!showTaskForm)}>
                {showTaskForm ? 'Cancel' : '+ Add Task'}
              </button>
            </div>

            {showTaskForm && (
              <div className="task-form card">
                <form onSubmit={handleCreateTask}>
                  <input
                    type="text"
                    placeholder="Task Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                  <button type="submit" className="btn-primary">Create Task</button>
                </form>
              </div>
            )}

            {tasks.length === 0 ? (
              <p className="empty-state">No tasks yet. Create one to get started!</p>
            ) : (
              <div className="tasks-list">
                {tasks.map((task) => (
                  <div key={task._id} className="task-item card">
                    <div className="task-header">
                      <h4>{task.title}</h4>
                      <span className={`priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </div>
                    {task.description && <p>{task.description}</p>}
                    <div className="task-meta">
                      {task.assignedTo && <span>👤 {task.assignedTo.name}</span>}
                      {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
                    </div>
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                      className="task-status"
                    >
                      <option>Todo</option>
                      <option>In Progress</option>
                      <option>In Review</option>
                      <option>Done</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
