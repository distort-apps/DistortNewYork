import ShowContent from '@/components/shows/show-detail/show-content'
import Comments from '@/components/input/comments'
import Head from 'next/head'
import { getShowById, getFeaturedShows } from '@/helpers/api-util'

function ShowDetailPage (props) {
  const show = props.show

  if (!show) {
    return (
      <div className='center'>
        <p>No show found!</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{show.title}</title>
        <meta name='description' content={show.excerpt} />
      </Head>
      <ShowContent show={show} />
      <Comments showId={show._id} />
    </>
  )
}

export async function getStaticProps (context) {
  const showId = context.params.showId

  try {
    const show = await getShowById(showId)

    return {
      props: {
        show: JSON.parse(JSON.stringify(show))
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)

    return {
      props: {
        show: null,
        error: 'Error in getShowById'
      },
      revalidate: 60
    }
  }
}

export async function getStaticPaths () {
  try {
    const shows = await getFeaturedShows()

    const paths = shows.map(show => ({
      params: { showId: show._id.toString() }
    }))

    return {
      paths: paths,
      fallback: 'blocking'
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error)

    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

export default ShowDetailPage
