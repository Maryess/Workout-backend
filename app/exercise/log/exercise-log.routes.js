import express from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
	createLogExercise,
	deleteAllLogExercises,
	deleteLogExercise,
	updateExerciseLogTime
} from './exercise-log.controller.js'
import {
	getAllExerciseLogTimes,
	getAllLogExercise,
	getLogExercise
} from './get-exercise-log.controller.js'

const router = express.Router()

router
	.route('/')
	.get(protect, getAllLogExercise)
	.delete(protect, deleteAllLogExercises)
router
	.route('/:id')
	.get(protect, getLogExercise)
	.delete(protect, deleteLogExercise)
router.route('/time/:id').put(protect, updateExerciseLogTime)
router.route('/time').get(protect, getAllExerciseLogTimes)
router.route('/:exerciseId').post(protect, createLogExercise)

export default router
