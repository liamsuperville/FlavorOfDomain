import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new ingredient
router.post('/', (req, res) => {
    console.log(req.body)
	const { name, calories } = req.body
	const query =
		'INSERT INTO ingredient (name, calories) VALUES (?, ?)'

	db.run(query, [name, calories], (err) => {
		if (err) {
			res.status(500).send('Error inserting ingredient: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all ingredient
router.get('/', (req, res) => {
	db.all('SELECT * FROM ingredient', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching ingredient: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific ingredient by ID
router.get('/:name', (req, res) => {
	const { name } = req.params
	db.get('SELECT * FROM ingredient WHERE name = ?', [name], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching ingredient: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to update a ingredient's information
router.put('/:name', (req, res) => {
	const { name } = req.params
	const { calories } = req.body

	const query = 'UPDATE ingredient SET calories = ? WHERE name = ?'

	db.run(query, [calories, name], (err) => {
		if (err) {
			res.status(500).send('Error updating ingredient: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('ingredient not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

// Route to delete a ingredient
router.delete('/:name', (req, res) => {
	const { name } = req.params

	const query = 'DELETE FROM ingredient WHERE name = ?'

	db.run(query, [name], function(err) {
		if (err) {
			res.status(500).send('Error deleting ingredient: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('ingredient not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

export default router
