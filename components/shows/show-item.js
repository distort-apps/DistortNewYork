import Link from 'next/link'
import Image from 'next/image'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'

function ShowItem ({ show }) {
  const {
    id,
    title,
    date,
    genre,
    location,
    price,
    isFeatured,
    image,
    excerpt
  } = show

  const readableDate = new Date(date).toLocaleDateString('en-Us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const formattedAddress = location.replace(',', '\n')
  const exploreLink = `/shows/${id}`

  return (
    <li>
      <Link href={exploreLink}>
        <div>
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            responsive
          />
        </div>
        <div>
          <h3>{title}</h3>
          <div>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default ShowItem

