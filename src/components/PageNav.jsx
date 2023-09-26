import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import styles from './PageNav.module.css'
import { useAuth } from '../contexts/FakeAuthContext'

function PageNav() {
	const { isAuthenticated } = useAuth()
	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/product">Product</NavLink>
				</li>
				<li>
					<NavLink to={!isAuthenticated ? '/login' : '/app'} className={styles.ctaLink}>
						{!isAuthenticated ? 'Login' : 'back to map'}
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default PageNav
