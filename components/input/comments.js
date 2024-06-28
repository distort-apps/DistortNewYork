import { useEffect, useState, useRef } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments (props) {
  const { showId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const commentSectionRef = useRef(null)

  useEffect(() => {
    if(showComments) {
      fetch('/api/comments/' + showId)
      .then(res => res.json()).then(data => {
        setComments(data.comments)
      })
    }
  }, [showComments])

  useEffect(() => {
    if (showComments && commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  function toggleCommentsHandler () {
    setShowComments(prevStatus => !prevStatus)
  }

  function addCommentHandler (commentData) {
    fetch('/api/comments/' + showId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => (data))
  }


  return (
    <section className={classes.comments} ref={commentSectionRef}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'hide' : 'show'} comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  )
}

export default Comments
