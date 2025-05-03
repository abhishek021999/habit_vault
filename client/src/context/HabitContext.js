import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../config/axios';
import { useAuth } from './AuthContext';

const HabitContext = createContext(null);

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const { token } = useAuth();

  const fetchHabits = async () => {
    try {
      const res = await axios.get('/api/habits', {
        headers: { 'x-auth-token': token }
      });
      setHabits(res.data);
    } catch (err) {
      console.error('Error fetching habits:', err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchHabits();
    }
  }, [token]);

  const addHabit = async (habitData) => {
    try {
      const res = await axios.post('/api/habits', habitData, {
        headers: { 'x-auth-token': token }
      });
      setHabits([...habits, res.data]);
      return true;
    } catch (err) {
      console.error('Error adding habit:', err.response?.data?.message || err.message);
      return false;
    }
  };

  const toggleHabitCompletion = async (habitId) => {
    try {
      const res = await axios.put(`/api/habits/${habitId}/complete`, {}, {
        headers: { 'x-auth-token': token }
      });
      setHabits(habits.map(habit => 
        habit._id === habitId ? res.data : habit
      ));
      return true;
    } catch (err) {
      console.error('Error toggling habit:', err.response?.data?.message || err.message);
      return false;
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await axios.delete(`/api/habits/${habitId}`, {
        headers: { 'x-auth-token': token }
      });
      setHabits(habits.filter(habit => habit._id !== habitId));
      return true;
    } catch (err) {
      console.error('Error deleting habit:', err.response?.data?.message || err.message);
      return false;
    }
  };

  const value = {
    habits,
    addHabit,
    toggleHabitCompletion,
    deleteHabit,
    fetchHabits
  };

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

export default HabitContext; 