import ShowGrid from '@/components/shows/show-grid'
import { getAllShows } from '@/show-dummy-data'
import ShowDateFilter from '@/components/shows/show-date-filter'
import router from 'next/router'

function AllShowsPage ({ shows }) {
  function findShowsByDateHandler (year, month) {
    const fullPath = `/shows/${year}/${month}`

    router.push(fullPath)
  }

  return (
    <>
      <ShowDateFilter onSearch={findShowsByDateHandler} />
      <ShowGrid items={shows} />
    </>
  )
}

export async function getStaticProps () {
  const shows = getAllShows()

  return {
    props: {
      shows: shows
    },
    revalidate: 60
  }
}

export default AllShowsPage
