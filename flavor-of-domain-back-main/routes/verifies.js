import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new verifies
router.post('/', (req, res) => {
    console.log(req.body)
	const { admin_ssn, user_email } = req.body
	const query =
		'INSERT INTO verifies (admin_ssn, user_email) VALUES (?, ?)'

	db.run(query, [admin_ssn, user_email], (err) => {
		if (err) {
			res.status(500).send('Error inserting verifies: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all verifies
router.get('/', (req, res) => {
	db.all('SELECT * FROM verifies', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching verifies: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific verifies by ID
router.get('/getVerifiesByAdminSsn', (req, res) => {
	const { admin_ssn } = req.body
	db.all('SELECT * FROM verifies WHERE admin_ssn = ?', [admin_ssn], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching verifies: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to get a specific verifies by ID
router.get('/getVerifiesByUserEmail', (req, res) => {
	const { user_email } = req.body
	db.all('SELECT * FROM verifies WHERE user_email = ?', [user_email], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching verifies: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to delete a verifies
router.delete('/delete', (req, res) => {
	const { admin_ssn, user_email } = req.body

	const query = 'DELETE FROM verifies WHERE admin_ssn = ? AND user_email = ?'

	db.run(query, [admin_ssn, user_email], function (err) {
		if (err) {
			res.status(500).send('Error deleting verifies: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('verifies not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

export default router
