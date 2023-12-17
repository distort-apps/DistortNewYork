import ShowContent from '@/components/shows/show-detail/show-content'
import Comments from '@/components/input/comments'
import Head from 'next/head'
import { connectDatabase } from '@/helpers/db-util'
import { ObjectId } from 'mongodb'

function ShowDetailPage (props) {
  const show = props.selectedShow

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
        <title>{show[0].title}</title>
        <meta name='description' content={show[0].excerpt} />
      </Head>
      <ShowContent show={show[0]} />
      <Comments showId={show[0]._id} />
    </>
  )
}

export async function getStaticProps (context) {
  const showId = context.params.showId
  const id = new ObjectId(showId)

  const client = await connectDatabase()
  const db = client.db('gagz')
  const show = await db
    .collection('shows')
    .find({ _id: id })
    .toArray()

  return {
    props: {
      selectedShow: JSON.parse(JSON.stringify(show))
    },
    revalidate: 30
  }
}

export async function getStaticPaths () {
  const client = await connectDatabase()
  const db = client.db('gagz')
  const shows = await db
    .collection('shows')
    .find({ isFeatured: true })
    .sort({ _id: -1 })
    .limit(50)
    .toArray()
    
  const paths = shows.map(show => ({ params: { showId: show._id.toString() } }))
  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export default ShowDetailPage

//   paths: [
//     {params: {id: 'e1'}}
//   ]
// }

// const id = new ObjectId(showId)
