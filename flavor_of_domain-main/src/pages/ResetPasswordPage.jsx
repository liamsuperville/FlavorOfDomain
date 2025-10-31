import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLoading } from '../contexts/LoadingContext'

function RegisterPage() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [error, setError] = useState('')
	const { updatePassword } = useAuth()
	const { startLoading, stopLoading } = useLoading()
	const navigate = useNavigate()

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')

		// Basic validation
		if (Object.values(formData).some((value) => !value)) {
			setError('Please fill in all fields')
			return
		}

		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match')
			return
		}

		startLoading('Updating password...')

		try {
			const userData = {
				email: formData.email,
				password: formData.password,
			}

			await updatePassword(userData)
			navigate('/login')
		} catch (err) {
			setError(err.message)
		} finally {
			stopLoading()
		}
	}

	return (
		<div className='register-page'>
			<div className='auth-form-container'>
				<h1>Reset Password</h1>

				{error && <div className='error-message'>{error}</div>}

				<form className='auth-form' onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='confirmPassword'>Confirm Password</label>
						<input
							type='password'
							id='confirmPassword'
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
					</div>

					<button type='submit' className='auth-btn'>
						Reset
					</button>
				</form>

				<div className='auth-link'>
					Remember Password? <Link to='/login'>Login</Link>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
