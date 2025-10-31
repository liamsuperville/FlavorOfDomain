import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new dietarypreference
router.post('/', (req, res) => {
	const { name } = req.body
	const query =
		'INSERT INTO dietarypreference (name) VALUES (?)'

	db.run(query, [name], (err) => {
		if (err) {
			res.status(500).send('Error inserting dietarypreference: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all dietarypreference
router.get('/', (req, res) => {
	db.all('SELECT * FROM dietarypreference', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching dietarypreference: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific dietarypreference by ID
router.get('/:name', (req, res) => {
	const { name } = req.params
	db.get('SELECT * FROM dietarypreference WHERE name = ?', [name], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching dietarypreference: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to delete a dietarypreference
router.delete('/:name', (req, res) => {
	const { name } = req.params

	const query = 'DELETE FROM dietarypreference WHERE name = ?'

	db.run(query, [name], function(err) {
		if (err) {
			res.status(500).send('Error deleting dietarypreference: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('dietarypreference not found')
			} else {
				res.json({message: 'dietarypreference deleted successfully'})
			}
		}
	})
})

export default router
