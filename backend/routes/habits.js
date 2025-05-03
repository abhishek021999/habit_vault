const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Habit = require('../models/Habit');
const auth = require('../middleware/auth');

// Get all habits for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single habit by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(habit);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new habit
router.post('/', [
  auth,
  check('name', 'Name is required').not().isEmpty(),
  check('targetDays', 'Target days are required').isArray(),
  check('startDate', 'Start date is required').isISO8601()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, targetDays, startDate } = req.body;

  try {
    const newHabit = new Habit({
      name,
      targetDays,
      startDate,
      user: req.user.id
    });

    const habit = await newHabit.save();
    res.json(habit);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update habit completion status
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Use UTC midnight for today or override date
    let markDate;
    if (req.body.dateOverride) {
      markDate = new Date(req.body.dateOverride);
      markDate.setUTCHours(0, 0, 0, 0);
    } else {
      markDate = new Date();
      markDate.setUTCHours(0, 0, 0, 0);
    }
    const dateStr = markDate.toISOString().split('T')[0];

    // Find entry for the date
    let entry = habit.completionHistory.find(
      entry => new Date(entry.date).toISOString().split('T')[0] === dateStr
    );

    // Use completed status from request body if provided, else toggle
    let completed = typeof req.body.completed === 'boolean'
      ? req.body.completed
      : !(entry && entry.completed);

    if (entry) {
      entry.completed = completed;
      entry.date = markDate;
    } else {
      habit.completionHistory.push({ date: markDate, completed });
    }

    // IMPORTANT: Await updateStreak and then return the updated habit
    await habit.updateStreak();

    // Fetch the updated habit to ensure the latest values are sent
    const updatedHabit = await Habit.findById(habit._id);

    res.json(updatedHabit);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Edit a habit
router.put('/:id', [
  auth,
  check('name', 'Name is required').not().isEmpty(),
  check('targetDays', 'Target days are required').isArray(),
  check('startDate', 'Start date is required').isISO8601()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { name, targetDays, startDate } = req.body;
    
    // Update habit fields
    habit.name = name;
    habit.targetDays = targetDays;
    habit.startDate = startDate;

    await habit.save();
    res.json(habit);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a habit
router.delete('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Habit.deleteOne({ _id: req.params.id });
    res.json({ message: 'Habit removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; 