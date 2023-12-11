import { useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments (props) {
  const { showId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    if(showComments) {
      fetch('/api/comments/' + showId)
      .then(res => res.json()).then(data => {
        setComments(data.comments)
      })
    }
  }, [showComments])

  console.log(comments)
  function toggleCommentsHandler () {
    setShowComments(prevStatus => !prevStatus)
  }

  function addCommentHandler (commentData) {
    // send data to API
    fetch('/api/comments/' + showId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }


  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  )
}

export default Comments
