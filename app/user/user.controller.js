import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

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
