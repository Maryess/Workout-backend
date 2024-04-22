import 'colors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { authUser } from './app/auth/auth.controller.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import { prisma } from './app/prisma.js'

const app = express()
dotenv.config()
async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(express.json())
	app.use('/api/auth', authUser)

	app.use(notFound)
	app.use(errorHandler)

	const PORT = process.env.PORT || 5000

	app.listen(
		PORT,
		console.log(`Server ${process.env.NODE_ENV} starting on ${PORT} `.blue.bold)
	)
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.log(e)
		await prisma.$disconnect()
		process.exit(1)
	})
