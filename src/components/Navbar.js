import { React } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { logOutUser, toggleBar } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // logOut User

  const handleLogOut = () => {
    dispatch(logOutUser())
    navigate('/')
    toast.success('Successfully sign Out', {
      position: toast.POSITION.BOTTOM_CENTER,
    })
  }

  // handleBar

  const handleBar = () => {
    dispatch(toggleBar())
  }
  return (
    <Wrapper>
      <div className='menu'>
        <button type='button' onClick={handleBar}>
          Menu
        </button>
      </div>
      <div className='dashboard'>
        <h3>Dashboard</h3>
      </div>
      <div className='user'>
        <p>Hello, {user.name}</p>
        <button type='button' className='btn' onClick={handleLogOut}>
          Sign Out
        </button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  .user {
    p {
      margin: 0;
    }
  }
`
export default Navbar
