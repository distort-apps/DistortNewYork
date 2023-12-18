import classes from './contact-body.module.css'
import MailToButton from '../ui/mail-to-button'
function ContactBodyPage () {
  return (
    <div className={classes.contact}>
      <h2>Write DistortNewYork @:</h2>
      <MailToButton label="DistortNewYork@gmail.com" mailto="mailto:distortnewyork@gmail.com" />
      {/* <h3>or send a flyer to:</h3>
      <p>407 Himrod</p>
      <p>Apt 2R</p>
      <p>BRKLYN NY, 11237</p> */}
      <hr />
    </div>
  )
}
export default ContactBodyPage

