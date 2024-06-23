import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { addPrevValues } from './prev-exercise-log.js'
//  @route GET api/exercises/log
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

//  @route GET api/exercises/log/:id
export const getLogExercise = asyncHandler(async (req, res) => {
	const logExercise = await prisma.logExercise.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			exercise: true,
			times: {
				orderBy: {
					id: 'asc'
				}
			}
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

//  @route GET api/exercises/log/times
export const getAllExerciseLogTimes = asyncHandler(async (req, res) => {
	const exerciseTime = await prisma.exerciseTime.findMany({})

	res.json(exerciseTime)
})
