import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const emailRegExp = /\S+@\S+\.\S+/;
  const pwdRegExp = {
   numCheck: /[0-9]/,
   capsCheck:/[A-Z]/,
   specialCharCheck:/[!@#$%^&*]/,
   lengthCheck: 8,
 };
const [error, setError] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

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

  const submitHandler = async (e) => {
    e.preventDefault();
    if(email.length === 0 || password.length === 0){
      setError(true);
      return;
      }
    try {
      const { data } = await Axios.post('/api/users/signin', {
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

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <section className="vh-100" style={{backgroundColor: '#eee'}}>
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="divider d-flex align-items-center my-4">
            <h2 className="text-center fw-bold mx-3 mb-0">Login Form</h2>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form3Example3">Email address</label>
            <input type="email" id="form3Example3" 
            className="form-control form-control-lg" 
            onChange={handleEmailInput} controlId="email"
              placeholder="Enter email address" autoComplete='off' />
              <h4 style={{color:'red'}}> {emailError} </h4>
              {error && email<=0? 
              <label style={{color:'red'}}>Email can't be empty</label> : "" }
          </div>
          <div className="form-outline mb-3"> 
          <label className="form-label" for="form3Example4">Password</label>
            <input type="password" id="form3Example4" 
            className="form-control form-control-lg" 
            onChange={handlePasswordInput} controlId="password"
              placeholder="Enter password" />
              <h4 style={{color:'red'}}> {passwordError} </h4>
              {error && password<=0? 
              <label style={{color:'red'}}>password can't be empty</label> : "" }
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg" onClick={submitHandler}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              Don't have an account? 
              <Link to={`/signup?redirect=${redirect}`}
                className="link-danger">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
</Container>
  );
}