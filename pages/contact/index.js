import { useRef } from 'react'
import Head from 'next/head'

function ContactPage () {
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
    })
      .then(res => res.json())
  }

  return (
    <div>
      <Head>
        <title>DistortNewYork Contact Page</title>
        <meta
          name='description'
          content='Share your thoughts, or promote a show / event'
        />
      </Head>
      <form onClick={submitFormHandler}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='info'>Event Info</label>
          <textarea id='info' rows='5' ref={enteredInfoRef}></textarea>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}
export default ContactPage

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
