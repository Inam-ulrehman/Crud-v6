import React from 'react'
import { Outlet } from 'react-router-dom'
import { Mainbar, Navbar, Sidebar } from '../../components'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const SharedLayout = () => {
  const { barOpen } = useSelector((state) => {
    return state.user
  })
  return (
    <Wrapper>
      <div className='container'>
        <div className='BOX-1'>
          {barOpen && <Mainbar />}
          {!barOpen && <Sidebar />}
        </div>

        <div className='box-2 section'>
          <div>
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .container {
    display: flex;
  }
`

export default SharedLayout
