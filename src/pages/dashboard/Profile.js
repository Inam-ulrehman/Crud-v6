import { React, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { FormRow } from '../../components'
import { getProfileUpdate } from '../../features/user/userSlice'

const Profile = () => {
  const { user } = useSelector((state) => {
    return state.user
  })
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    location: user?.location || '',
  })

  //  onSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, lastName, email, location } = userData
    if (!email || !name || !lastName || !location) {
      toast.warn('Please fill in all the details...')
      return
    }
    return dispatch(getProfileUpdate({ name, lastName, email, location }))
  }

  // onChange
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({ ...userData, [name]: value })
  }
  return (
    <Wrapper className='section page'>
      <h3 className='title'>Update your profile</h3>
      <div className='title-underline'></div>
      <form className='form' onSubmit={handleSubmit}>
        {/* name input */}
        <FormRow
          name='name'
          type='text'
          value={userData.name}
          handleChange={handleChange}
        />
        {/* lastName input */}
        <FormRow
          name='lastName'
          labelText='Last Name'
          type='text'
          value={userData.lastName}
          handleChange={handleChange}
        />
        {/* email input */}
        <FormRow
          name='email'
          type='email'
          value={userData.email}
          handleChange={handleChange}
        />
        {/* location input */}
        <FormRow
          name='location'
          type='text'
          value={userData.location}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          Update
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .form {
    margin-top: 1rem;
  }
`

export default Profile
