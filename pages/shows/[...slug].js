import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Results from '@/components/shows/show-detail/results'
import ErrorAlert from '@/components/ui/error-alert'
import Button from '@/components/ui/button'
import Head from 'next/head'
import ShowGrid from '@/components/shows/show-grid'

function FilteredEventsPage (props) {
  const [loadedEvents, setLoadedEvents] = useState([])
  const router = useRouter()

  const filterData = router.query.slug
  console.log(filterData)

  useEffect(() => {
  fetch('http://localhost:3000/api/shows')
  .then(res => res.json()).then(data => {
      const shows = data.shows
      setLoadedEvents(shows)
      console.log("loadedEvents", loadedEvents)
  })
  }, [])

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`A list of filtered events.`} />
    </Head>
  )

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </>
    )
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  console.log("filteredYear", filteredYear)
  console.log("filterMonth", filteredMonth)

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  )

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/shows'>Show All Shows</Button>
        </div>
      </>
    )
  }

  const filteredEvents = loadedEvents.filter(event => {
    const eventDate = new Date(event.date)
    console.log("LOADED EVENTS FILTER : " ,event)
    console.log("event.genre", event.genre)
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1 
    )
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/shows'>Show All Shows</Button>
        </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      {pageHeadData}
      <Results date={date} />
      <ShowGrid items={filteredEvents} />
    </>
  )
}

export default FilteredEventsPage

