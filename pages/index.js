import FeaturedShows from '@/components/home-page/featured-shows'
import Newsletter from '@/components/input/newsletter'
import Head from 'next/head'
import { fetchFeaturedShows } from '@/helpers/api-util'

function HomePage (props) {
  return (
    <>
      <Head>
        <title>Featured Shows in NY</title>
        <meta
          name='description'
          content='Our top picks for shows to see in NY'
        />
      </Head>
      <Newsletter />
      <FeaturedShows shows={props.shows} />
    </>
  )
}

export async function getStaticProps () {
  try {
    const shows = await fetchFeaturedShows()

    return {
      props: {
        shows: JSON.parse(JSON.stringify(shows))
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)

    return {
      props: {
        shows: [],
        error: 'Error in getFeaturedShows'
      },
      revalidate: 60
    }
  }
}

export default HomePage
