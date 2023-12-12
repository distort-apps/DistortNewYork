import ShowContent from '@/components/shows/show-detail/show-content'
import Comments from '@/components/input/comments'
import Head from 'next/head'

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
        <meta
          name='description'
          content={show[0].excerpt}
        />
      </Head>
      <ShowContent show={show[0]} />
      <Comments showId={show[0]._id} />
    </>
  )
}

export async function getStaticProps (context) {
  const showId = context.params.showId
  const show = await fetch(`http://localhost:3000/api/shows/${showId}`)
    .then(res => res.json())
    .then(data => {
      let show = data.shows
      return show
    })
  return {
    props: {
      selectedShow: show
    },
    revalidate: 30
  }
}

export async function getStaticPaths () {
  // const shows = await getFeaturedShows();
  const shows = await fetch('http://localhost:3000/api')
    .then(res => res.json())
    .then(data => {
      let shows = data.shows
      return shows
    })
  const paths = shows.map(show => ({ params: { showId: show._id } }))
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
