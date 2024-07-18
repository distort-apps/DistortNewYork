import classes from './logo.module.css'
import { usePathname } from 'next/navigation'
import logo from '../../public/images/logo.PNG'
import Image from 'next/image'

function Logo () {
  const pathname = usePathname()
  return (
    <section className={classes.logo}>
      <div className={pathname === '/' ? classes.active : undefined}>
      <Image src={logo} alt="Logo" width={100} height={100} />
      </div>
    </section>
  )
}

export default Logo
