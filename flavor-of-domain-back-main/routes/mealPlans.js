import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new mealplans
router.post('/', (req, res) => {
	console.log(req.body)
	const { user_email, recipe_id } = req.body
	const query =
		'INSERT INTO mealplans (user_email, recipe_id) VALUES (?, ?)'

	db.run(query, [user_email, recipe_id], (err) => {
		if (err) {
			res.status(500).send('Error inserting mealplans: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all mealplans
router.get('/', (req, res) => {
	db.all('SELECT * FROM mealplans', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching mealplans: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific mealplans by ID
router.get('/user/:user_email', (req, res) => {
	const { user_email } = req.params
	db.all('SELECT * FROM mealplans WHERE user_email = ?', [user_email], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching mealplans: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to get a specific mealplans by ID
router.get('/getMealPlansByRecipeId', (req, res) => {
	const { recipe_id } = req.body
	db.all('SELECT * FROM mealplans WHERE recipe_id = ?', [recipe_id], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching mealplans: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to delete a mealplans
router.delete('/delete', (req, res) => {
	const { user_email, recipe_id } = req.body

	const query = 'DELETE FROM mealplans WHERE user_email = ? AND recipe_id = ?'

	db.run(query, [user_email, recipe_id], function (err) {
		if (err) {
			res.status(500).send('Error deleting mealplans: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('mealplans not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

export default router
