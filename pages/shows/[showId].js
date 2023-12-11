import { useEffect, useState } from "react"
import { useRouter } from "next/router"

function ShowDetailPage (selectedShow) {
    const [show, setShow] = useState([])
  const router = useRouter()

  const id = router.query.id

    useEffect(() => {
    fetch(`/api/shows/${id}`)
      .then(res => res.json())
      .then(data => {
        setShow(data.show)
      })
  }, [])

  // if not show
  if (!show) {
    return (
      <div className='center'>
        <p>No show found!</p>
      </div>
    )
  }

  // if show
  return <h3>shows</h3>
}

export default ShowDetailPage
