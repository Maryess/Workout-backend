import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	deleteAllUsers,
	deleteUser,
	getAllUsers,
	getUserProfile
} from './user.controller.js'

const router = express.Router()

router.route('/').get(protect, getAllUsers)
router.route('/').delete(protect, deleteAllUsers)
router.route('/:id').delete(protect, deleteUser)
router.route('/profile').get(protect, getUserProfile)

export default router
