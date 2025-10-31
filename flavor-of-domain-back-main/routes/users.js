import express from 'express'
import { db } from '../app.js'
import { hashPassword } from '../utils/hash.js'

const router = express.Router()

// Route to insert a new user
router.post('/', async (req, res) => {
    console.log(req.body)
	const { email, password, name, birthday, verified } = req.body

	const hash = await hashPassword(password)

	const query =
		'INSERT INTO users (email, password, name, birthday, verified) VALUES (?, ?, ?, ?, ?)'

	db.run(query, [email, hash, name, birthday, verified], (err) => {
		if (err) {
			res.status(500).send('Error inserting user: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all users
router.get('/', (req, res) => {
	db.all('SELECT * FROM users', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching users: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific user by ID
router.get('/:email', (req, res) => {
	const { email } = req.params
	db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching user: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to update a user's information
router.put('/update/:email', (req, res) => {
	const { email } = req.params
	const { password, name, birthday, verified } = req.body

	const query = 'UPDATE users SET password = ?, name = ?, birthday = ?, verified = ? WHERE email = ?'

	db.run(query, [password, name, birthday, verified, email], function (err) {
		if (err) {
			res.status(500).send('Error updating user: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('User not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

router.put('/update-password', async (req, res) => {
	console.log(req.body)
	const { email, password } = req.body
	console.log(email)
	console.log(password)
	const hash = await hashPassword(password)

	const query = 'UPDATE users SET password = ? WHERE email = ?'

	db.run(query, [hash, email], function (err) {
		if (err) {
			return res
				.status(500)
				.json({ message: `Error updating password: ${err.message}` })
		}

		if (this.changes === 0) {
			res.status(404).json({ message: 'No user found with that email' })
		} else {
			res.json({ message: 'Password updated successfully' })
		}
	})
})

// Route to delete a user
router.delete('/:email', (req, res) => {
	const { email } = req.params

	const query = 'DELETE FROM users WHERE email = ?'

	db.run(query, [email], function (err) {
		if (err) {
			res.status(500).send('Error deleting user: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('User not found')
			} else {
				res.json({ message: 'User deleted successfully'})
			}
		}
	})
})

export default router
