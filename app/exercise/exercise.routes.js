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

router.route('/').post(protect, createNewExercise)
router.route('/').get(protect, getAllExercises)
router.route('/:id').get(protect, getExercise)
router.route('/:id').put(protect, updateExercise)
router.route('/:id').delete(protect, deleteExercise)
router.route('/').delete(protect, deleteAllExercises)
export default router
