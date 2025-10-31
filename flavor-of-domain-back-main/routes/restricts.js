import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new restricts
router.post('/', (req, res) => {
	console.log(req.body)
	const { dietary_name, ingredient_name } = req.body
	const query =
		'INSERT INTO restricts (dietary_name, ingredient_name) VALUES (?, ?)'

	db.run(query, [dietary_name, ingredient_name], (err) => {
		if (err) {
			res.status(500).send('Error inserting restricts: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all restricts
router.get('/', (req, res) => {
	db.all('SELECT * FROM restricts', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching restricts: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific restricts by ID
router.get('/getRestrictsByDietaryPreferenceName', (req, res) => {
	const { dietary_name } = req.body
	db.all('SELECT * FROM restricts WHERE dietary_name = ?', [dietary_name], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching restricts: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to get a specific restricts by ID
router.get('/getRestrictsByIngredientName', (req, res) => {
	const { ingredient_name } = req.body
	db.all('SELECT * FROM restricts WHERE ingredient_name = ?', [ingredient_name], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching restricts: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to delete a restricts
router.delete('/delete', (req, res) => {
	const { dietary_name, ingredient_name } = req.body

	const query = 'DELETE FROM restricts WHERE dietary_name = ? AND ingredient_name = ?'

	db.run(query, [dietary_name, ingredient_name], function (err) {
		if (err) {
			res.status(500).send('Error deleting restricts: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('restricts not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

export default router
