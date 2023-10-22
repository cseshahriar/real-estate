import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { setAlert } from '../actions/alert'
import { signup } from '../actions/auth'
import PropTypes from 'prop-types'

const SignUp = ({setAlert, signup, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const {name, email, password, password2 } = formData;

  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    if(password !== password2) {
      setAlert('Password do not match', 'error');
    } else {
      signup({ name, email, password, password2 });
    }
  }

  if(isAuthenticated) {
    return <Navigate to='/' />
  }
  
  return (
    <div className='auth'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Real Estate | Sign Up</title>
        <meta name='description' content='Sign Up Page' />
      </Helmet>
      <h1 className='auth__title'>Sign Up</h1>
      <p className='auth__lead'>Create your Account</p>

      <form className='auth__form' onSubmit={e => onSubmit(e)}>
          <div className='auth__form__group'>
            <input 
              className='auth__form__input'
              type='text'
              name='name' 
              placeholder='Name'
              onChange={e => onChange(e)}
              value={name}
              required
            />
          </div>

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
          <div className='auth__form__group'>
            <input 
              className='auth__form__input'
              type='password'
              name='password2' 
              placeholder='Password Confirmation'
              onChange={e => onChange(e)}
              value={password2}
              required
              minLength='6'
            />
          </div>

          <button className='auth__form__button'>Register</button>
      </form>
      <p className='auth__authtext'>
        Did you have an account? 
        <Link className='auth__authtext__links' to='/login'> Login</Link>
      </p>
    </div>
  )
}

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, signup})(SignUp);