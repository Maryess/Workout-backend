import express from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
	createLogWorkout,
	deleteAllLogWorkouts,
	deleteLogWorkout
} from './workout-log.controller.js'
const router = express.Router()

router.route('/:id').post(protect, createLogWorkout)
router.route('/').delete(protect, deleteAllLogWorkouts)
router.route('/:id').delete(protect, deleteLogWorkout)

export default router
