import { NextFunction, Request, Response, Router } from 'express';
import { Activity, Team, User, Workout } from '../models.js';

export const apiRouter = Router();

apiRouter.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/users', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'name email grade').sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/activities', async (request, response, next) => {
  try {
    const filter = typeof request.query.user === 'string' ? { user: request.query.user } : {};
    response.json(await Activity.find(filter).populate('user', 'name email').sort({ completedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/activities', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { _id: 0, user: { _id: '$user._id', name: '$user.name' }, points: 1, activities: 1 } },
    ]);
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/workouts', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/workouts', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    next(error);
  }
});

apiRouter.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  const message = error instanceof Error ? error.message : 'Request failed';
  response.status(400).json({ error: message });
});