import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	createNewWorkout,
	deleteAllWorkouts,
	deleteWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller.js'

const router = express.Router()
router.route('/').post(protect, createNewWorkout)
router.route('/').get(protect, getWorkouts)
router.route('/:id').put(protect, updateWorkout)
router.route('/:id').delete(protect, deleteWorkout)
router.route('/').delete(protect, deleteAllWorkouts)

export default router
