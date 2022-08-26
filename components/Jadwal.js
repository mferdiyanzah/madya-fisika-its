import React from 'react'
import dateFormat from '../helpers/dateFormat'

const Jadwal = ({sesi}) => {
    if(sesi.praktikum.length > 0) sesi.praktikum.map(s => console.log(s.kode_kelompok))
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