import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { addPrevValues } from './prev-exercise-log.js'

//  @route POST api/exercises/log
export const getAllLogExercise = asyncHandler(async (req, res) => {
	const logExercise = await prisma.logExercise.findMany({
		orderBy: {
			createdAt: 'asc'
		},
		include: {
			times: true,
			exercise: true
		}
	})
	const times = await prisma.exerciseTime.findMany({
		orderBy: {
			createdAt: 'asc'
		}
	})

	res.json(logExercise)
})
export const getLogExercise = asyncHandler(async (req, res) => {
	const logExercise = await prisma.logExercise.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			exercise: true,
			times: true
		}
	})

	if (!logExercise) {
		res.status(404)
		throw new Error('Exercise log is not found')
	}

	const prevExercisesLog = await prisma.logExercise.findFirst({
		where: {
			isCompleted: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	})

	const newValue = addPrevValues(logExercise, prevExercisesLog)

	res.json({ ...logExercise, times: newValue })
})

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

//@route PATH api/exercises/times/:id
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

export const getAllExerciseLogTimes = asyncHandler(async (req, res) => {
	const exerciseTime = await prisma.exerciseTime.findMany({})

	res.json(exerciseTime)
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
