import FeaturedShows from '@/components/home-page/featured-shows'
import Newsletter from '@/components/input/newsletter'
import Head from 'next/head'
import { connectDatabase } from '@/helpers/db-util'
function HomePage (props) {
  return (
    <>
      <Head>
        <title>Featured Shows in NY</title>
        <meta name="description" content="Our top picks for shows to see this week in NY"/>
      </Head>
      <Newsletter />
      <FeaturedShows shows={props.shows} />
    </>
  )
}

export async function getStaticProps () {
  const client = await connectDatabase()
  const db = client.db('gagz')
  const shows = await db
  .collection('shows')
  .find({ isFeatured: true })
  .sort({_id: -1})
  .limit(50)
  .toArray()
  
  return {
    props: {
      shows: JSON.parse(JSON.stringify(shows))
    },
    revalidate: 60
  }

}

export default HomePage
