import Link from 'next/link'
import Image from 'next/image'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import classes from './show-item.module.css'

function ShowItem ({ show }) {
  const {
    _id,
    title,
    date,
    location,
    genre,
    image,
  } = show

  const readableDate = new Date(date).toLocaleDateString('en-Us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const formattedAddress = location.replace(',', '\n')
  const exploreLink = `/shows/${_id}`

  return (
    <li className={classes.post}>
      <Link href={exploreLink} className={classes.link}>
        <div className={classes.image}>
          <img
            src={image}
            alt={title}
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <div className={classes.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
          <div>
            <p>{genre}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default ShowItem

