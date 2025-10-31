import { createContext, useState, useEffect, useContext } from 'react'
import { updateUserPassword, insertUser } from '../data/users'
import { loginApi } from '../data/login'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	// Check if there's a user in localStorage on initial load
	useEffect(() => {
		const storedUser = localStorage.getItem('currentUser')
		if (storedUser) {
			try {
				const userObj = JSON.parse(storedUser)
				setCurrentUser(userObj)
			} catch (error) {
				console.error('Error parsing stored user:', error)
				localStorage.removeItem('currentUser')
			}
		}
		setLoading(false)
	}, [])

	const login = async (email, password) => {
		try {
			const response = await loginApi(email, password)

			if (!response.loggedIn) {
				throw new Error('Invalid eamil or password')
			}
			console.log(response)
			setCurrentUser(response)
			localStorage.setItem('currentUser', JSON.stringify(response))
			return response
		} catch (error) {
			throw error
		}
	}

	const register = async (userData) => {
		try {
			await insertUser(userData)
			return { success: true }
		} catch (error) {
			throw error
		}
	}

	const updatePassword = async (userData) => {
		await updateUserPassword(userData)
		return { success: true }
	}

	const logout = () => {
		setCurrentUser(null)
		localStorage.removeItem('currentUser')
	}

	const isAdmin = () => {
		// Check if the current user has admin privileges
		return currentUser && currentUser.admin
	}

	const isVerifiedChef = () => {
		// Check if the current user is a verified chef
		return currentUser && currentUser.verified === 1
	}

	const value = {
		currentUser,
		login,
    updatePassword,
		register,
		logout,
		isAdmin,
		isVerifiedChef,
		loading,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
