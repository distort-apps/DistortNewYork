import Image from 'next/image'
import classes from './show-body.module.css'

function ShowBody ({ title, image, excerpt, date, price, location, time }) {
  return (
    <div className={classes.body}>
      <div>
        <Image src={image} alt={title} width={656} height={656} responsive={+true} />
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
