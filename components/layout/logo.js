import classes from './logo.module.css'
import { usePathname } from 'next/navigation'
function Logo () {
  const pathname = usePathname()
  return (
    <section className={classes.logo}>
      <div className={pathname === '/' ? classes.active : undefined}>
        DistortNewYork
      </div>
    </section>
  )
}

export default Logo
