import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new comments
router.post('/', (req, res) => {
    console.log(req.body)
	const { comment_id, text, images, user_email, recipe_id, monitored_by } = req.body
	const query =
		'INSERT INTO comments (comment_id, text, images, user_email, recipe_id, monitored_by) VALUES (?, ?, ?, ?, ?, ?)'

	db.run(query, [comment_id, text, images, user_email, recipe_id, monitored_by], function (err) {
		if (err) {
			res.status(500).send('Error inserting comment: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all comments
router.get('/', (req, res) => {
	db.all('SELECT * FROM comments', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching comments: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific comment by ID
router.get('/:comment_id', (req, res) => {
	const { comment_id } = req.params
	db.get('SELECT * FROM comments WHERE commnet_id = ?', [comment_id], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching comments: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to get number 
router.get('/count/user/:user_email', (req, res) => {
	const { user_email } = req.params
	db.get('SELECT COUNT(*) as comment_count FROM comments WHERE user_email = ?', [user_email], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching comments: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to update a comment's information
router.put('/:comment_id', (req, res) => {
	const { comment_id } = req.params
	const { text, images, user_email, recipe_id, monitored_by } = req.body

	const query = 'UPDATE comments SET text = ?, images = ?, user_email = ?, recipe_id = ?, monitored_by = ? WHERE comment_id = ?'

	db.run(query, [text, images, user_email, recipe_id, monitored_by, comment_id], function (err) {
		if (err) {
			res.status(500).send('Error updating comment: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('comment not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

// Route to delete a comments
router.delete('/:comment_id', (req, res) => {
	const { comment_id } = req.params

	const query = 'DELETE FROM comments WHERE comment_id = ?'

	db.run(query, [comment_id], function (err) {
		if (err) {
			res.status(500).send('Error deleting comments: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('comments not found')
			} else {
				res.json({message: 'comments deleted successfully'})
			}
		}
	})
})

export default router
