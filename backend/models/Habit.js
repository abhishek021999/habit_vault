const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  targetDays: {
    type: [Number], // 0-6 representing days of the week (0 = Sunday)
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  completionHistory: [{
    date: {
      type: Date,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    }
  }],
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to update streak
HabitSchema.methods.updateStreak = async function() {
  const targetDays = this.targetDays;
  // Build a map of date string (YYYY-MM-DD) to completed status
  const completionMap = {};
  this.completionHistory.forEach(entry => {
    const d = new Date(entry.date);
    d.setUTCHours(0, 0, 0, 0);
    const dateStr = d.toISOString().split('T')[0];
    completionMap[dateStr] = entry.completed;
  });

  // Find all target days from startDate to today (UTC)
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  let date = new Date(this.startDate);
  date.setUTCHours(0, 0, 0, 0);

  let streak = 0;
  let longestStreak = 0;
  let lastWasMissed = false;

  // Collect all target days up to today
  const targetDayDates = [];
  while (date <= today) {
    if (targetDays.includes(date.getUTCDay())) {
      targetDayDates.push(new Date(date));
    }
    date.setUTCDate(date.getUTCDate() + 1);
  }

  // Calculate streaks
  for (let i = 0; i < targetDayDates.length; i++) {
    const d = targetDayDates[i];
    d.setUTCHours(0, 0, 0, 0);
    const dateStr = d.toISOString().split('T')[0];
    if (completionMap[dateStr]) {
      streak++;
      if (streak > longestStreak) longestStreak = streak;
      lastWasMissed = false;
    } else {
      streak = 0;
      lastWasMissed = true;
    }
  }

  // If the last target day was missed, streak is 0
  // If the last target day was completed, streak is as counted
  this.currentStreak = lastWasMissed ? 0 : streak;
  this.longestStreak = longestStreak;
  await this.save();
};

module.exports = mongoose.model('Habit', HabitSchema); 