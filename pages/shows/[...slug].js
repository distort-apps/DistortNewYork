import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ShowGrid from '@/components/shows/show-grid'
import { getAllShows } from '@/show-dummy-data'
import Button from '@/components/ui/button'
import ErrorAlert from '@/components/ui/error-alert'

function FilteredEventsPage (props) {
  const [loadedEvents, setLoadedEvents] = useState([])
  const router = useRouter()

  const filterData = router.query.slug
  console.log(filterData)

  useEffect(() => {
    console.log('running')
    const show = getAllShows()
    setLoadedEvents(show)
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
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = loadedEvents.filter(event => {
    const eventDate = new Date(event.date)

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
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      {pageHeadData}
      <ShowGrid items={filteredEvents} />
    </>
  )
}



export default FilteredEventsPage

