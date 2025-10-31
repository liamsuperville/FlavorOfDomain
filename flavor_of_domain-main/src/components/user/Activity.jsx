import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getRecipeCountByUserEmail } from '../../data/recipe'
import { getCommentCountByUserEmail } from '../../data/comment'
import { getRatingCountByUserEmail } from '../../data/rating'

export default function Activity() {
	const { currentUser } = useAuth()

	const [recipeCount, setRecipeCount] = useState(0)
	const [commentCount, setCommentCount] = useState(0)
	const [ratingCount, setRatingCount] = useState(0)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
        let ignore = false

		const getActivityCounts = async () => {
			try {
				const recipeCountData = await getRecipeCountByUserEmail(
					currentUser.email
				)
				const commentCountData = await getCommentCountByUserEmail(
					currentUser.email
				)
				const ratingCountData = await getRatingCountByUserEmail(
					currentUser.email
				)

				if (!ignore) {
                    console.log(`${recipeCountData.recipe_count}`)
					setRecipeCount(recipeCountData.recipe_count)
					setCommentCount(commentCountData.comment_count)
					setRatingCount(ratingCountData.rating_count)
				}
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		getActivityCounts()

		return () => {
			ignore = true
		}
	}, [])

	if (loading) {
		return <div>Loading activity...</div>
	}

	if (error) {
		return <div className='error-message'>{error.message}</div>
	}

	return (
		<>
			<h2>Your Activity</h2>

			<div className='activity-stats'>
				<div className='stat-card'>
					<h3>Recipes</h3>
					<div className='stat-value'>{recipeCount}</div>
				</div>

				<div className='stat-card'>
					<h3>Ratings</h3>
					<div className='stat-value'>{ratingCount}</div>
				</div>

				<div className='stat-card'>
					<h3>Comments</h3>
					<div className='stat-value'>{commentCount}</div>
				</div>
			</div>
		</>
	)
}
