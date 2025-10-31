import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getAllRecipe, getAllRecipesForUser } from '../data/recipe'
import RecipeCard from '../components/recipe/RecipeCard'

function RecipesPage() {
	const { currentUser } = useAuth()

	const [recipes, setRecipes] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const getRecipes = async () => {
			try {
				setLoading(true)
				const recipeData = (currentUser) ? await getAllRecipesForUser(currentUser.email) : await getAllRecipe();
        setRecipes(recipeData)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		getRecipes()
	}, [])

	/* Update to only display recipes that match user preferences*/

	if (loading) {
		return (
			<div className='loading-container'>
				<div className='loading-spinner'></div>
				<p>Loading recipe data...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className='error-container'>
				<p>Error loading recipe data {error}</p>
			</div>
		)
	}

	return (
		recipes && (
			<div className='recipe-grid'>
				{recipes.map(
					(recipe, index) =>
						recipe && (
							<RecipeCard key={recipe.recipe_id || index} recipe={recipe} />
						)
				)}
			</div>
		)
	)
}

export default RecipesPage
