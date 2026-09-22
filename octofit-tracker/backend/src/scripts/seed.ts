import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [alex, jordan] = await User.create([
      { name: 'Alex Morgan', email: 'alex@example.com', grade: '10' },
      { name: 'Jordan Lee', email: 'jordan@example.com', grade: '11' },
    ]);

    await Team.create({
      name: 'Trailblazers',
      color: '#f28c28',
      members: [alex._id, jordan._id],
    });

    await Activity.create([
      { user: alex._id, type: 'running', durationMinutes: 30, distanceMiles: 2.5, points: 25 },
      { user: jordan._id, type: 'strength', durationMinutes: 20, points: 20 },
    ]);

    await Workout.create([
      {
        title: 'Quick Cardio Circuit',
        description: 'A short running and walking session for busy school days.',
        level: 'beginner',
        durationMinutes: 20,
        activityType: 'cardio',
      },
      {
        title: 'Full Body Strength',
        description: 'A bodyweight routine covering legs, core, and upper body.',
        level: 'intermediate',
        durationMinutes: 30,
        activityType: 'strength',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
