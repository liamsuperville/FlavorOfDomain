import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new rating
router.post('/', (req, res) => {
	const { user_email, recipe_id, number_of_stars } = req.body
	const query =
		'INSERT INTO rating (user_email, recipe_id, number_of_stars) VALUES (?, ?, ?)'

	db.run(query, [user_email, recipe_id, number_of_stars], (err) => {
		if (err) {
			res.status(500).send('Error inserting rating: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all rating
router.get('/', (req, res) => {
	db.all('SELECT * FROM rating', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching rating: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific rating by ID
router.get('/getRatingByUserEmail', (req, res) => {
	const { user_email } = req.body
	db.all('SELECT * FROM rating WHERE user_email = ?', [user_email], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching rating: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to get a specific rating by ID
router.get('/getRatingByRecipeId', (req, res) => {
	const { recipe_id } = req.body
	db.all('SELECT * FROM rating WHERE recipe_id = ?', [recipe_id], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching rating: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to get a specific rating by recipe id and user email
router.get('/user/:user_email/recipe/:recipe_id', (req, res) => {
	const { user_email, recipe_id } = req.params
	db.get('SELECT * FROM rating WHERE recipe_id = ? AND user_email = ?', [recipe_id, user_email], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching rating: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to get number 
router.get('/count/user/:user_email', (req, res) => {
	const { user_email } = req.params
	db.get('SELECT COUNT(*) as rating_count FROM rating WHERE user_email = ?', [user_email], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching rating count: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to update a rating's information
router.put('/update', (req, res) => {
	const { user_email, recipe_id, number_of_stars } = req.body

	const query =
		'UPDATE rating SET number_of_stars = ? WHERE user_email = ? AND recipe_id = ?'

	db.run(query, [number_of_stars, user_email, recipe_id], function(err) {
		if (err) {
			res.status(500).send('Error updating rating: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('rating not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

// Route to delete a rating
router.delete('/delete', (req, res) => {
	const { user_email, recipe_id } = req.body

	const query = 'DELETE FROM rating WHERE user_email = ? AND recipe_id = ?'

	db.run(query, [user_email, recipe_id], function (err) {
		if (err) {
			res.status(500).send('Error deleting rating: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('rating not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

export default router
