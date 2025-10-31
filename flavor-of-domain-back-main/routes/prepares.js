import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new prepares
router.post('/', (req, res) => {
	console.log(req.body)
	const { user_email, recipe_id } = req.body
	const query =
		'INSERT INTO prepares (user_email, recipe_id) VALUES (?, ?)'

	db.run(query, [user_email, recipe_id], (err) => {
		if (err) {
			res.status(500).send('Error inserting prepares: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all prepares
router.get('/', (req, res) => {
	db.all('SELECT * FROM prepares', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching prepares: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific prepares by ID
router.get('/getPreparesByUserEmail', (req, res) => {
	const { user_email } = req.body
	db.all('SELECT * FROM prepares WHERE user_email = ?', [user_email], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching prepares: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to get a specific prepares by ID
router.get('/getPreparesByRecipeId', (req, res) => {
	const { recipe_id } = req.body
	db.all('SELECT * FROM prepares WHERE recipe_id = ?', [recipe_id], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching prepares: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to delete a prepares
router.delete('/delete', (req, res) => {
	const { user_email, recipe_id } = req.body

	const query = 'DELETE FROM prepares WHERE user_email = ? AND recipe_id = ?'

	db.run(query, [user_email, recipe_id], function(err) {
		if (err) {
			res.status(500).send('Error deleting prepares: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('prepares not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

export default router
