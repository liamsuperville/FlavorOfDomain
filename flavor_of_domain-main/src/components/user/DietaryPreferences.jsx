import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getAllDietaryPreference } from '../../data/dietaryPreference'
import { getHasByUserEmail, insertHas, deleteHas } from '../../data/has'

function DietaryPreferences() {
	const { currentUser } = useAuth()

	const [preferences, setPreferences] = useState([])
	const [has, setHas] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchPreferences = async () => {
			try {
				setLoading(true)
				const preferencesData = await getAllDietaryPreference()
				const hasData = await getHasByUserEmail(currentUser.email)
				setPreferences(preferencesData)
				setHas(hasData)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchPreferences()
	}, [])

	const handleTogglePreference = (preferenceName) => {
		// Simulate toggling a preference
		const alreadyHas = has.some((h) => h.dietary_name === preferenceName)

		if (alreadyHas) {
			setHas((prev) => prev.filter((p) => p.dietary_name !== preferenceName))
			console.log(has)
			deleteHas({
				user_email: currentUser.email,
				dietary_name: preferenceName,
			})
		} else {
			setHas((prev) => [...prev, { dietary_name: preferenceName }])
			console.log(has)
			insertHas({
				user_email: currentUser.email,
				dietary_name: preferenceName,
			})
		}
	}

	if (loading) {
		return <div>Loading dietary preferences...</div>
	}

	if (error) {
		return <div className='error-message'>{error}</div>
	}

	return (
		<div>
			<h2>Dietary Preferences</h2>
			<p>
				Select your dietary preferences to help us customize recipe
				recommendations.
			</p>

			<div className='preferences-grid'>
				{preferences &&
					has &&
					preferences.map((preference) => (
						<div key={preference.name} className='preference-item'>
							<label className='preference-label'>
								<input
									type='checkbox'
									checked={has.some((h) => h.dietary_name === preference.name)}
									onChange={() => handleTogglePreference(preference.name)}
								/>
								<span>{preference.name}</span>
							</label>
						</div>
					))}
			</div>
		</div>
	)
}

export default DietaryPreferences
