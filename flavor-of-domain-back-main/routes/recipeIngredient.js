import express from 'express'
import { db } from '../app.js'

const router = express.Router()

// Route to insert a new recipeingredient
router.post('/', (req, res) => {
	console.log(req.body)
	const { recipe_id, ingredient_name } = req.body
	const query =
		'INSERT INTO recipeingredient (recipe_id, ingredient_name) VALUES (?, ?)'

	db.run(query, [recipe_id, ingredient_name], (err) => {
		if (err) {
			console.log(err)
			res.status(500).send('Error inserting recipeingredient: ' + err.message)
		} else {
			res.json(req.body)
		}
	})
})

// Route to get all recipeingredient
router.get('/', (req, res) => {
	db.all('SELECT * FROM recipeingredient', [], (err, rows) => {
		if (err) {
			res.status(500).send('Error fetching recipeingredient: ' + err.message)
		} else {
			res.json(rows)
		}
	})
})

// Route to get a ingredients of recipes with recipe_id
router.get('/recipe/:recipe_id', (req, res) => {
	const { recipe_id } = req.params
	db.all(
		'SELECT * FROM recipeingredient WHERE recipe_id = ?',
		[recipe_id],
		(err, rows) => {
			if (err) {
				res.status(500).send('Error fetching recipeingredient: ' + err.message)
			} else {
				res.json(rows || {})
			}
		}
	)
})

// Route to get recipes with ingredients of ingredient_id
router.post('/getRecipesByIngredientName', (req, res) => {
	const { ingredient_name } = req.body
	console.log(req.body)
	db.all(
		'SELECT * FROM recipeingredient WHERE ingredient_name = ?',
		[ingredient_name],
		(err, rows) => {
			if (err) {
				res.status(500).send('Error fetching recipeingredient: ' + err.message)
			} else {
				res.json(rows || {})
			}
		}
	)
})

// Route to delete a recipeingredient
router.delete('/delete', (req, res) => {
	const { recipe_id, ingredient_name } = req.body

	const query =
		'DELETE FROM recipeingredient WHERE recipe_id = ? AND ingredient_name = ?'

	db.run(query, [recipe_id, ingredient_name], function (err) {
		if (err) {
			res.status(500).send('Error deleting recipeingredient: ' + err.message)
		} else {
			if (this.changes === 0) {
				res.status(404).send('recipeingredient not found')
			} else {
				res.json(req.body)
			}
		}
	})
})

export default router
