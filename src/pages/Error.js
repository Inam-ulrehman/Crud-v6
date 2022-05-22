import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <h2 className='title'>404 PAGE NOT FOUND...</h2>
      <div className='btn-container'>
        <Link to={'/'} className='btn '>
          Back to home page
        </Link>
      </div>
    </div>
  )
}

export default Error
