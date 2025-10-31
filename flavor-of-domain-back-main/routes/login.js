import express from 'express'
import { db } from '../app.js'
import { comparePasswords, hashPassword } from '../utils/hash.js'

const router = express.Router()

// Route to login a user/admin
router.post('/', (req, res) => {
	console.log(req.body)
	const { email, password } = req.body
	const userQuery = 'SELECT * FROM users WHERE email = ?'
	const adminQuery = 'SELECT * FROM admin WHERE email = ?'

	db.get(userQuery, [email], async (err, row) => {
		if (err) {
			res.status(500).send({ message: 'Error getting user: ' + err.message })
			return
		}

		if (row) {
			const validInfo = await comparePasswords(password, row.password)
			if (validInfo) {
				res.json({ ...row, loggedIn: true, admin: false })
			} else {
				res.json({ loggedIn: false, admin: false })
			}
			return
		}

		db.get(adminQuery, [email], async (err, row) => {
			if (err) {
				res.status(500).send('Error inserting user: ' + err.message)
				return
			}

			if (row) {
				const validInfo = await comparePasswords(password, row.password)
				if (validInfo) {
                    res.json({ ...row, loggedIn: true, admin: true })
                } else {
                    res.json({ loggedIn: false, admin: true })
                }
				return
			}

			res.status(404).json({ message: 'Cannot find user with email' })
		})
	})
})

export default router
