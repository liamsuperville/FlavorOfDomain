import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new Approves
router.post('/', (req, res) => {
    console.log(req.body)
	const { ssn, user_email, recipe_id } = req.body
	const query =
		'INSERT INTO approves (ssn, user_email, recipe_id) VALUES (?, ?, ?)'

	db.run(query, [ssn, user_email, recipe_id], (err) => {
		if (err) {
			res.status(500).send('Error inserting approves: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all Approves
router.get('/', (req, res) => {
	db.all('SELECT * FROM approves', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching approves: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific Approves by ID
router.get('/getApprovesBySsn', (req, res) => {
	const { ssn } = req.body
	db.all('SELECT user_email, recipe_id FROM approves WHERE ssn = ?', [ssn], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching approves: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to get a specific Approves by ID
router.get('/getApprovesByUserEmail', (req, res) => {
	const { user_email } = req.body
	db.all('SELECT ssn, recipe_id FROM approves WHERE user_email = ?', [user_email], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching approves: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to get a specific Approves by ID
router.get('/getApprovesByRecipeId', (req, res) => {
	const { recipe_id } = req.body
	db.all('SELECT ssn, user_email FROM approves WHERE recipe_id = ?', [recipe_id], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching approves: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to delete an Approve tuple
router.delete('/delete', (req, res) => {
	const { ssn, user_email, recipe_id } = req.body

	const query = 'DELETE FROM approves WHERE ssn = ? AND user_email = ? AND recipe_id = ?'

	db.run(query, [ssn, user_email, recipe_id], function(err) {
		if (err) {
			res.status(500).send('Error deleting approves: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('Approves not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

export default router
