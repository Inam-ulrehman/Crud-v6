import React from 'react'
import { NavLink } from 'react-router-dom'
import { links } from '../utils/data'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { toggleBar } from '../features/user/userSlice'

const Mainbar = () => {
  const dispatch = useDispatch()

  //  handle closeModel

  const handleLink = (e) => {
    dispatch(toggleBar())
  }

  return (
    <Wrapper className='modal-container'>
      <div className='modal'>
        {links.map((item) => {
          const { id, path, text } = item

          return (
            <NavLink onClick={handleLink} key={id} to={path}>
              {text}
            </NavLink>
          )
        })}
        <button className='close-btn' onClick={handleLink}>
          X
        </button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
  .modal {
    display: flex;
    flex-direction: column;
    place-content: center;
    position: relative;
    a {
      padding: 1rem;
    }
  }
  .close-btn {
    position: absolute;
    top: 10px;
    border: transparent;
    background-color: transparent;
    font-size: 2rem;
    color: red;
    cursor: pointer;
  }
`

export default Mainbar
