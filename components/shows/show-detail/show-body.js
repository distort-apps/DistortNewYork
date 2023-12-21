import classes from './show-body.module.css'

function ShowBody ({ title, image, excerpt, date, price, location, time }) {
  const readableDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC' // Set time zone to UTC
  }).format(new Date(date));
  return (
    <div className={classes.body}>
      <div>
        <img src={image} alt={title} />
      </div>
      <div className='center'>
        <p>{location}</p>
        <p>{time}</p>
        <time>{readableDate}</time>
        <p>${price}</p>
        <p>{excerpt}</p>
      </div>
    </div>
  )
}
export default ShowBody
