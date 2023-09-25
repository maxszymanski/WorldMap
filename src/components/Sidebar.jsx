import { Outlet } from 'react-router-dom'
import AppNav from './AppNav'
import SidebarFooter from './SidebarFooter'
import Logo from './Logo'
import styles from './Sidebar.module.css'

function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			<Outlet />

			<SidebarFooter />
		</div>
	)
}

export default Sidebar
