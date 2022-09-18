import React from 'react'
import {useRouter} from 'next/router'
import {PrismaClient} from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'
import Navbar from '../../../components/Navbar'
import NilaiPraktikan from '../../../components/NilaiPraktikan'
import dateFormat from '../../../helpers/dateFormat'
import { useState } from 'react'
import Select from 'react-select'
import { useEffect } from 'react'
import Head from 'next/head'
import Footer from '../../../components/Footer'
import Swal from 'sweetalert2'
import axios from 'axios'
import Image from 'next/image'
import loadingGif from '../../../images/mini_loading.gif'
import Loading from '../../../components/Loading'
import Jadwal from '../../../components/Jadwal'


export const getServerSideProps = async (context) => {
    const idPraktikum = context.query.id_praktikum
    const prisma = new PrismaClient()
    const session = await getSession(context)
    const aslab = await prisma.aslab.findFirst({
        where: {
            email: session?.user.email
        }
    })

    const praktikum = await prisma.praktikum.findFirst({
        where: {
            id: parseInt(idPraktikum),
        },
        include: {
            aslab: true,
            nilai: {
                orderBy: {
                    nrp: 'asc'
                },
                include: {
                    praktikan: true
                }
            },
            waktu_praktikum: true
        }
    })

    const sesi = await prisma.sesi.findMany({
        where: {
            minggu: praktikum.minggu,
            NOT: {
                id: 1,
            }
        },
        include: {
            praktikum: true
        }
    })

    return {
        props: {
            praktikum: JSON.parse(JSON.stringify(praktikum)),
            aslab: aslab,
            sesi: JSON.parse(JSON.stringify(sesi))
        }
    }
}

const Detail = ({aslab, praktikum, sesi}) => {
    const router = useRouter()
    const [showUpdateJadwal, setShowUpdateJadwal] = useState(false)
    const [option, setOption] = useState([])
    const {data, status} = useSession()
    const [idSesi, setIdSesi] = useState()
    const [loading, setLoading] = useState(false)
    
    if(!data && status !== 'loading') router.push('/')
    if(!aslab) router.push('/praktikan')

    let availSession
    if (aslab.kode_aslab.includes('P')) {
        availSession = sesi.filter(s => s.praktikum.length < 3 && s.praktikum.filter(p => p.kode_aslab.includes('P')).length < 2 ).sort((a, b) => new Date(a.waktu) - new Date(b.waktu))
    } else {
        availSession = sesi.filter(s => s.praktikum.length < 3).sort((a, b) => new Date(a.waktu) - new Date(b.waktu))
    }
    
    useEffect(() => {
        let newOption = []
        availSession.map(sess => {
            const newSession = {
                value: sess.id,
                label: dateFormat(sess.waktu)
            }
            newOption.push(newSession)
        })
        setOption(newOption)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const title = `Detail Kelompok ${praktikum.kode_kelompok} | Laboratorium Fisika Madya ITS`

    const updateSesi = e => {
        e.preventDefault()
        setLoading(true)
        data = {
            id: praktikum.id,
            id_sesi: idSesi
        }
        axios.post('/api/aslab/set_jadwal', data)
            .then(() => {
                Swal.fire({
                    text: 'Jadwal telah diperbarui',
                    icon: 'success'
                })
                setLoading(false)
                router.reload()
            })
            .catch(err => {
                Swal.fire({
                    text: err,
                    icon: 'error'
                })
                setLoading(false)
            })
    }

    if(status === 'loading') return <Loading/>
    else if (praktikum.aslab.email !== data.user.email) return <h3 className='text-center'>Anda tidak berhak mengakses halaman ini</h3>
    else{
        return (
            <div>
                <Head>
                    <title>{title}</title>
                </Head>
                <Navbar nama_lengkap={aslab.nama_lengkap} />
                <div className='container p-2'>
                    <h2>Kelompok {praktikum.kode_kelompok}</h2>
                    <hr/>
                    <div>
                        <h5>Jadwal Praktikum:</h5> {
                        praktikum.id_sesi === 1 
                            ? <>Anda Belum Mengatur Jadwal <button className='btn btn-primary' onClick={() => setShowUpdateJadwal(!showUpdateJadwal)}>Atur Sekarang</button></>
                            : <>{dateFormat(praktikum.waktu_praktikum.waktu)} <button className='btn btn-primary' onClick={() => setShowUpdateJadwal(!showUpdateJadwal)}>Ganti Jadwal</button></>
                        }

                        {showUpdateJadwal &&
                            <div> 
                                <form className='row' onSubmit={updateSesi}>
                                    <div className="my-2 col col-md-6">
                                        <label htmlFor="nama_lengkap" className="form-label">Pilih Sesi</label>
                                        <Select placeholder={praktikum.id_sesi === 1 ? 'Silahkan Pilih' : dateFormat(praktikum.waktu_praktikum.waktu)} options={option} onChange={e => setIdSesi(e.value)} />
                                        <button type='submit' className='btn btn-secondary my-2'>{loading ? <Image src={loadingGif} width="20" height="20" alt='loading'/> : 'Update Jadwal'}</button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                    <hr/>
                    
                    <h5>Data Praktikan</h5>
                    {praktikum.nilai.map(prak => 
                        <NilaiPraktikan key={prak.id} data={prak} />
                    )}
                    <hr/>
                </div>
    
                <Footer/>       
            </div>
        )
    }
}

export default Detail