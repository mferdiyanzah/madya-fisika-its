import React from 'react'
import _ from 'lodash'
import dateFormat from '../helpers/dateFormat'
import Link from 'next/link'
import Loading from './Loading'

const DashboardAslab = ({nama_lengkap, elka, fislab}) => {

    if(elka.length === 0 && fislab.length === 0) return <>Loading...</>
    
    const allPrak = elka.concat(fislab).sort((a,b) => a.minggu - b.minggu)

    return (
    <div className='container h-100'>
        <div className='row'>
            <div className='col-md-8'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='row' colSpan='2' className='fs-4'>Profil</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row' className='w-50'>Nama Lengkap</th>
                            <td className='w-50'>{nama_lengkap}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Kelompok Elektronika</th>
                            <td>{elka.length > 0 ? <>{elka?.map(prak => prak.kode_kelompok).join(', ')}</> : '-'}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Kelompok Fisika Laboratorium 1</th>
                            <td>{fislab.length > 0 ? <>{fislab?.map(prak => prak.kode_kelompok).join(', ')}</> : '-'}</td>
                        </tr>
                    </tbody> 
                </table>
            </div>
        </div>

        <Link href={`/aslab/rekapitulasi_nilai`}><button className='btn btn-info text-white mb-4'>Rekapitulasi Nilai</button></Link>

        <div className='table-responsive-md'>
            <table className='table table-striped table-bordered align-middle text-center'>
            <thead>
                <tr>
                    <th scope='row' className='fs-4' colSpan='5'>Daftar Praktikum</th>
                </tr>
                <tr className='align-middle'>
                    <th scope='col' className='w-25'>Kode Kelompok</th>
                    <th scope='col' className='w-25'>Judul Praktikum</th>
                    <th scope='col' className='w-25'>Minggu Praktikum ke-</th>
                    <th scope='col' className='w-25'>Jadwal Praktikum</th>
                    <th scope='col' className='w-25'>Detail</th>
                </tr>
            </thead>
            <tbody>
            {
                allPrak.map(prak =>
                    <tr key={prak.id}>
                        <td>{prak.kode_kelompok}</td>
                        <td>{prak.judul_praktikum.nama_praktikum}</td>
                        <td>{prak.minggu}</td>
                        <td>{prak.waktu_praktikum.id === 1 ? 'Belum Diatur' : dateFormat(prak.waktu_praktikum.waktu)}</td>
                        <td><Link href={`/aslab/details?id_praktikum=${prak.id}`}><button className='btn btn-dark'>Detail</button></Link></td>
                    </tr>
                )
            }
            </tbody>
            </table>
        </div>
    </div>
  )
}
export default DashboardAslab