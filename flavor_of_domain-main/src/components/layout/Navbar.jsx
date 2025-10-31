import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Navbar() {
	const { currentUser, logout, isAdmin, isVerifiedChef } = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/')
	}

	return (
		<nav className='navbar'>
			<div className='navbar-left'>
				<Link to='/' className='navbar-brand'>
					FlavorOfDomain
				</Link>
			</div>

			<div className='navbar-center'>
				<Link to='/' className='nav-link'>
					Home
				</Link>
				<Link to='/recipes' className='nav-link'>
					Recipes
				</Link>
				{currentUser && (
					<>
						<Link to='/meal-plans' className='nav-link'>
							Meal Plans
						</Link>
						<Link to='/recipes/create' className='nav-link'>
							Create Recipe
						</Link>
						<Link to='/reports' className='nav-link'>
							Reports
						</Link>
					</>
				)}
			</div>

			<div className='navbar-right'>
				{currentUser ? (
					<>
						<Link to='/profile' className='nav-link'>
							{currentUser.name || 'Profile'}
						</Link>
						{isAdmin() && (
							<Link to='/admin' className='nav-link admin-link'>
								Admin
							</Link>
						)}
						<button onClick={handleLogout} className='logout-btn'>
							Logout
						</button>
					</>
				) : (
					<>
						<Link to='/login' className='nav-link'>
							Login
						</Link>
						<Link to='/register' className='nav-link'>
							Register
						</Link>
					</>
				)}
			</div>
		</nav>
	)
}

export default Navbar