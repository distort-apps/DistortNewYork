import { useRef, useState } from 'react'
import classes from './newsletter.module.css'
import Button from '../ui/button'

function Newsletter () {
  const [placeholder, setPlaceholder] = useState('Your Email')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emailInputRef = useRef()

  function registrationHandler (e) {
    e.preventDefault()

    setIsSubmitting(true)
    const enteredEmail = emailInputRef.current.value

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())

    emailInputRef.current.value = ''
    setPlaceholder('nom nom nom')
  }

  return (
    <section className={classes.newsletter}>
      <h2>register and we might send you our weekly top shows</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder={placeholder}
            aria-label='Your email'
            ref={emailInputRef}
            disabled={isSubmitting}
          />
          <Button
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.5 : 1 }}
          >
            Register
          </Button>
        </div>
      </form>
    </section>
  )
}

export default Newsletter
