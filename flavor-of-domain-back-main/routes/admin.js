import express from 'express'
import { db } from '../app.js'
import { hashPassword } from '../utils/hash.js'

const router = express.Router()

// Route to insert a new admin
router.post('/', async (req, res) => {
	console.log(req.body)
	const { ssn, email, name, password, birthday } = req.body
	const hash = await hashPassword(password)
	const query =
		'INSERT INTO admin (ssn, email, name, password, birthday) VALUES (?, ?, ?, ?, ?)'

	db.run(query, [ssn, email, name, hash, birthday], (err) => {
		if (err) {
			res.status(500).send('Error inserting admin: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all admin
router.get('/', (req, res) => {
	db.all('SELECT * FROM admin', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching admin: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific admin by ID
router.get('/:ssn', (req, res) => {
	const { ssn } = req.params
	db.get('SELECT * FROM admin WHERE ssn = ?', [ssn], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching admin: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to update a admin's information
router.put('/:ssn', (req, res) => {
	const { ssn } = req.params
	const { email, name, birthday } = req.body

	const query =
		'UPDATE admin SET email = ?, name = ?, birthday = ? WHERE ssn = ?'

	db.run(query, [email, name, birthday, ssn], (err) => {
		if (err) {
			res.status(500).send('Error updating admin: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('admin not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

// Route to delete a admin
router.delete('/:ssn', (req, res) => {
	const { ssn } = req.params

	const query = 'DELETE FROM admin WHERE ssn = ?'

	db.run(query, [ssn], function(err) {
		if (err) {
			res.status(500).send('Error deleting admin: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('admin not found')
			} else {
				res.json({ message: 'admin deleted successfully' })
			}
		}
	})
})

export default router
