import Head from 'next/head'
import ContactForm from '@/components/input/contact-form'
import ContactBodyPage from '@/components/input/contact-body'

function ContactPage () {
  return (
    <div>
      <Head>
        <title>DistortNewYork Contact Page</title>
        <meta
          name='description'
          content='Share your thoughts, or promote a show / event'
        />
      </Head>
      <ContactBodyPage />
      <ContactForm />
    </div>
  )
}
export default ContactPage