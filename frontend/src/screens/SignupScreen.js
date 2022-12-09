import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';


export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
 
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
 const nameRegExp  = /^[A-z]{3,23}$/;
 const emailRegExp = /\S+@\S+\.\S+/;
 const pwdRegExp = {
  numCheck: /[0-9]/,
  capsCheck:/[A-Z]/,
  specialCharCheck:/[!@#$%^&*]/,
  lengthCheck: 8,
};
  function handleNameInput(e){
    e.preventDefault()
    if(e.target.value === ""){
      setNameError("name must be filled");
    }else if((e.target.value).length<3 || (e.target.value).length>23){
      setNameError("name must be min 3 and max 23 characters")
    } else if(!new RegExp(nameRegExp).test(e.target.value)){
      setNameError("name can contain only [a-z]")
    } else{
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
function handlePasswordInput(e){
    e.preventDefault()
    if(e.target.value === ""){
      setPasswordError("password must be filled");
    }else if(!new RegExp(pwdRegExp.numCheck).test(e.target.value)){
      setPasswordError("password must contain a number")
    }else if(!new RegExp(pwdRegExp.capsCheck).test(e.target.value)){
      setPasswordError("password must contain a capital letter")
    }else if(!new RegExp(pwdRegExp.specialCharCheck).test(e.target.value)){
      setPasswordError("password must contain a special character")
    }else if((e.target.value).length<pwdRegExp.lengthCheck){
      setPasswordError("password must contain atleast 8 characters")
    }else {
      setPassword(e.target.value)
      setPasswordError("")
    }
}
function handleConfirmPasswordInput(e){
  e.preventDefault()
  if(password !== e.target.value){
    setError("password don't match");
  }else {
    setConfirmPassword(e.target.value)
    setError("")
  }
}

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };
const errorHandler = (e) => {
e.preventDefault();
setMessage("All fields must be filled");
}
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
if(name!=="" && email!=="" && password!=="" && confirmPassword!==""){
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
            <h2 className="text-center fw-bold mx-3 mb-0">SignUp Form</h2>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3">User Name</label>
            <input type="name" id="form3Example3" 
            className="form-control form-control-md" 
            onChange={handleNameInput} controlid="name" autoComplete='off'
              placeholder="Enter name" />
              <h4 style={{color:'red'}}> {nameError} </h4>    
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3">Email address</label>
            <input type="email" id="form3Example3" className="form-control form-control-lg" 
            onChange={handleEmailInput} controlid="email" autoComplete='off'
              placeholder="Enter email address" />
              <h4 style={{color:'red'}}> {emailError} </h4>    
          </div>
          <div className="form-outline mb-3"> 
          <label className="form-label" htmlFor="form3Example4">Password</label>
            <input type="password" id="form3Example4" className="form-control form-control-lg" 
            onChange={handlePasswordInput} controlid="password"
              placeholder="Enter password" required/>  
            <h4 style={{color:'red'}}> {passwordError} </h4>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3">Confirm Password</label>
            <input type="password" id="form3Example3" className="form-control form-control-lg"
             onChange={handleConfirmPasswordInput} controlid="password" autoComplete='off'
              placeholder="Enter password " required />
              <h4 style={{color:'red'}}> {error} </h4>    
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg" onClick={submitHandler}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Register</button>
            <div class="form-check d-flex justify-content-center mb-5">
<label class="form-check-label" htmlFor="form2Example3">
  Already Have an account {''} <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
</label>
</div>
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
            <h2 className="text-center fw-bold mx-3 mb-0">SignUp Form</h2>
          </div>
          <h4 style={{color:'red'}}>{message}</h4>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3">User Name</label>
            <input type="name" id="form3Example3" className="form-control form-control-md" 
            onChange={handleNameInput} controlid="name" autoComplete='off'
              placeholder="Enter name" />
              <h4 style={{color:'red'}}> {nameError} </h4>    
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3">Email address</label>
            <input type="email" id="form3Example3" className="form-control form-control-lg" 
            onChange={handleEmailInput} controlid="email" autoComplete='off'
              placeholder="Enter email address" />
              <h4 style={{color:'red'}}> {emailError} </h4>    
          </div>
          <div className="form-outline mb-3"> 
          <label className="form-label" htmlFor="form3Example4">Password</label>
            <input type="password" id="form3Example4" className="form-control form-control-lg" 
            onChange={handlePasswordInput} controlid="password"
              placeholder="Enter password" required/>  
            <h4 style={{color:'red'}}> {passwordError} </h4>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3">Confirm Password</label>
            <input type="password" id="form3Example3" className="form-control form-control-lg" 
            onChange={handleConfirmPasswordInput} controlid="password" autoComplete='off'
              placeholder="Enter password " required />
              <h4 style={{color:'red'}}> {error} </h4>    
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg" onClick={errorHandler}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Register</button>
            <div class="form-check d-flex justify-content-center mb-5">
<label class="form-check-label" htmlFor="form2Example3">
  Already Have an account {''} <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
</label>
</div>
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
   