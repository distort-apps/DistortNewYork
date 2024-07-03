import classes from './results.module.css'
import Button from '@/components/ui/button'

function Results (props) {
  const { date, query, items, totalShows } = props

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  if (query) {
    return (
      <section className={classes.title}>
        <h1>THER ARE {items} {query} EVENTS ...</h1>
        <Button link='/shows'>show all events</Button>
      </section>
    )
  }

  return (
    <section className={classes.title}>
     <h1> There are {totalShows} Events in {humanReadableDate}</h1>
      <Button link='/shows'>show all events</Button>
    </section>
  )
}

export default Results
