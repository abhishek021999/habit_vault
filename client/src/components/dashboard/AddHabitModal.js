import React, { useState } from 'react';
import { useHabits } from '../../context/HabitContext';

const AddHabitModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetDays: [],
    startDate: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const { addHabit } = useHabits();

  const daysOfWeek = [
    { value: 0, label: 'Sun' },
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' },
    { value: 5, label: 'Fri' },
    { value: 6, label: 'Sat' }
  ];

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDayToggle = day => {
    const newTargetDays = formData.targetDays.includes(day)
      ? formData.targetDays.filter(d => d !== day)
      : [...formData.targetDays, day];
    setFormData({ ...formData, targetDays: newTargetDays });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (formData.targetDays.length === 0) {
      setError('Please select at least one target day');
      return;
    }

    const success = await addHabit(formData);
    if (success) {
      setFormData({
        name: '',
        targetDays: [],
        startDate: new Date().toISOString().split('T')[0]
      });
      onClose();
    } else {
      setError('Failed to add habit');
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-plus me-2"></i>
              Add New Habit
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
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
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Target Days</label>
                <div className="d-flex gap-1">
                  {daysOfWeek.map(day => (
                    <button
                      key={day.value}
                      type="button"
                      className={`btn btn-sm ${
                        formData.targetDays.includes(day.value)
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      }`}
                      onClick={() => handleDayToggle(day.value)}
                    >
                      {day.label}
                    </button>
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
              
              <div className="modal-footer px-0 pb-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal; 