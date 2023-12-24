import classes from './donate.module.css'
import Button from '../ui/button'
import Link from 'next/link'

function Donate () {
  return (
    <section className={classes.donate}>
      <h2>
        Donate today - help us provide urgent supplies to Palestinians in need
      </h2>
      {/* Using Button component with an <a> tag for external link */}
      <Link
        href='https://linktr.ee/MedicalAidforPalestinians'
        target='_blank'
        rel='noopener noreferrer'
      >
        https://www.map.org.uk/donate/donate
      </Link>
      <hr />
    </section>
  )
}
export default Donate
