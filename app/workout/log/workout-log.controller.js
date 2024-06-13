import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

//  @route POST api/exercises/log
export const getAllLogWorkouts = asyncHandler(async (req, res) => {
	const logWorkout = await prisma.logWorkout.findMany({
		include: {
			logExercises: true
		}
	})

	res.json(logWorkout)
})

//  @route POST api/exercises/log
export const createLogWorkout = asyncHandler(async (req, res) => {
	const workoutId = +req.params.id

	const workout = await prisma.workout.findUnique({
		where: {
			id: workoutId
		},

		include: {
			exercises: true
		}
	})

	if (!workout) {
		res.status(404)
		throw new Error('Workout not found!')
	}

	const workoutLog = await prisma.logWorkout.create({
		data: {
			user: {
				connect: {
					id: req.user.id
				}
			},
			workout: {
				connect: {
					id: workoutId
				}
			},
			logExercises: {
				create: workout.exercises.map(exercise => ({
					user: {
						connect: {
							id: req.user.id
						}
					},
					exercise: {
						connect: {
							id: exercise.id
						}
					},
					times: {
						create: Array.from({ length: exercise.times }, () => ({
							weight: 0,
							repeat: 0
						}))
					}
				}))
			}
		},
		include: {
			logExercises: {
				include: {
					times: true
				}
			}
		}
	})

	res.json(workoutLog)
})

//  @route DELETE api/exercises/log/:id
export const deleteLogWorkout = asyncHandler(async (req, res) => {
	await prisma.logExercise.delete({
		where: {
			id: +req.params.id
		}
	})

	res.json({ message: 'LogWorkout deleted!' })
})

//  @route DELETE api/exercises/log/:id
export const deleteAllLogWorkouts = asyncHandler(async (req, res) => {
	await prisma.logExercise.delete({
		where: {
			id: +req.params.id
		}
	})

	res.json({ message: 'LogWorkouts deleted!' })
})
