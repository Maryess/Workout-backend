import 'colors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import {
	default as authRoutes,
	default as registerRoutes
} from './app/auth/auth.routes.js'
import exerciseRoutes from './app/exercise/exercise.routes.js'
import exerciseLogRoutes from './app/exercise/log/exercise-log.routes.js'
import userRoutes from './app/user/user.routes.js'
import workoutLogRoutes from './app/workout/log/workout-log.routes.js'
import workoutRoutes from './app/workout/workout.routes.js'
const app = express()
dotenv.config()
async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(express.json())
	app.use('/api/auth', authRoutes)
	app.use('/api/register', registerRoutes)
	app.use('/api/users', userRoutes)
	app.use('/api/exercises', exerciseRoutes)
	app.use('/api/workouts', workoutRoutes)
	app.use('/api/exercises/log', exerciseLogRoutes)
	app.use('/api/workouts/log', workoutLogRoutes)
	// app.use(notFound)
	// app.use(errorHandler)

	const PORT = process.env.PORT

	app.listen(
		PORT,
		console.log(
			`❤️ Server ${process.env.NODE_ENV} starting on ${PORT} `.blue.bold
		)
	)
}
main()
