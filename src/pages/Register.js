import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import FormRow from '../components/FormRow'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getRegisterUser, getLoggedInUsers } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
}
const Register = () => {
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading } = useSelector((state) => state.user)

  // handle Submit
  const handleSubmit = (e) => {
    const { name, email, password, isMember } = values
    e.preventDefault()
    if (!email || !password || (!isMember && !name)) {
      return toast.error('Please fill all details', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    if (isMember) {
      return dispatch(getLoggedInUsers({ email, password }))
    }
    return dispatch(getRegisterUser({ name, email, password }))
  }

  // handle onChange

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  //  handle toggle

  const handleToggle = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line
  }, [user])
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3 className='title'>{values.isMember ? 'Login' : 'Register'}</h3>

        {/* name input */}
        {!values.isMember && (
          <FormRow
            className='form-input'
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          className='form-input'
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          className='form-input'
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? 'Are you register ? ' : 'Are you member ? '}

          <button type='button' className='toggleButton' onClick={handleToggle}>
            {values.isMember ? 'Register...' : 'Login...'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .toggleButton {
    border: transparent;
    background-color: transparent;
    cursor: pointer;
    color: var(--primary-6);
  }
`
export default Register
