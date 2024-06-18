import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.util.js'
//  @route GET api/users/profile
export const getAllUsers = asyncHandler(async (req, res) => {
	const user = await prisma.user.findMany({})

	res.json(user)
})

export const deleteUser = asyncHandler(async (req, res) => {
	await prisma.user.delete({
		where: {
			id: +req.params.id
		}
	})

	res.json({ message: 'User deleted!' })
})

export const deleteAllUsers = asyncHandler(async (req, res) => {
	await prisma.user.deleteMany({})

	res.json({ message: 'Users deleted!' })
})

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: UserFields
	})

	const minutes = await prisma.logExercise.count({
		where: {
			userId: req.user.id,
			isCompleted: true
		}
	})

	const kgs = await prisma.exerciseTime.aggregate({
		where: {
			logExercise: {
				userId: req.user.id
			},
			isCompleted: true
		},

		_sum: {
			weight: true
		}
	})

	const workouts = await prisma.logWorkout.count({
		where: {
			userId: user.id,
			isCompleted: true
		}
	})

	res.json({
		...user,
		statistics: [
			{
				label: 'Minutes',
				value: Math.ceil(minutes * 2.3) || 0
			},
			{
				label: 'Workouts',
				value: workouts
			},
			{
				label: 'Kgs',
				value: kgs._sum.weight || 0
			}
		]
	})
})
