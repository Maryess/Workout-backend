import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

//  @route POST api/exercises/log
export const createLogExercise = asyncHandler(async (req, res) => {
	let defaultTimes = []
	const exerciseId = +req.params.exerciseId
	const exercise = await prisma.exercise.findUnique({
		where: {
			id: exerciseId
		}
	})

	for (let index = 0; index < exercise.times; index++) {
		defaultTimes.push({
			weight: 0,
			repeat: 0
		})
	}

	const logExercise = await prisma.logExercise.create({
		data: {
			user: {
				connect: req.params.id
			},
			exercise: {
				connect: {
					id: exerciseId
				}
			},
			times: {
				createMany: {
					data: defaultTimes
				}
			}
		},
		include: {
			times: true
		}
	})

	res.json(logExercise)
})

//@route PATH api/exercises/log/times/:id
export const updateExerciseLogTime = asyncHandler(async (req, res) => {
	const { weight, repeat, isCompleted } = req.body

	try {
		const exerciseLogTime = await prisma.exerciseTime.update({
			where: {
				id: +req.params.id
			},
			data: {
				weight,
				repeat,
				isCompleted
			}
		})

		res.json(exerciseLogTime)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise log time not found!')
	}
})

// @route   PATCH /api/exercises/log/complete/:id
export const completeExerciseLog = asyncHandler(async (req, res) => {
	const { isCompleted } = req.body

	try {
		const exerciseLog = await prisma.logExercise.update({
			where: {
				id: +req.params.id
			},
			data: {
				isCompleted
			},
			include: { exercise: true, logWorkout: true }
		})

		res.json(exerciseLog)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise log not found!')
	}
})

//  @route DELETE api/exercises/log/:id
export const deleteLogExercise = asyncHandler(async (req, res) => {
	await prisma.logExercise.delete({
		where: {
			id: +req.params.id
		}
	})

	res.json({ message: 'Log deleted!' })
})

//  @route DELETE api/exercises/log
export const deleteAllLogExercises = asyncHandler(async (req, res) => {
	await prisma.logExercise.deleteMany({})

	res.json({ message: 'LogExercises deleted!' })
})
