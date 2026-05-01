import React, { useEffect, useState } from 'react';
import { teamsAPI } from '../services/api';
import '../styles/teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamsAPI.getAll();
      setTeams(response.data.teams);
    } catch (err) {
      setError('Failed to load teams');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await teamsAPI.create(formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchTeams();
    } catch (err) {
      setError('Failed to create team');
    }
  };

  const handleDeleteTeam = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await teamsAPI.delete(id);
        fetchTeams();
      } catch (err) {
        setError('Failed to delete team');
      }
    }
  };

  if (loading) return <div className="loading">Loading teams...</div>;

  return (
    <div className="teams-page">
      <div className="teams-header">
        <h1>Teams</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Team'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="team-form card">
          <h3>Create New Team</h3>
          <form onSubmit={handleCreateTeam}>
            <input
              type="text"
              placeholder="Team Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <button type="submit" className="btn-primary">Create Team</button>
          </form>
        </div>
      )}

      {teams.length === 0 ? (
        <div className="empty-state">
          <p>No teams yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="teams-grid">
          {teams.map((team) => (
            <div key={team._id} className="team-card card">
              <h3>{team.name}</h3>
              {team.description && <p>{team.description}</p>}
              
              <div className="members-info">
                <strong>Members ({team.members.length})</strong>
                <div className="members-list">
                  {team.members.map((member) => (
                    <div key={member._id} className="member-item">
                      <span>{member.user.name}</span>
                      <small>{member.role}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className="team-actions">
                <button className="btn-primary">Edit</button>
                <button onClick={() => handleDeleteTeam(team._id)} className="btn-danger">
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

export default Teams;
