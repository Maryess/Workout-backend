import express from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
	createLogWorkout,
	getLogWorkout,
	updateCompleteWorkoutLog
} from './workout-log.controller.js'
const router = express.Router()

router.route('/:id').post(protect, createLogWorkout).get(protect, getLogWorkout)
router.route('/complete/:id').patch(protect, updateCompleteWorkoutLog)

export default router
