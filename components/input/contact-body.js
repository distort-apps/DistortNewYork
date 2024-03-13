import classes from './contact-body.module.css'
import MailToButton from '../ui/mail-to-button'
function ContactBodyPage () {
  return (
    <div className={classes.contact}>
      <h2>Write DistortNewYork @:</h2>
      <MailToButton
        label='contact@distortnewyork.com'
        mailto='mailto:contact@distortnewyork.com'
      />
      <hr />
    </div>
  )
}

export default ContactBodyPage
