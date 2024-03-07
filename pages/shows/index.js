import ShowGrid from '@/components/shows/show-grid'
import ShowDateFilter from '@/components/shows/show-date-filter'
import GenSearch from '@/components/shows/gen-search'
import router from 'next/router'
import Head from 'next/head'
import { fetchAllShows } from '@/helpers/api-util'


function AllShowsPage({ shows, buildTime }) {
  function findShowsByDateHandler(year, month) {
    const fullPath = `/shows/${year}/${month}`;

    router.push(fullPath);
  }

  function genSearchHandler(query) {
    const fullPath = `/search/${query}`;

    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All Shows</title>
        <meta
          name="description"
          content="Find all shows in NYC"
        />
      </Head>
      <ShowDateFilter onSearch={findShowsByDateHandler} />
      <GenSearch onSearch={genSearchHandler} />
      <ShowGrid items={shows} />
      <p>Last updated: {buildTime}</p>
    </>
  );
}

export async function getStaticProps() {
  try {
    const shows = await fetchAllShows();
    const buildTime = new Date().toString(); 

    return {
      props: {
        shows: JSON.parse(JSON.stringify(shows)),
        buildTime, 
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error);

    return {
      props: {
        shows: [],
        error: 'Error in getAllShows',
        buildTime: new Date().toString(), 
      },
      revalidate: 60
    }
  }
}

export default AllShowsPage;


// function AllShowsPage ({ shows }) {
//   function findShowsByDateHandler (year, month) {
//     const fullPath = `/shows/${year}/${month}`

//     router.push(fullPath)
//   }

//   function genSearchHandler (query) {
//     const fullPath = `/search/${query}`

//     router.push(fullPath)
//   }

//   return (
//     <>
//       <Head>
//         <title>All Shows</title>
//         <meta
//           name='description'
//           content='Find all shows in NYC'
//         />
//       </Head>
//       <ShowDateFilter onSearch={findShowsByDateHandler} />
//       <GenSearch onSearch={genSearchHandler} />
//       <ShowGrid items={shows} />
//     </>
//   )
// }

// export async function getStaticProps () {
//   try {
//     const shows = await fetchAllShows()

//     return {
//       props: {
//         shows: JSON.parse(JSON.stringify(shows))
//       },
//       revalidate: 60
//     }
//   } catch (error) {
//     console.error('Error in getStaticProps:', error)

//     return {
//       props: {
//         shows: [],
//         error: 'Error in getAllShows'
//       },
//       revalidate: 60
//     }
//   }
// }
// export default AllShowsPage
