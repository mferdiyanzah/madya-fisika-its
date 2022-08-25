import { ErrorMessage } from '@hookform/error-message'
import React from 'react'

const RenderError = ({name, errors}) => {
  return (
    <ErrorMessage 
        name={name}
        errors={errors}
        render={({ messages }) => {
            return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p className='form-text text-danger' key={type}>{message}</p>
                ))
            : null;
        }}
    />
  )
}

export default RenderError