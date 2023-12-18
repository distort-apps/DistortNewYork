import { useRef } from 'react'
import classes from './contact-form.module.css'
function ContactForm () {
  const emailInputRef = useRef()
  const enteredInfoRef = useRef()

  function submitFormHandler (e) {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredInfo = enteredInfoRef.current.value

    fetch(`/api/contact`, {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail, info: enteredInfo }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())

    emailInputRef.current.value = ''
    enteredInfoRef.current.value = ''
  }

  return (
    <>
      <section className={classes.contact}>Or submit event info 
      <form onSubmit={submitFormHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='info'>Event Info</label>
          <textarea id='info' rows='5' ref={enteredInfoRef}></textarea>
        </div>
        <button>Submit</button>
      </form>
      </section>
    </>
  )
}
export default ContactForm

// function ContactPage () {
//   return (
//     <div className='center'>
//       <h2>Write GⒶgz @:</h2>
//       <p>gagz.gmai.com</p>
//       <h3>or send a flyer to:</h3>
//       <p>POBOx: asdfjfkjfle </p>
//       <p>BRKLYN NY, 11237</p>
//       <hr/ >
//     </div>
//   )
// }
// export default ContactPage
