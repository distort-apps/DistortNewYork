import { useRef } from 'react'
import classes from './contact-form.module.css'

function ContactForm () {
  const emailInputRef = useRef()
  const enteredTitleRef = useRef()
  const enteredDateRef = useRef()
  const enteredGenreRef = useRef()
  const enteredTimeRef = useRef()
  const enteredPriceRef = useRef()
  const enteredUrlRef = useRef()
  const enteredExcerptRef = useRef()

  function submitFormHandler (e) {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredTitle = enteredTitleRef.current.value
    const enteredDate = enteredDateRef.current.value
    const enteredGenre = enteredGenreRef.current.value
    const enteredTime = enteredTimeRef.current.value
    const enteredPrice = enteredPriceRef.current.value
    const enteredUrl = enteredUrlRef.current.value
    const enteredExcerpt = enteredExcerptRef.current.value

    fetch(`/api/contact`, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        title: enteredTitle,
        date: enteredDate,
        genre: enteredGenre,
        time: enteredTime,
        price: enteredPrice,
        url: enteredUrl,
        excerpt: enteredExcerpt
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())

    emailInputRef.current.value = ''
    enteredTitleRef.current.value = ''
    enteredDateRef.current.value = ''
    enteredGenreRef.current.value = ''
    enteredTimeRef.current.value = ''
    enteredPriceRef.current.value = ''
    enteredUrlRef.current.value = ''
    enteredExcerptRef.current.value = ''
  }

  return (
    <>
      <section className={classes.contact}>
        <h2>Submit event info</h2>
        <form onSubmit={submitFormHandler} className={classes.form}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email Address</label>
            <input type='email' id='email' ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='title'>Event title</label>
            <textarea id='title' rows='1' ref={enteredTitleRef}></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='date'>Event date</label>
            <textarea id='date' rows='1' ref={enteredDateRef}></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='genre'>Event genre</label>
            <textarea id='gnre' rows='1' ref={enteredGenreRef}></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='time'>Event time</label>
            <textarea id='time' rows='1' ref={enteredTimeRef}></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='price'>Event price</label>
            <textarea id='price' rows='1' ref={enteredPriceRef}></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='url'>Event flyer url</label>
            <textarea id='url' rows='1' ref={enteredUrlRef}></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='excerpt'>Tell us about the Event</label>
            <textarea id='excerpt' rows='5' ref={enteredExcerptRef}></textarea>
          </div>
          <button>Submit</button>
        </form>
      </section>
    </>
  )
}
export default ContactForm
