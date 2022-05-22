import React from 'react'
import { NavLink } from 'react-router-dom'
import { links } from '../utils/data'
import styled from 'styled-components'

const Sidebar = () => {
  return (
    <Wrapper>
      {links.map((item) => {
        const { id, path, text } = item

        return (
          <NavLink className='side-link' key={id} to={path}>
            {text}
          </NavLink>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  @media (max-width: 992px) {
    display: none;
  }
  display: flex;
  flex-direction: column;
  height: 100%;
  position: sticky;
  margin-top: 5rem;
  width: 200px;
  padding-top: 15px;
  .side-link {
    transition: var(--transition);
    padding-top: 1.2rem;
    padding-left: 1rem;
    :hover {
      background-color: var(--grey-2);
      padding-left: 1.3rem;
    }
  }
`

export default Sidebar
