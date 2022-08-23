import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import Cookies from 'js-cookie'

const Navbar = ({ nama_lengkap }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-between">
            <div className="navbar-brand">
                <span>LABORATORIUM FISIKA MADYA</span>
                <span>DEPARTEMEN FISIKA ITS</span>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo01">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className='active nav-link'>Selamat Datang, {nama_lengkap}. </span>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={(e) => {
                            e.preventDefault()
                            Cookies.remove('role')
                            signOut({ callbackUrl: '/' })
                            }
                        } href="#">Sign Out</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar