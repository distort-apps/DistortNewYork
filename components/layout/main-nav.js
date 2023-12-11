import Link from 'next/link'
import Logo from './logo'
function MainNav () {
  return (
          <header>
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
