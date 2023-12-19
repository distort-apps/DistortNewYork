import Image from 'next/image'
import classes from './show-body.module.css'

function ShowBody ({ title, image, excerpt, date, price, location, time }) {
  return (
    <div className={classes.body}>
      <div>
        <img src={image} alt={title}  />
      </div>
      <div className='center'>
        <p>{location}</p>
        <p>{time}</p>
        <time>{date}</time>
        <p>${price}</p>
        <p>{excerpt}</p>
      </div>
    </div>
  )
}
export default ShowBody
