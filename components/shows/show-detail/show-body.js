import classes from './show-body.module.css'

function ShowBody ({ title, image, excerpt, date, price, location, time }) {
  const readableDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(date))

  const char0 = price.charAt(0);
  let formattedPrice = ""

  if (char0 === '$') {
    formattedPrice = price.slice(1)
  } else {
    formattedPrice = price
  }

  console.log("price: ", price)
  return (
    <div className={classes.body}>
      <div>
        <img src={image} alt={title} />
      </div>
      <div className='center'>
        <p>{location}</p>
        <p>{time}</p>
        <time>{readableDate}</time>
        <p>${formattedPrice}</p>
        <p>{excerpt}</p>
      </div>
    </div>
  )
}
export default ShowBody
