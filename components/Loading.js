import React from 'react'

const Loading = () => {
  return (
    <div className='body-container d-flex justify-content-center align-items-center'>
      <div className="card-login p-4 border border-2 rounded-3 shadow">
          <div className="logo-login text-black mb-4 border-bottom border-dark py-2">
              <span>LABORATORIUM FISIKA MADYA</span>
              <span>DEPARTEMEN FISIKA ITS</span>
          </div>
          <div className='text-center align-middle'>
            Loading...
          </div>
      </div>
    </div>
  )
}

export default Loading