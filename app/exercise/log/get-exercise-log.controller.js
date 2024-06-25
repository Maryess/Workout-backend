import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { addPrevValues } from './prev-exercise-log.js'

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
			exerciseId: logExercise.exerciseId,
			userId: req.user.id,
			isCompleted: true
		},
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			times: true
		}
	})

	res.json({
		...logExercise,
		times: addPrevValues(logExercise, prevExercisesLog)
	})
})
