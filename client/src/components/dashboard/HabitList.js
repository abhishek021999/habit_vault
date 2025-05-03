import React from 'react';
import { useHabits } from '../../context/HabitContext';

const HabitList = ({ habits }) => {
  const { toggleHabitCompletion, deleteHabit } = useHabits();

  const getStreakColor = (streak) => {
    if (streak >= 30) return 'text-success';
    if (streak >= 14) return 'text-primary';
    if (streak >= 7) return 'text-info';
    return 'text-muted';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleToggle = async (habitId) => {
    await toggleHabitCompletion(habitId);
  };

  const handleDelete = async (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      await deleteHabit(habitId);
    }
  };

  return (
    <div className="row g-4">
      {habits.map(habit => (
        <div key={habit._id} className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title mb-0">{habit.name}</h5>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(habit._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              
              <p className="card-text text-muted small">
                Started {formatDate(habit.startDate)}
              </p>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span className={`h4 mb-0 ${getStreakColor(habit.currentStreak)}`}>
                    {habit.currentStreak}
                  </span>
                  <span className="text-muted ms-1">day streak</span>
                </div>
                
                <div>
                  <span className="text-muted me-1">Best:</span>
                  <span className="text-primary">{habit.longestStreak}</span>
                </div>
              </div>
              
              <button
                className={`btn btn-${habit.completionHistory.find(h => 
                  new Date(h.date).toDateString() === new Date().toDateString()
                )?.completed ? 'success' : 'outline-secondary'} w-100`}
                onClick={() => handleToggle(habit._id)}
              >
                {habit.completionHistory.find(h => 
                  new Date(h.date).toDateString() === new Date().toDateString()
                )?.completed ? (
                  <>
                    <i className="fas fa-check me-1"></i>
                    Completed Today
                  </>
                ) : (
                  <>
                    <i className="fas fa-square me-1"></i>
                    Mark Complete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitList; 