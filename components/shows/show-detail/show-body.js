import classes from './show-body.module.css'
import React, { useEffect } from 'react'
import DateIcon from '@/components/icons/date-icon'
import AddressIcon from '@/components/icons/address-icon'
import MoneyIcon from '@/components/ui/money-icon'
import ClockIcon from '@/components/ui/clock-icon'
import StarIcon from '@/components/ui/star-icon'
function ShowBody ({
  genre,
  title,
  image,
  excerpt,
  date,
  price,
  location,
  time
}) {
  const readableDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(date))

  const char0 = price.charAt(0)
  let formattedPrice = ''

  if (char0 === '$') {
    formattedPrice = price.slice(1)
  } else {
    formattedPrice = price
  }

  return (
    <div className={classes.body}>
      <div>
        <img src={image} alt={title} />
      </div>
      <div className={classes.date}>
        <DateIcon />
        <p>{readableDate}</p>
      </div>
      <div className={classes.time}>
        <ClockIcon />
        <time>{time}</time>
      </div>
      <div className={classes.money}>
        <MoneyIcon />
        <p>${formattedPrice}</p>
      </div>
      <div className={classes.genre}>
        <StarIcon />
        <p>{genre}</p>
      </div>
      <div className={classes.address}>
        <AddressIcon />
        <p>{location}</p>
      </div>
      <p>{excerpt}</p>
    </div>
  )
}
export default ShowBody
