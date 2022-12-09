import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState(userInfo.email);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const nameRegExp  = /^[A-z][A-z0-9-_]{3,23}$/;
  const emailRegExp = /[a-zA-Z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,8}(.[a-z]{2,8}])/g;
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
     }else if(!new RegExp(nameRegExp).test(e.target.value)){
       setNameError("name can contain only [a-z]")
     }else if((e.target.value).length<3 || (e.target.value).length>23){
       setNameError("name must be min 3 and max 23 characters")
     }  else{
       setName(e.target.value);
       setNameError("")
     }
    
 }
   function handleEmailInput(e){
     e.preventDefault()
     if(e.target.value === ""){
       setEmailError("email must be filled");
     }else if(!new RegExp(emailRegExp).test(e.target.value)){
       setEmailError("email format is invalid")
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
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };

  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlid="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={handleNameInput}
            required
          />
          <h4 style={{color:'red'}}> {nameError}  </h4>
        </Form.Group>
        <Form.Group className="mb-3" controlid="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailInput}
            required
          />
            <h4 style={{color:'red'}}> {emailError} </h4>
        </Form.Group>
        <Form.Group className="mb-3" controlid="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handlePasswordInput}
          />
           <h4 style={{color:'red'}}> {passwordError} </h4>
        </Form.Group>
        <Form.Group className="mb-3" controlid="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleConfirmPasswordInput}
          />
           <h4 style={{color:'red'}}> {error} </h4>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}
