import ShowBody from './show-body'
import ShowHeader from './show-header'
import ShowFooter from './show-footer'
import classes from './show-content.module.css'

function ShowContent ({ show }) {
  return (
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
      <ShowFooter excerpt={show.excerpt} />
    </article>
  )
}
export default ShowContent
