import React from 'react'

const FormRow = ({ name, type, value, handleChange, labelText }) => {
  return (
    <div>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        className='form-input'
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default FormRow
