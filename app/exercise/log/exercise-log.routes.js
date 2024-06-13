import express from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
	createLogExercise,
	deleteAllLogExercises,
	deleteLogExercise,
	getAllLogExercise,
	getLogExercise,
	updateExerciseTime
} from './exercise-log.controller.js'

const router = express.Router()

router.route('/').get(protect, getAllLogExercise)
router.route('/:exerciseId').post(protect, createLogExercise)
router.route('/:id').put(protect, updateExerciseTime)
router.route('/:id').get(protect, getLogExercise)
router.route('/:id').delete(protect, deleteLogExercise)
router.route('/').delete(protect, deleteAllLogExercises)
export default router
