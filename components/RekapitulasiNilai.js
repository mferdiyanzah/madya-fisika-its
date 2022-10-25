import React from 'react'
import Link from 'next/link'

const RekapitulasiNilai = ({kumpulan_nilai}) => {
    const nilai = kumpulan_nilai.sort((a,b) => a.minggu - b.minggu)

    return (
        <div className='container h-100'>
            <h2 className='my-2'>Rekapitulasi Nilai</h2>
            <hr/>
            <div className='table-responsive-md my-3'>
            {nilai.map(n => 
                <div>
                    <h4>{n.kode_kelompok} --- Minggu Praktikum {n.minggu} <Link href={`/aslab/details?id_praktikum=${n.id}`}><button className='btn btn-dark'>Detail</button></Link></h4>
                    <table className='table table-bordered align-middle text-center'>
                        <thead>
                            <tr className='align-middle'>
                                <th scope='col' className='w-25'>NRP</th>
                                <th scope='col' className='w-50'>Nama Lengkap</th>
                                <th scope='col' className='w-50'>Nilai Akhir</th>
                            </tr>
                        </thead>
                        <tbody>
                        {n.nilai.map(ni => 
                        <tr key={ni.id}>
                            <td>{ni.praktikan.nrp}</td>
                            <td>{ni.praktikan.nama_lengkap}</td>
                            <td>{Number(ni.nilai_akhir).toFixed(2)}</td>
                        </tr>
                        )}
                        </tbody>
                    </table>
                    
                </div>
            )}
            </div>
        </div>
    )
}

export default RekapitulasiNilai