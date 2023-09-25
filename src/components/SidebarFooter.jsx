import styles from './SidebarFooter.module.css'
function SidebarFooter() {
	return (
		<footer className={styles.footer}>
			<p className={styles.copyright}> &copy; {new Date().getFullYear()} by WorldWise Inc.</p>
		</footer>
	)
}

export default SidebarFooter
