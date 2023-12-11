import { useRouter } from 'next/router'

function ShowContent ({ show }) {
  const router = useRouter()

  return (
    <article>
      {show.title}
    </article>
  )
}
export default ShowContent
