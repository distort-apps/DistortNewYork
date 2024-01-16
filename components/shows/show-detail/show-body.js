import classes from './show-body.module.css'
import React, { useEffect } from'react';
function ShowBody ({ genre, title, image, excerpt, date, price, location, time }) {
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

    useEffect(() => {
      document.body.classList.add('show-detail-background');
  
      return () => {
        document.body.classList.remove('show-detail-background');
      };
    }, []);

  return (
    <div className={classes.body}>
      <div>
        <img src={image} alt={title} />
      </div>
      <div className='center'>
        <p className={classes.font}>{genre}</p>
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
