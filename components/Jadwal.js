import React from 'react'
import dateFormat from '../helpers/dateFormat'

const Jadwal = ({sesi}) => {
  return (
    <li className='my-2 p-2 col-md-6'>
        <h6>{dateFormat(sesi.waktu)}</h6>
            <ul>
                {sesi.praktikum.map(prak => (
                    <li key={prak.id}>{prak.kode_kelompok} ({prak.kode_aslab})</li>
                ))}
            </ul>
    </li>
  )
}

export default Jadwal