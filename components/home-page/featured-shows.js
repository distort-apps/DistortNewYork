import classes from './featured-shows.module.css'
import ShowGrid from '../shows/show-grid'

function FeaturedShows ({ shows }) {
  return (
    <section className={classes.latest}>
      <h3 className='center'>Shows that we would probably go to ...</h3>
      <ShowGrid items={shows} />
    </section>
  )
}
export default FeaturedShows
