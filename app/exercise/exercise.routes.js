import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	createNewExercise,
	deleteAllExercises,
	deleteExercise,
	getAllExercises,
	getExercise,
	updateExercise
} from './exercise.controller.js'

const router = express.Router()

router
	.route('/')
	.post(protect, createNewExercise)
	.get(protect, getAllExercises)
	.delete(protect, deleteAllExercises)
router
	.route('/:id')
	.get(protect, getExercise)
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)

export default router
