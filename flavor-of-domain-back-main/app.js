import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'

import adminRoutes from './routes/admin.js'
import approvesRoutes from './routes/approves.js'
import categoryRoutes from './routes/category.js'
import commentRoutes from './routes/comment.js'
import dietaryPreferenceRoutes from './routes/dietaryPreference.js'
import followsRoutes from './routes/follows.js'
import hasRoutes from './routes/has.js'
import ingredientRoutes from './routes/ingredient.js'
import mealPlansRoutes from './routes/mealPlans.js'
import preparesRoutes from './routes/prepares.js'
import ratingRoutes from './routes/rating.js'
import recipeRoutes from './routes/recipe.js'
import recipeIngredientRoutes from './routes/recipeIngredient.js'
import restrictsRoutes from './routes/restricts.js'
import usersRoutes from './routes/users.js'
import verifiesRoutes from './routes/verifies.js'
import loginRoutes from './routes/login.js'

export const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

//Sqlite Connection
export const db = new sqlite3.Database('./database/recipe.db', (err) => {
	if (err) {
		console.error('Could not connect to database', err)
	} else {
		console.log('Connected to SQLite database')
	}
})

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON;', (err) => {
	if (err) {
		console.error('Error enabling foreign keys:', err)
	}
})

// Test Route
app.get('/api/test-db', (req, res) => {
	db.get('SELECT 1', (err, row) => {
		if (err) {
			res.status(500).json({ connection: false })
		} else {
			res.json({ connection: true })
		}
	})
})

// Table specific routes
app.use('/admin', adminRoutes)
app.use('/approves', approvesRoutes)
app.use('/category', categoryRoutes)
app.use('/comment', commentRoutes)
app.use('/dietary-preference', dietaryPreferenceRoutes)
app.use('/follows', followsRoutes)
app.use('/has', hasRoutes)
app.use('/ingredient', ingredientRoutes)
app.use('/meal-plans', mealPlansRoutes)
app.use('/prepares', preparesRoutes)
app.use('/rating', ratingRoutes)
app.use('/recipe', recipeRoutes)
app.use('/recipe-ingredient', recipeIngredientRoutes)
app.use('/restricts', restrictsRoutes)
app.use('/users', usersRoutes)
app.use('/verifies', verifiesRoutes)
app.use('/login', loginRoutes)

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

// Closing Db Connection
process.on('SIGINT', async () => {
	console.log('SIGINT received: closing database connection')
	db.close(() => {
		console.log('Database connection closed')
		process.exit(0)
	})
})
process.on('SIGTERM', async () => {
	console.log('SIGTERM received: closing database connection')
	db.close(() => {
		console.log('Database connection closed')
		process.exit(0)
	})
})
