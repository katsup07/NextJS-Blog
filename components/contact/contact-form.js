import classes from './contact-form.module.css';
import Notification from '../ui/notification';
import { useState, useEffect } from 'react';

async function sendContactData(contactDetails, setRequestStatus){
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    }
  });


  const responseData = await response.json();
  if(!response.ok)
    throw new Error(responseData.message || 'Something went wrong');
  
  return responseData;
}

const ContactForm = () => {
	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [enteredName, setEnteredName] = useState('');
	// const [enteredMessage, setEnteredMessage] = useState('');
	const [data, setData] = useState({email: '', name: '', message: ''});
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', or 'error'
  const [ requestError, setRequestError ] = useState('');
  
  useEffect(() => {
    if(requestStatus === 'success' || requestStatus === 'error'){
      console.log('data:!!! ', data);
      const timer = setTimeout( () => setRequestStatus(''), 4000);
      setRequestError('');
      
      return () => clearTimeout(timer);
    }


  }, [requestStatus])

  const setField = (e, type) => {
    if(type === 'email')
      setData( prevData => ({...prevData, email: e.target.value}));
    else if(type === 'name')
      setData( prevData => ({...prevData, name: e.target.value}));
    else if(type === 'message')
      setData( prevData => ({...prevData, message: e.target.value}));
      
    console.log('front-end', data);
  }

	const sendMessageHandler = async (e) => {
		e.preventDefault();
    setRequestStatus('pending');

   
    console.log('front-end', data);

    try{
      await sendContactData({
      email: data.email,
      name: data.name,
      message: data.message,
      }, setRequestStatus);

      setData({email: '', name: '', message: ''});
      setRequestStatus('success');
    } catch(error){
      setRequestStatus('error');
      setRequestError(error.message);
    }
  
	};

 
  const notificationJSX = () => {
    if(requestStatus === 'success')
      return <Notification status='success' title='Success' message='Your message was sent.'/>;
    else if(requestStatus === 'pending')
      return <Notification status='pending' title='Pending' message='Sending message...'/>;
    else if(requestStatus === 'error')
      return <Notification status='error' title='Error' message={requestError || 'Something went wrong. Please try again shortly.'}/>;
  }

	return (

      <>
        {notificationJSX()}
        <section className={classes.contact}>
          <h1>Leave LJ a message.</h1>
          <form className={classes.form} onSubmit={sendMessageHandler}>
            <div className={classes.controls}>
              <div className={classes.control}>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  value={data.email}
                  onChange={(e) => setField(e, 'email')}
                  required
                />
              </div>
              <div className={classes.control}>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  id='name'
                  value={data.name}
                  onChange={(e) => setField(e, 'name')}
                  required
                />
              </div>
            </div>
            <div className={classes.control}>
              <label htmlFor='message'>Your Message</label>
              <textarea
                id='message'
                rows='5'
                value={data.message}
                onChange={(e) => setField(e, 'message')}></textarea>
            </div>
            <div className={classes.actions}>
              <button>Send Message</button>
            </div>
          </form>
        </section>
      </>
	);
};

export default ContactForm;
