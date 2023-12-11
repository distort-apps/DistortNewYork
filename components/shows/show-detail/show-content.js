import { useRouter } from 'next/router'
import ShowBody from './show-body'
import ShowHeader from './show-header'
import ShowFooter from './show-footer'

function ShowContent ({ show }) {
  const router = useRouter()

  return (
    <article>
      <article>
        <ShowHeader title={show.title} />
        <ShowBody
          title={show.title}
          image={show.image}
          date={show.date}
          excerpt={show.excerpt}
          location={show.location}
          price={show.price}
          genre={show.genre}
        />
        <ShowFooter excerpt={show.excerpt}/>
      </article>
    </article>
  )
}
export default ShowContent
