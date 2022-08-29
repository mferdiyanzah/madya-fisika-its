import axios from 'axios'
import React, { useState, useEffect } from 'react'
import dateFormat from '../helpers/dateFormat'
import Image from 'next/image'


const DashboardPraktikan = ({ dataPraktikan }) => {
  const nilai = dataPraktikan.nilai.sort((a, b) => a.praktikum.minggu - b.praktikum.minggu)
  

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-4 text-center'>
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
                <th scope='row' className='w-50'>NRP</th>
                <td>{dataPraktikan?.nrp}</td>
              </tr>
              <tr>
                <th scope='row'>Nama Lengkap</th>
                <td>{dataPraktikan?.nama_lengkap}</td>
              </tr>
              <tr>
                <th scope='row'>Kelompok Praktikum Elektronika</th>
                <td>{dataPraktikan.praktikan_elka ? dataPraktikan.praktikan_elka.kode_kelompok: '-'}</td>
              </tr>
              <tr>
                <th scope='row'>Kelompok Praktikum Fisika Laboratorium 1</th>
                <td>{dataPraktikan.praktikan_fislab ? dataPraktikan.praktikan_fislab.kode_kelompok : '-'}</td>
              </tr>
            </tbody> 
          </table>
        </div>

        <div className='col-12 mt-4'>
          <div className='table-responsive-md'>
            <table className='table table-striped table-bordered align-middle text-center'>
              <thead>
                <tr>
                  <th scope='row' className='fs-4' colSpan='7'>Daftar Praktikum</th>
                </tr>
                <tr className='align-middle'>
                  <th scope='col'>Nama Praktikum</th>
                  <th scope='col'>Minggu Praktikum</th>
                  <th scope='col'>Nama Asisten</th>
                  <th scope='col'>Kontak Asisten</th>
                  <th scope='col'>Jadwal Praktikum</th>
                  <th scope='col'>Modul</th>
                  <th scope='col'>Nilai</th>
                </tr>
              </thead>
              <tbody>
              {nilai?.map((prak, id) => 
                <tr key={prak.id}>
                  
                  <td>{prak.praktikum.judul_praktikum.nama_praktikum} ({prak.praktikum.kode_judul_praktikum})</td>
                  <td>{prak.praktikum.minggu}</td>
                  <td>{prak.aslab.nama_lengkap}</td>
                  <td>{prak.aslab.kontak}</td>
                  <td>{prak.praktikum.id_sesi === 1 ? <>Belum diatur</> : dateFormat(prak.praktikum.waktu_praktikum.waktu)}</td>
                  <td><a  target="_blank" rel="noopener noreferrer" href={prak.praktikum.judul_praktikum.modul}><button className='btn btn-info text-white'>View</button></a></td>
                  <td>{prak.nilai_akhir === 0 ? 'Belum Dinilai' : prak.nilai_akhir} </td>
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