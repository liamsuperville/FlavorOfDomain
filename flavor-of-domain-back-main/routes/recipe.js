import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new recipe
router.post('/', (req, res) => {
	const {
		name,
		description,
		instructions,
		created_by,
		category_type,
		image_url,
	} = req.body
	const query =
		'INSERT INTO recipe (name, description, instructions, created_by, category_type, image_url) VALUES (?, ?, ?, ? ,?, ?)'

	db.run(
		query,
		[name, description, instructions, created_by, category_type, image_url],
		function (err) {
			if (err) {
				res.status(500).send('Error inserting recipe: ' + err.message)
			} else {
				res.json({ ...req.body, recipe_id: this.lastID })
			}
		}
	)
})

// Route to get all recipe
router.get('/', (req, res) => {
	db.all('SELECT * FROM recipe', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching recipe: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a specific recipe by ID
router.get('/:recipe_id', (req, res) => {
	const { recipe_id } = req.params
	db.get(
		'SELECT * FROM recipe WHERE recipe_id = ?',
		[recipe_id],
		(err, row) => {
			if (err) {
				res.status(500).send('Error fetching recipe: ' + err.message)
			} else if (!row) {
				res.status(404).send('Error fetching recipe: Recipe Not Found')
			} else {
				res.json(row || {})
			}
		}
	)
})

// Route to get all recipes that match a users restictions
router.get('/user/:user_email', (req, res) => {
	const { user_email } = req.params
	db.all(
		`SELECT r.*
	FROM recipe r
	WHERE NOT EXISTS (
	  SELECT 1
	  FROM recipeingredient ri
	  JOIN restricts ON ri.ingredient_name = restricts.ingredient_name
	  JOIN has ON restricts.dietary_name = has.dietary_name
	  WHERE ri.recipe_id = r.recipe_id
		AND has.user_email = ?
	);`,
		[user_email],
		(err, rows) => {
			if (err) {
				res.status(500).send('Error fetching recipe: ' + err.message)
			} else {
				res.json(rows || {})
			}
		}
	)
})

// Route to get number 
router.get('/count/user/:user_email', (req, res) => {
	const { user_email } = req.params
	db.get('SELECT COUNT(*) as recipe_count FROM recipe WHERE created_by = ?', [user_email], (err, row) => {
		if (err) {
			res.status(500).send('Error fetching recipe count: ' + err.message)
		} else {
			res.json(row || {})
		}
	})
})

// Route to update a recipe's information
router.put('/:recipe_id', (req, res) => {
	const { recipe_id } = req.params
	const {
		name,
		description,
		instructions,
		created_by,
		category_type,
		image_url,
	} = req.body

	const query =
		'UPDATE recipe SET name = ?, description = ? instructions = ?, created_by = ?, category_type = ?, image_url = ? WHERE recipe_id = ?'

	db.run(
		query,
		[
			name,
			description,
			instructions,
			created_by,
			category_type,
			recipe_id,
			image_url,
		],
		(err) => {
			if (err) {
				res.status(500).send('Error updating recipe: ' + err.message)
			} else {
				if (this.changes === 0) {
					res.status(404).send('recipe not found')
				} else {
					res.json(req.body)
				}
			}
		}
	)
})

// Route to delete a recipe
router.delete('/:recipe_id', (req, res) => {
	const { recipe_id } = req.params

	const query = 'DELETE FROM recipe WHERE recipe_id = ?'

	db.run(query, [recipe_id], function (err) {
		if (err) {
			console.log(err.message)
			res.status(500).send('Error deleting recipe: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('recipe not found')
			} else {
				res.json(req.body)
			}
		}
	})

})

export default router
