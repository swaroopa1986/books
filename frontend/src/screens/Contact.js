import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';


export default function Contact() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
 
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { contact } = state;
 const emailRegExp = /\S+@\S+\.\S+/;
  function handleNameInput(e){
    e.preventDefault()
    if(e.target.value === ""){
      setNameError("name must be filled");
    }else{
      setName(e.target.value);
      setNameError("")
    }  
}
  function handleEmailInput(e){
    e.preventDefault()
    if(e.target.value === ""){
      setEmailError("email must be filled");
    } else if(!new RegExp(emailRegExp).test(e.target.value)){
      setEmailError("email format is not valid")
    } else{
       setEmail(e.target.value)
       setEmailError("")
    }
   
}
function handleMessageInput(e){
    e.preventDefault()
    if(e.target.value === ""){
      setMessageError("Message must be filled");
    }else {
      setMessage(e.target.value)
      setMessageError("")
    }
}
useEffect(() => {
    if (!contact) {
      navigate('/signin?redirect=/contact');
    }
}, [contact, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
      ctxDispatch({ type: 'SAVE_CONTACT_MESSAGE', 
      payload:  {
      name,
      email,
      message,
    },
 });
      localStorage.setItem('contact', JSON.stringify({
        name,
        email,
        message,
    })
    );
      navigate('/'); 
      toast.success("message sent successfully");
  };
const errorHandler = (e) => {
e.preventDefault();
setError("All fields must be filled");
}
if(name!=="" && email!=="" && message!==""){
  return (
    <Container className="small-container App">
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <section className="vh-100" style={{backgroundColor: '#eee'}}>
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
      class="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="divider d-flex align-items-center my-4">
            <h2 className="text-center fw-bold mx-3 mb-0">Contact Form</h2>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form3Example3">User Name</label>
            <input type="name" id="form3Example3" className="form-control form-control-md" onChange={handleNameInput} controlId="name" autoComplete='off'
              placeholder="Enter name" />
              <h4 style={{color:'red'}}> {nameError} </h4>    
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form3Example3">Email address</label>
            <input type="email" id="form3Example3" className="form-control form-control-lg" onChange={handleEmailInput} controlId="email" autoComplete='off'
              placeholder="Enter email address" />
              <h4 style={{color:'red'}}> {emailError} </h4>    
          </div>
          <div className="form-outline mb-3"> 
          <label className="form-label" for="form3Example4">message</label>
            <input type="message" id="form3Example4" className="form-control form-control-lg" onChange={handleMessageInput} controlId="message"
              placeholder="Enter message" required/>  
            <h4 style={{color:'red'}}> {messageError} </h4>
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg" onClick={submitHandler}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </Container>
  );
} else{
  return (
    <Container className="small-container App">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <section className="vh-100" style={{backgroundColor: '#eee'}}>
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
      class="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="divider d-flex align-items-center my-4">
            <h2 className="text-center fw-bold mx-3 mb-0">Contact Form</h2>
          </div>
          <h4 style={{color:'red'}}>{message}</h4>
          <div className="form-outline mb-4">
            <label className="form-label" for="form3Example3">User Name</label>
            <input type="name" id="form3Example3" className="form-control form-control-md" onChange={handleNameInput} controlId="name" autoComplete='off'
              placeholder="Enter name" />
              <h4 style={{color:'red'}}> {nameError} </h4>    
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form3Example3">Email address</label>
            <input type="email" id="form3Example3" className="form-control form-control-lg" onChange={handleEmailInput} controlId="email" autoComplete='off'
              placeholder="Enter email address" />
              <h4 style={{color:'red'}}> {emailError} </h4>    
          </div>
          <div className="form-outline mb-3"> 
          <label className="form-label" for="form3Example4">Message</label>
            <input type="message" id="form3Example4" className="form-control form-control-lg" onChange={handleMessageInput} controlId="message"
              placeholder="Enter message" required/>  
            <h4 style={{color:'red'}}> {messageError} </h4>
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg" onClick={errorHandler}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Submit</button>
              <h4 style={{color:'red'}}> {error} </h4>
             </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </Container>
  );
}
  
}
   