import { useRef, useState } from 'react'
import classes from './contact-form.module.css'
import Button from '../ui/button'
import ErrorAlert from '../ui/error-alert'

function ContactForm () {
  const emailInputRef = useRef()
  const enteredTitleRef = useRef()
  const enteredDateRef = useRef()
  const enteredGenreRef = useRef()
  const enteredTimeRef = useRef()
  const enteredPriceRef = useRef()
  const fileInputRef = useRef()
  const enteredExcerptRef = useRef()
  const [fileName, setFileName] = useState('Upload Flyer')
  const [formError, setFormError] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const [isSending, setIsSending] = useState(false)

  function handleInputChange () {
    if (formError) {
      setFormError(false)
    }
  }

  function isFormEmpty () {
    const refs = [
      emailInputRef,
      enteredTitleRef,
      enteredDateRef,
      enteredGenreRef,
      enteredTimeRef,
      enteredPriceRef,
      enteredExcerptRef
    ]

    return (
      refs.every(ref => !ref.current.value.trim()) &&
      !fileInputRef.current.files[0]
    )
  }

  function truncateFileName (name, maxLength = 20) {
    if (name.length > maxLength) {
      return `${name.substring(0, maxLength - 3)}...`
    }
    return name
  }

  function handleFileChange (event) {
    const file = event.target.files[0]
    if (file) {
      const truncatedName = truncateFileName(file.name)
      setFileName(truncatedName)
    }
  }
  async function submitFormHandler (e) {
    e.preventDefault()

    if (isFormEmpty()) {
      setFormError(true)
      return
    }
    setFormError(false)

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

      setIsSending(true)

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
        setIsSending(false)
        setSubmissionSuccess(true)

        setTimeout(() => {
          setSubmissionSuccess(false)
        }, 5000)
      } else {
        console.error('Failed to submit the form.')
      }
    } catch (error) {
      console.error('Error submitting the form:', error)
    }
  }

  function toggleValidationInstructions () {
    if (formError) {
      return (
        <ErrorAlert>
          Please fill in at least one field before submitting.
        </ErrorAlert>
      )
    } else {
      return (
        <>
          <h2>Submit event info</h2>
          <p>No single field is required</p>
          <p>Anything you submit could get posted</p>
        </>
      )
    }
  }

  return (
    <section className={classes.contact}>
      {toggleValidationInstructions()}
      <form onSubmit={submitFormHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='title'>Title</label>
            <textarea
              id='title'
              rows='1'
              ref={enteredTitleRef}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='date'>Date</label>
            <textarea
              id='date'
              rows='1'
              ref={enteredDateRef}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='time'>Time</label>
            <textarea
              id='time'
              rows='1'
              ref={enteredTimeRef}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='price'>Price</label>
            <textarea
              id='price'
              rows='1'
              ref={enteredPriceRef}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='genre'>Genre</label>
            <textarea
              id='genre'
              rows='1'
              ref={enteredGenreRef}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='excerpt'>Details</label>
            <textarea
              id='excerpt'
              rows='3'
              ref={enteredExcerptRef}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              ref={emailInputRef}
              onChange={handleInputChange}
            />
          </div>
          {isSending && <p>Submitting details...</p>}
          {submissionSuccess && <p>thanks 💀</p>}
          <div className={classes.control}>
            <label className={classes.fileInputLabel} htmlFor='image'>
              {fileName}
            </label>
            <input
              className={classes.fileInput}
              type='file'
              id='image'
              ref={fileInputRef}
              onChange={handleFileChange}
              accept='image/*'
            />
          </div>
        </div>
        <Button>Submit</Button>
      </form>
    </section>
  )
}
export default ContactForm
