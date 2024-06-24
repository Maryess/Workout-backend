import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

//  @route GET api/workouts/log/:id
export const getLogWorkout = asyncHandler(async (req, res) => {
	const logWorkout = await prisma.logWorkout.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			logExercises: {
				include: {
					times: true,
					exercise: true
				}
			},
			workout: {
				include: {
					exercises: true
				}
			}
		}
	})

	res.json(logWorkout)
})

//  @route POST api/workouts/log
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
