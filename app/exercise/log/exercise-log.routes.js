import express from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
	completeExerciseLog,
	createLogExercise,
	deleteAllLogExercises,
	deleteLogExercise,
	updateExerciseLogTime
} from './exercise-log.controller.js'
import { getLogExercise } from './get-exercise-log.controller.js'

const router = express.Router()

router.route('/').delete(protect, deleteAllLogExercises)
router
	.route('/:id')
	.get(protect, getLogExercise)
	.delete(protect, deleteLogExercise)
router.route('/time/:id').put(protect, updateExerciseLogTime)
router.route('/:exerciseId').post(protect, createLogExercise)
router.route('/complete/:id').patch(protect, completeExerciseLog)

export default router
