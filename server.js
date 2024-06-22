import 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import {
	default as authRoutes,
	default as registerRoutes
} from './app/auth/auth.routes.js'
import exerciseRoutes from './app/exercise/exercise.routes.js'
import exerciseLogRoutes from './app/exercise/log/exercise-log.routes.js'
import { prisma } from './app/prisma.js'
import userRoutes from './app/user/user.routes.js'
import workoutLogRoutes from './app/workout/log/workout-log.routes.js'
import workoutRoutes from './app/workout/workout.routes.js'

const app = express()
dotenv.config()
async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(cors())

	app
		.use(express.json())
		.use('/api/auth', authRoutes)
		.use('/api/register', registerRoutes)
		.use('/api/users', userRoutes)
		.use('/api/exercises', exerciseRoutes)
		.use('/api/workouts', workoutRoutes)
		.use('/api/exercises/log', exerciseLogRoutes)
		.use('/api/workouts/log', workoutLogRoutes)

	const PORT = process.env.PORT

	app.listen(
		PORT,
		console.log(
			`❤️ Server ${process.env.NODE_ENV} starting on ${PORT} `.blue.bold
		)
	)
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
