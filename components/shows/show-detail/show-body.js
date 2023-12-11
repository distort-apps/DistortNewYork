import Image from 'next/image'
import classes from './show-body.module.css'

function ShowBody ({ title, image, excerpt, date, price, location }) {
  return (
    <div className={classes.body}>
      <div>
        <Image src={image} alt={title} width={700} height={650} layout='responsive' />
      </div>
      <div className='center'>
        <p>{location}</p>
        <time>{date}</time>
        <p>${price}</p>
        <p>{excerpt}</p>
      </div>
    </div>
  )
}
export default ShowBody
