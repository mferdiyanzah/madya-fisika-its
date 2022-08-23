import axios from 'axios'
import React, { useState, useEffect } from 'react'
import dateFormat from '../helpers/dateFormat'
import Image from 'next/image'


const DashboardPraktikan = ({ dataPraktikan }) => {
  const [praktikum, setPraktikum] = useState()

  useEffect(() => {
    axios.get('/api/praktikan/get_praktikum?kode_kelompok='+dataPraktikan.kode_kelompok)
      .then(res => {
        setPraktikum(res.data)
        console.log(res.data)
      })
      .catch(e => console.log(e))

  }, [dataPraktikan])

  const nilai = dataPraktikan.nilai
  
  const jenisPraktikum = dataPraktikan.kode_kelompok.includes('ELKA') ? 'Elektronika' : 'Fisika Laboratorium 1'

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-2 text-center'>
          <Image src={`https://ik.imagekit.io/madyafisikaits/${dataPraktikan.nrp}.jpg`} className='img-thumbnail' alt="foto profil" width="150" height="225" />
        </div>
        <div className='col-md-6'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='row' colSpan='2' className='fs-4'>Profil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>NRP</th>
                <td>{dataPraktikan?.nrp}</td>
              </tr>
              <tr>
                <th scope='row'>Nama Lengkap</th>
                <td>{dataPraktikan?.nama_lengkap}</td>
              </tr>
              <tr>
                <th scope='row'>Praktikum</th>
                <td>{jenisPraktikum}</td>
              </tr>
              <tr>
                <th scope='row'>Kelompok</th>
                <td>{dataPraktikan.kode_kelompok}</td>
              </tr>
            </tbody> 
          </table>
        </div>

        <div className='col-12 mt-4'>
          <div className='table-responsive-md'>
            <table className='table table-striped table-bordered align-middle text-center'>
              <thead>
                <tr>
                  <th scope='row' className='fs-4' colSpan='5'>Daftar Praktikum</th>
                </tr>
                <tr className='align-middle'>
                  <th scope='col'>Nama Praktikum</th>
                  <th scope='col'>Nama Asisten</th>
                  <th scope='col'>Kontak Asisten</th>
                  <th scope='col'>Jadwal Praktikum</th>
                  <th scope='col'>Modul</th>
                  <th scope='col'>Nilai</th>
                </tr>
              </thead>
              <tbody>
                { !praktikum && 
                  <tr>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                  </tr> 
                }
              {praktikum && praktikum?.map((prak, id) => 
                <tr key={prak.id}>
                  
                  <td>{prak.judul_praktikum.nama_praktikum}</td>
                  <td>{prak.aslab.nama_lengkap}</td>
                  <td>{prak.aslab.kontak}</td>
                  <td>{prak.waktu_praktikum.id === 1 ? <>Belum diatur</> : dateFormat(prak.waktu_praktikum.waktu)}</td>
                  <td><a href={prak.judul_praktikum.modul}><button className='btn btn-info text-white'>View</button></a></td>
                  <td>{nilai[id].nilai_akhir === 0 && <>Belum Dinilai</>} {nilai[id].nilai_akhir !== 0 && <>{nilai[id].nilai_akhir}</>} </td>
                </tr>
                )
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPraktikan