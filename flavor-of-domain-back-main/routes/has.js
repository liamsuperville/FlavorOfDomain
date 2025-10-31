import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new has
router.post('/', (req, res) => {
	const { user_email, dietary_name } = req.body
	const query =
		'INSERT INTO has (user_email, dietary_name) VALUES (?, ?)'

	db.run(query, [user_email, dietary_name], (err) => {
		if (err) {
			res.status(500).send('Error inserting has: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all has
router.get('/', (req, res) => {
	db.all('SELECT * FROM has', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching has: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific has by ID
router.get('/dietary-preference/:dietary_name', (req, res) => {
	const { dietary_name } = req.params
	db.all('SELECT * FROM has WHERE dietary_name = ?', [dietary_name], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching has: ' + err.message)
		} else {
			res.json(rows || {})
		}
	})
})

// Route to get a specific has by ID
router.get('/user/:user_email', (req, res) => {
	const { user_email } = req.params
	db.all('SELECT * FROM has WHERE user_email = ?', [user_email], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching has: ' + err.message)
		} else {
			res.json(rows || {})
		}
	})
})

// Route to delete a has
router.delete('/delete', (req, res) => {
	const { user_email, dietary_name } = req.body

	const query = 'DELETE FROM has WHERE user_email = ? AND dietary_name = ?'

	db.run(query, [user_email, dietary_name], function (err) {
		if (err) {
			res.status(500).send('Error deleting has: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('has not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

export default router
