import ShowGrid from '@/components/shows/show-grid'
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

export async function getStaticProps() {
  // const shows = await getAllShows()
  console.log("this is running ")

 const shows = await fetch('http://localhost:3000/api/shows')
  .then(res => res.json()).then(data => {
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
