import React, { useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import {Helmet} from "react-helmet";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'; 
import { login } from '../actions/auth';

const SignIn = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const {email, password } = formData;

  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  }

  if(isAuthenticated) {
    return <Navigate to='/' />
  }

  return (
    <div className='auth'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Real Estate | Login</title>
        <meta name='description' content='Login Page' />
      </Helmet>
      <h1 className='auth__title'>Sign In</h1>
      <p className='auth__lead'>Sign into your Account</p>

      <form className='auth__form' onSubmit={e => onSubmit(e)}>
          <div className='auth__form__group'>
            <input 
              className='auth__form__input'
              type='email'
              name='email' 
              placeholder='Email'
              onChange={e => onChange(e)}
              value={email}
              required
            />
          </div>
          <div className='auth__form__group'>
            <input 
              className='auth__form__input'
              type='password'
              name='password' 
              placeholder='Password'
              onChange={e => onChange(e)}
              value={password}
              required
              minLength='6'
            />
          </div>

          <button type='submit' className='auth__form__button'>Login</button>
      </form>
      <p className='auth__authtext'>
        Don't have an account? 
        <Link className='auth__authtext__links' to='/signup'> Register</Link>
      </p>
    </div>
  )
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(SignIn);