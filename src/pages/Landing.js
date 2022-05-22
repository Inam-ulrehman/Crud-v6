import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>
      <h1 className='title'>Landing page</h1>
      <div className='btn-container'>
        <Link to={'register'} className='btn'>
          Login/Register
        </Link>
      </div>
    </div>
  )
}

export default Landing
