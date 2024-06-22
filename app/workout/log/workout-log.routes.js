import express from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
	createLogWorkout,
	deleteAllLogWorkouts,
	deleteLogWorkout,
	getAllLogWorkouts
} from './workout-log.controller.js'
const router = express.Router()

router
	.route('/')
	.delete(protect, deleteAllLogWorkouts)
	.get(protect, getAllLogWorkouts)
router
	.route('/:id')
	.delete(protect, deleteLogWorkout)
	.post(protect, createLogWorkout)

export default router
