import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'

const Error = () => {
  return (
    <div className='body-container d-flex justify-content-center align-items-center text-center'>
        <Head>
            <title>Error</title>
        </Head>
        <h4>Email anda tidak terdaftar, silahkan login dengan menggunakan email yang telah anda masukkan ke list kemaarin! <br/><a onClick={(e) => {
                            e.preventDefault()
                            signOut({ callbackUrl: '/' })
                            }
                        } href='#' >Login Kembali</a></h4>
    </div>
  )
}

export default Error