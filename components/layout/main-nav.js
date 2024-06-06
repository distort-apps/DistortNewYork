import Link from 'next/link'
import Logo from './logo'
import classes from './main-nav.module.css'
import { usePathname } from 'next/navigation'
function MainNav () {
  const pathname = usePathname()
  return (
          <header className={classes.header}>
      <Link href='/' className={pathname === '/' ? classes.active : undefined}>
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/shows' className={pathname === '/shows' ? classes.active : undefined}>events</Link>
          </li>
          <li>
            <Link href='/contact' className={pathname === '/contact' ? classes.active : undefined}>info/submit</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default MainNav
