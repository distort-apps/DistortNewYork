import { useRef } from 'react'
import classes from './newsletter.module.css'
import Button from '../ui/button'

function Newsletter () {
  const emailInputRef = useRef()

  function registrationHandler(e) {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({email: enteredEmail}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <section className={classes.newsletter}>
      <h2>register and we might send you our weekly top shows</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <Button>Register</Button>
        </div>
      </form>
    </section>
  )
}

export default Newsletter
