import ShowGrid from '@/components/shows/show-grid'
import ShowDateFilter from '@/components/shows/show-date-filter'
import GenSearch from '@/components/shows/gen-search'
import router from 'next/router'
import Head from 'next/head'

function AllShowsPage ({ shows }) {
  function findShowsByDateHandler (year, month) {
    const fullPath = `/shows/${year}/${month}`

    router.push(fullPath)
  }

  function genSearchHandler(query) {
    const fullPath = `/search/${query}`

    router.push(fullPath)
  }

  return (
    <>
      <Head>
        <title>All Shows</title>
        <meta name="description" content="Find all shows in NYC and its boroughs"/>
      </Head>
      <ShowDateFilter onSearch={findShowsByDateHandler} />
      <GenSearch onSearch={genSearchHandler}/>
      <ShowGrid items={shows} />
    </>
  )
}

export async function getStaticProps () {
  // const shows = await getAllShows()

  const shows = await fetch('http://localhost:3000/api/shows')
    .then(res => res.json())
    .then(data => {
      let shows = data.shows
      return shows
    })

  return {
    props: {
      shows: shows
    },
    revalidate: 60
  }
}

export default AllShowsPage
