import React, { useState } from 'react';
import axios from '../../config/axios';

const AddHabitForm = ({ onHabitAdded, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetDays: [],
    startDate: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDayChange = day => {
    setFormData(prev => ({
      ...prev,
      targetDays: prev.targetDays.includes(day)
        ? prev.targetDays.filter(d => d !== day)
        : [...prev.targetDays, day]
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      await axios.post('/api/habits', formData, {
        headers: {
          'x-auth-token': token
        }
      });
      setFormData({
        name: '',
        targetDays: [],
        startDate: new Date().toISOString().split('T')[0]
      });
      setError('');
      onHabitAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add habit');
    }
  };

  const days = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  return (
    <div className="card">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="fas fa-plus-circle text-primary me-2"></i>
          Add New Habit
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Habit Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Morning Exercise"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Target Days</label>
            <div className="d-flex flex-wrap gap-2">
              {days.map(day => (
                <div key={day.value} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`day-${day.value}`}
                    checked={formData.targetDays.includes(day.value)}
                    onChange={() => handleDayChange(day.value)}
                  />
                  <label className="form-check-label" htmlFor={`day-${day.value}`}>
                    {day.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabitForm; 