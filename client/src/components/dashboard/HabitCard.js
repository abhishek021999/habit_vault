import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';

const HabitCard = ({ habit, onDelete, onComplete }) => {
  const navigate = useNavigate();

  // Find today's entry
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];
  const todayDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const isTargetDay = habit.targetDays.includes(todayDay);
  const todayEntry = habit.completionHistory.find(
    h => new Date(h.date).toISOString().split('T')[0] === todayStr
  );

  // Find the most recent completionHistory entry
  let lastStatus = null;
  let lastStatusDate = null;
  if (habit.completionHistory && habit.completionHistory.length > 0) {
    // Sort by date descending
    const sorted = [...habit.completionHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    lastStatus = sorted[0].completed ? 'Completed' : 'Missed';
    lastStatusDate = new Date(sorted[0].date);
  }

  // Determine today's status
  let todayStatus = 'unmarked';
  if (todayEntry) {
    todayStatus = todayEntry.completed ? 'completed' : 'missed';
  }

  // Toggle status: unmarked -> completed -> missed -> unmarked
  const handleToggleStatus = async () => {
    if (!isTargetDay) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    let newStatus;
    if (todayStatus === 'unmarked' || todayStatus === 'missed') {
      newStatus = true;
    } else {
      newStatus = false;
    }
    try {
      await axios.put(`/api/habits/${habit._id}/complete`, { completed: newStatus }, {
        headers: { 'x-auth-token': token }
      });
      onComplete && onComplete();
    } catch (err) {
      console.error('Failed to update habit completion:', err);
    }
  };

  const handleMarkMissed = async () => {
    if (!isTargetDay) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.put(`/api/habits/${habit._id}/complete`, { completed: false }, {
        headers: { 'x-auth-token': token }
      });
      onComplete && onComplete();
    } catch (err) {
      console.error('Failed to mark habit as missed:', err);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      await axios.delete(`/api/habits/${habit._id}`, {
        headers: { 'x-auth-token': token }
      });
      onDelete(habit._id);
    } catch (err) {
      console.error('Failed to delete habit:', err);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-habit/${habit._id}`);
  };

  // UI for today's status
  let statusIcon, statusText, statusColor;
  if (todayStatus === 'completed') {
    statusIcon = <span className="fs-1 text-success">✅</span>;
    statusText = 'Completed';
    statusColor = 'success';
  } else if (todayStatus === 'missed') {
    statusIcon = <span className="fs-1 text-danger">❌</span>;
    statusText = 'Missed';
    statusColor = 'danger';
  } else {
    statusIcon = <span className="fs-1 text-secondary">⬜</span>;
    statusText = 'Not Marked';
    statusColor = 'secondary';
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="card shadow-sm rounded-4 h-100">
      <div className="card-body pb-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{habit.name}</h5>
          <div>
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={handleEdit}
              title="Edit Habit"
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleDelete}
              title="Delete Habit"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div className="mb-3">
          <div className="fw-semibold mb-1">Target Days:</div>
          <div className="d-flex flex-wrap gap-2">
            {habit.targetDays.map(day => (
              <span key={day} className="badge rounded-pill bg-primary px-3 py-2">
                {days[day]}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="fw-bold fs-5">{habit.currentStreak}</span>
              <span className="text-muted ms-1">day streak</span>
            </div>
            <div>
              <span className="text-muted me-1">Longest Streak:</span>
              <span className="fw-bold text-primary">{habit.longestStreak}</span>
            </div>
          </div>
        </div>

        {/* Last updated status */}
        {lastStatus && lastStatusDate && (
          <div className="mb-2 text-muted small">
            Last marked: <span className={lastStatus === 'Completed' ? 'text-success' : 'text-danger'}>
              {lastStatus}
            </span> on {lastStatusDate.toLocaleDateString()} at {lastStatusDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}

        <div className="d-flex flex-column align-items-center gap-2">
          {statusIcon}
          <div className={`fw-semibold text-${statusColor}`}>{statusText}</div>
          {isTargetDay ? (
            <div className="d-flex gap-2">
              <button
                className={`btn btn-${todayStatus === 'completed' ? 'outline-success' : 'success'} btn-sm rounded-pill px-3`}
                onClick={handleToggleStatus}
              >
                {todayStatus === 'completed' ? 'Undo' : 'Mark Completed'}
              </button>
              <button
                className={`btn btn-${todayStatus === 'missed' ? 'outline-danger' : 'danger'} btn-sm rounded-pill px-3`}
                onClick={handleMarkMissed}
                disabled={todayStatus === 'missed'}
              >
                Mark Missed
              </button>
            </div>
          ) : (
            <div className="text-muted small">Today is not a target day for this habit.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitCard; 
