import React, { useEffect, useState } from 'react';
import { tasksAPI } from '../services/api';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getDashboard();
      setStats(response.data.stats);
    } catch (err) {
      setError('Failed to load dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {error && <div className="error-message">{error}</div>}

      {stats && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3>Assigned Tasks</h3>
                <p className="stat-number">{stats.assignedTasks}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>Completed</h3>
                <p className="stat-number">{stats.completedTasks}</p>
              </div>
            </div>

            <div className="stat-card alert">
              <div className="stat-icon">⏰</div>
              <div className="stat-content">
                <h3>Overdue</h3>
                <p className="stat-number">{stats.overdueTasks}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📁</div>
              <div className="stat-content">
                <h3>Projects</h3>
                <p className="stat-number">{stats.projects}</p>
              </div>
            </div>
          </div>

          <div className="progress-section">
            <h2>Project Progress</h2>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${stats.projectCompletion}%` }}
                ></div>
              </div>
              <p>{stats.projectCompletion}% Complete</p>
            </div>
            <p className="task-info">
              {stats.completedProjectTasks} of {stats.projectTasks} tasks completed
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
