import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new category
router.post('/', (req, res) => {
    console.log(req.body)
	const { type } = req.body
	const query =
		'INSERT INTO category (type) VALUES (?)'

	db.run(query, [type], (err) => {
		if (err) {
			res.status(500).send('Error inserting category: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all category
router.get('/', (req, res) => {
	db.all('SELECT * FROM category', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching category: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific category by ID
router.get('/:type', (req, res) => {
	const { type } = req.params
	db.get('SELECT * FROM category WHERE type = ?', [type], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching category: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to delete a category
router.delete('/:type', function(req, res) {
	const { type } = req.params

	const query = 'DELETE FROM category WHERE type = ?'

	db.run(query, [type], (err) => {
		if (err) {
			res.status(500).send('Error deleting category: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('category not found')
			} else {
				res.json(req.params)
			}
		}
	})
})

export default router
