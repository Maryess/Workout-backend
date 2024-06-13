import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

//@route POST api/exercise
export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body

	const exercise = await prisma.exercise.create({
		data: {
			name,
			times,
			iconPath
		}
	})
	res.json(exercise)
})

//@route GET api/exercise
export const getAllExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: [
			{
				name: 'asc'
			}
		]
	})

	res.json(exercises)
})
//@route PUT api/exercise/:id
export const updateExercise = asyncHandler(async (req, res) => {
	try {
		const { name, times, iconPath } = req.body
		const exercise = await prisma.exercise.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				times,
				iconPath
			}
		})
		res.json(exercise)
	} catch {
		res.status(404)
		throw new Error('Exercise not found')
	}
})
//@route DELETE api/exercise/:id
export const deleteExercise = asyncHandler(async (req, res) => {
	try {
		await prisma.exercise.delete({
			where: {
				id: +req.params.id
			}
		})
		res.json({ message: 'exercise deleted!' })
	} catch {
		res.status(404)
		throw new Error('Exercise not found')
	}
})

export const deleteAllExercises = asyncHandler(async (req, res) => {
	await prisma.exercise.deleteMany({})

	res.json({ message: 'Exercises deleted!' })
})
