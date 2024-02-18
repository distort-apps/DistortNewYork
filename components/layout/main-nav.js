import Link from 'next/link'
import Logo from './logo'
import classes from './main-nav.module.css'
import { usePathname } from 'next/navigation'
function MainNav () {
  const pathname = usePathname()
  return (
          <header className={classes.header}>
      <Link href='/' >
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/shows' className={pathname.startsWith('/shows') ? classes.active : undefined}>Shows</Link>
          </li>
          <li>
            <Link href='/contact' className={pathname.startsWith('/contact') ? classes.active : undefined}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default MainNav
