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
          <Button link='/events'>Show All Events</Button>
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
          <Button link='/events'>Show All Events</Button>
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

// export async function getServerSideProps (context) {
//   const { params } = context

//   const filteredData = params.slug

//   const filteredYear = filteredData[0]
//   const filteredMonth = filteredData[1]

//   const numYear = +filteredYear
//   const numMonth = +filteredMonth

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       // show the 404 page if there is an error
//       // notFound: true,
//       props: { hasError: true }
//     }
//   }

//   const filteredShows = await getFilteredShows({
//     year: numYear,
//     month: numMonth
//   })

//   return {
//     props: {
//       shows: filteredShows,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }
// }

export default FilteredEventsPage

// import { useRouter } from 'next/router'
// import ErrorAlert from '@/components/ui/error-alert'
// import Button from '@/components/ui/button'
// // import { getFilteredEvents } from '@/dummy-data'
// import { getFilteredShows } from '@/helpers/api-util'
// import ResultsTitle from '@/components/shows/results-title'
// import ShowGrid from '@/components/shows/show-grid'

// function FilteredEventsPage (props) {
//   const router = useRouter()

// //   const filteredData = router.query.slug

// //   if (!filteredData) {
// //     return <p className='center'>Loading...</p>
// //   }

// //   const filteredYear = filteredData[0]
// //   const filteredMonth = filteredData[1]

// //   // month and year are strings becasue they are part of the url

// //   const numYear = +filteredYear
// //   const numMonth = +filteredMonth

//   if (props.hasError) {
//     return (
//       <>
//         <ErrorAlert>
//           <p>Invalid filter. Please adjust your values!</p>
//         </ErrorAlert>
//         <div className='center'>
//           <Button link='/shows'>Show All Events</Button>
//         </div>
//       </>
//     )
//   }

//   const filteredShow = props.shows

//   if (!filteredShow || filteredShow.length === 0) {
//     return (
//       <>
//         <ErrorAlert>
//           <p>No events found for the chosen filter!</p>
//         </ErrorAlert>
//         <div className='center'>
//           <Button link='/shows'>Show All Events</Button>
//         </div>
//       </>
//     )
//   }

//   // date begins at 0 so subtract 1
//   const date = new Date(props.date.year, props.date.month - 1)

//   return (
//     <>
//       <ResultsTitle date={date} />
//       <ShowGrid items={filteredShow} />
//     </>
//   )
// }

// export async function getServerSideProps (context) {
//   const { params } = context

//   const filteredData = params.slug

//   const filteredYear = filteredData[0]
//   const filteredMonth = filteredData[1]

//   const numYear = +filteredYear
//   const numMonth = +filteredMonth

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       // show the 404 page if there is an error
//       // notFound: true,
//       props: { hasError: true }
//     }
//   }

//   const filteredShows = await getFilteredShows({
//     year: numYear,
//     month: numMonth
//   })

//   return {
//     props: {
//         shows: filteredShows,
//         date: {
//             year: numYear,
//             month: numMonth
//         }
//     }
//   }
// }

// export default FilteredEventsPage
