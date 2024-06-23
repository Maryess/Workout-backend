import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

// @route   GET /api/workouts
export const getAllWorkouts = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		include: {
			exercises: true,
			logWorkout: true
		}
	})

	res.json(workouts)
})

// @route   GET /api/workouts/:id
export const getWorkout = asyncHandler(async (req, res) => {
	try {
		const workout = await prisma.workout.findUnique({
			where: {
				id: +req.params.id
			},
			include: {
				exercises: true
			}
		})
		res.json(workout)
	} catch {
		res.status(404)
		throw new Error('Workout is not found')
	}
})

// @route 	POST /api/workouts
export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map(id => ({ id: +id }))
			}
		}
	})

	res.json(workout)
})

// @route 	PUT /api/workouts:id
export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body
	try {
		const workout = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				exercises: {
					connect: exerciseIds.map(id => ({ id: +id }))
				}
			}
		})

		res.json(workout)
	} catch {
		res.status(404)
		throw new Error('Workout is not found')
	}
})

// @route 	DELETE /api/workouts:id
export const deleteWorkout = asyncHandler(async (req, res) => {
	try {
		await prisma.workout.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({ message: 'Workout deleted!' })
	} catch {
		res.status(404)
		throw new Error('Workout is not found')
	}
})

// @route   DELETE /api/workouts
export const deleteAllWorkouts = asyncHandler(async (req, res) => {
	await prisma.workout.deleteMany({})

	res.json({ message: 'Workouts deleted!' })
})
