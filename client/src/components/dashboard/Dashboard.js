import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import HabitCard from './HabitCard';
import AddHabitForm from './AddHabitForm';
import LoadingSpinner from '../common/LoadingSpinner';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      const res = await axios.get('/api/habits', {
        headers: {
          'x-auth-token': token
        }
      });
      setHabits([...res.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch habits');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (habitId) => {
    setHabits(habits.filter(habit => habit._id !== habitId));
  };

  const handleAddHabit = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="mb-0">My Habits</h2>
          <p className="text-muted">Track your daily habits and build streaks</p>
        </div>
      </div>

      {showAddForm && (
        <div className="row mb-4">
          <div className="col">
            <AddHabitForm onHabitAdded={() => {
              fetchHabits();
              setShowAddForm(false);
            }} onClose={handleCloseAddForm} />
          </div>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {habits.length === 0 ? (
          <div className="col-12">
            <div className="card text-center py-5">
              <div className="card-body">
                <i className="fas fa-plus-circle fa-3x text-muted mb-3"></i>
                <h5 className="card-title">No habits yet</h5>
                <p className="card-text text-muted">Start by adding your first habit</p>
                <button
                  className="btn btn-primary"
                  onClick={handleAddHabit}
                >
                  <i className="fas fa-plus me-2"></i>
                  Add Your First Habit
                </button>
              </div>
            </div>
          </div>
        ) : (
          habits.map(habit => (
            <div key={habit._id} className="col">
              <HabitCard
                habit={habit}
                onDelete={handleDelete}
                onComplete={fetchHabits}
              />
            </div>
          ))
        )}
      </div>

      {habits.length > 0 && (
        <button
          className="btn btn-primary btn-lg rounded-circle position-fixed bottom-0 end-0 m-4"
          style={{ width: '60px', height: '60px', zIndex: 1000 }}
          onClick={handleAddHabit}
          title="Add New Habit"
        >
          <i className="fas fa-plus"></i>
        </button>
      )}
    </div>
  );
};

export default Dashboard; 