import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { deleteAllUsers, deleteUser, getAllUsers } from './user.controller.js'

const router = express.Router()

router.route('/').get(protect, getAllUsers)
router.route('/').delete(protect, deleteAllUsers)
router.route('/:id').delete(protect, deleteUser)

export default router
