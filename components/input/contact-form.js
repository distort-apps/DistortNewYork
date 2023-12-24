import { useRef, useState } from 'react'
import classes from './contact-form.module.css'
import Button from '../ui/button'

function ContactForm () {
  const emailInputRef = useRef()
  const enteredTitleRef = useRef()
  const enteredDateRef = useRef()
  const enteredGenreRef = useRef()
  const enteredTimeRef = useRef()
  const enteredPriceRef = useRef()
  const fileInputRef = useRef()
  const enteredExcerptRef = useRef()
  const [fileName, setFileName] = useState('Upload FLyer');

  function truncateFileName(name, maxLength = 25){
    if (name.length > maxLength) {
      return `${name.substring(0, maxLength - 3)}...`;
    }
    return name;
  };

  function handleFileChange(event){
    const file = event.target.files[0];
    if (file) {
      const truncatedName = truncateFileName(file.name);
      setFileName(truncatedName);
    } 
  };
  async function submitFormHandler (e) {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredTitle = enteredTitleRef.current.value
    const enteredDate = enteredDateRef.current.value
    const enteredGenre = enteredGenreRef.current.value
    const enteredTime = enteredTimeRef.current.value
    const enteredPrice = enteredPriceRef.current.value
    const enteredExcerpt = enteredExcerptRef.current.value

    const formData = new FormData()
    formData.append('email', enteredEmail)
    formData.append('title', enteredTitle)
    formData.append('date', enteredDate)
    formData.append('genre', enteredGenre)
    formData.append('time', enteredTime)
    formData.append('price', enteredPrice)
    formData.append('excerpt', enteredExcerpt)
    formData.append('image', fileInputRef.current.files[0])

    try {
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      })

      if (response.ok) {
        emailInputRef.current.value = ''
        enteredTitleRef.current.value = ''
        enteredDateRef.current.value = ''
        enteredGenreRef.current.value = ''
        enteredTimeRef.current.value = ''
        enteredPriceRef.current.value = ''
        fileInputRef.current.value = null
        enteredExcerptRef.current.value = ''
        setFileName('Upload Flyer')
      } else {
        console.error('Failed to submit the form.')
      }
    } catch (error) {
      console.error('Error submitting the form:', error)
    }
  }

  return (
    <>
      <section className={classes.contact}>
        <h2>Submit event info</h2>
        <p>Only email is required.</p> <p>Anything you submit could get posted.</p>
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
            <textarea id='genre' rows='1' ref={enteredGenreRef}></textarea>
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
            <label className={classes.fileInputLabel} htmlFor='image'>{fileName}</label>
            <input className={classes.fileInput} type='file' id='image' ref={fileInputRef} onChange={handleFileChange}  accept='image/*' />
          </div>
          <div className={classes.control}>
            <label htmlFor='excerpt'>Tell us about the Event</label>
            <textarea id='excerpt' rows='3' ref={enteredExcerptRef}></textarea>
          </div>
          <Button>Submit</Button>
        </form>
      </section>
    </>
  )
}
export default ContactForm