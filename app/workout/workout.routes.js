import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	createNewWorkout,
	deleteAllWorkouts,
	deleteWorkout,
	getAllWorkouts,
	getWorkout,
	updateWorkout
} from './workout.controller.js'

const router = express.Router()
router
	.route('/')
	.post(protect, createNewWorkout)
	.get(protect, getAllWorkouts)
	.delete(protect, deleteAllWorkouts)
router
	.route('/:id')
	.get(protect, getWorkout)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)

export default router
