import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new follows
router.post('/', (req, res) => {
	console.log(req.body)
	const { follower_email, followee_email } = req.body
	const query =
		'INSERT INTO follows (follower_email, followee_email) VALUES (?, ?)'

	db.run(query, [follower_email, followee_email], (err) => {
		if (err) {
			res.status(500).send('Error inserting follows: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all follows
router.get('/', (req, res) => {
	db.all('SELECT * FROM follows', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching follows: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific follows by ID
router.get('/getFollowsByFolloweeEmail', (req, res) => {
	const { followee_email } = req.body
	db.all(
		'SELECT * FROM follows WHERE followee_email = ?',
		[followee_email],
		(err, row) => {
			if (err) {
				res.status(500).send('Error fetching follows: ' + err.message)
			} else {
				res.json(row || {})
			}
		}
	)
})

// Route to get a specific follows by ID
router.get('/getFollowsByFollowerEmail', (req, res) => {
	const { follower_email } = req.body
	db.all(
		'SELECT * FROM follows WHERE follower_email = ?',
		[follower_email],
		(err, row) => {
			if (err) {
				res.status(500).send('Error fetching follows: ' + err.message)
			} else {
				res.json(row || {})
			}
		}
	)
})

// Route to delete a follows
router.delete('/delete', (req, res) => {
	const { follower_email, followee_email } = req.body

	const query =
		'DELETE FROM follows WHERE follower_email =? AND followee_email = ?'

	db.run(query, [follower_email, followee_email], function(err) {
		if (err) {
			res.status(500).send('Error deleting follows: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('follows not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

export default router
