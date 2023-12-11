import Link from 'next/link'
import Logo from './logo'
import classes from './main-nav.module.css'
function MainNav () {
  return (
          <header className={classes.header}>
      <Link href='/' >
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/shows'>Shows</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default MainNav
