import ShowBody from './show-body'
import ShowHeader from './show-header'
import ShowExcerpt from './show-excerpt'
import classes from './show-content.module.css'

function ShowContent ({ show }) {
  return (
    <div className={classes.wrapper}>

      <article className={classes.content}>
      <ShowHeader title={show.title} />
      <ShowBody
        title={show.title}
        image={show.image}
        date={show.date}
        location={show.location}
        time={show.time}
        price={show.price}
        genre={show.genre}
      />
      <ShowExcerpt excerpt={show.excerpt} />
    </article>
    </div>
  )
}
export default ShowContent
