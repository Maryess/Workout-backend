import express from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import { createLogWorkout, getLogWorkout } from './workout-log.controller.js'
const router = express.Router()

router
	.route('/:id')

	.post(protect, createLogWorkout)
	.get(protect, getLogWorkout)

export default router
