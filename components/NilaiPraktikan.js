import Image from 'next/image'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import axios from 'axios';
import loadingGif from '../images/mini_loading.gif'
import noImage from '../images/no-image-icon.png'
import ImageWithFallback from './ImageWithFallback';

const NilaiPraktikan = ({data}) => {
    const { register, handleSubmit, getValues  } = useForm()

    const [nilaiTotal, setNilaiTotal] = useState()
    const [disabled, setDisabled] = useState(true)
    const [nilaiAkhir, setNilaiAkhir] = useState(data.nilai_akhir)
    const [loading, setLoading] = useState(false)

    const hitungNilaiAkhir = () => {
        const nilai = getValues()
        const nilaiPost = ((nilai.pendahuluan*0.06)+(nilai.metodologi*0.06)+(nilai.hasil_diskusi*0.25)+(nilai.kesimpulan*0.15)+(nilai.format*0.13)+(nilai.post_lab*0.2)+(nilai.ketepatan_waktu*0.5)+(nilai.abstrak*0.1))
        const nilaiAkhirTemp = (parseInt(nilai.prelab) * 2) + (parseInt(nilai.inlab) * 2) + (nilaiPost * 6)
        setNilaiAkhir(nilaiAkhirTemp.toFixed(2))
        setNilaiTotal(getValues())
    }
 
    const updateScore = () => {
        setLoading(true)
        setNilaiTotal({...nilaiTotal, id: data.id, nilai_akhir: nilaiAkhir})
        axios.post('/api/aslab/update_nilai', nilaiTotal)
            .then(() => {
                Swal.fire({
                    text: `Nilai ${data.praktikan.nama_lengkap} telah diperbarui`,
                    icon: 'success'
                })
                setLoading(false)
            })
            .catch(e => {
                Swal.fire({
                    text: e,
                    icon: 'error'
                })
                setLoading(false)
            })
    }

    return (
        <div className='border border-1 my-3 p-2'>
            <div className='row'>
                <div className='col-md-2'>
                    <ImageWithFallback src={`https://ik.imagekit.io/madyafisikaits/${data.nrp}.jpg`} fallbackSrc={noImage} />
                </div>
                <div className='col-md-6'>
                    <table className='table table-striped'>
                        <thead>
                        <tr>
                            <th scope='row' colSpan='2' className='fs-6'>Profil</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope='row'>NRP</th>
                            <td>{data.praktikan.nrp}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Nama Lengkap</th>
                            <td>{data.praktikan.nama_lengkap}</td>
                        </tr>
                        </tbody> 
                    </table>
                </div>
            </div>
            <form onSubmit={handleSubmit(updateScore)}>
                <div className='row'>
                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label">Nilai Pre-Lab</label>
                        <input className='form-control' defaultValue={data.prelab} disabled={disabled} {...register("prelab")} />
                        <div id="emailHelp" className="form-text">Masukkan angka dari 1-10</div>
                    </div>


                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label">Nilai In-Lab</label>
                        <input className='form-control' defaultValue={data.inlab} disabled={disabled} {...register("inlab")} />
                        <div id="emailHelp" className="form-text">Masukkan angka dari 1-10</div>
                    </div>

                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label">Nilai Abstrak</label>
                        <input className='form-control' defaultValue={data.abstrak} disabled={disabled} {...register("abstrak")} />
                        <div id="emailHelp" className="form-text">Masukkan angka dari 1-10</div>
                    </div>

                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label">Nilai Pendahuluan</label>
                        <input className='form-control' defaultValue={data.pendahuluan} disabled={disabled} {...register("pendahuluan")} />
                        <div id="emailHelp" className="form-text">Masukkan angka dari 1-10</div>
                    </div>

                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label">Nilai Metodologi</label>
                        <input className='form-control' defaultValue={data.metodolofi} disabled={disabled} {...register("metodologi")} />
                        <div id="emailHelp" className="form-text">Masukkan angka dari 1-10</div>
                    </div>

                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label">Nilai Hasil Diskusi</label>
                        <input className='form-control' defaultValue={data.metodologi} disabled={disabled} {...register("hasil_diskusi")} />
                        <div id="emailHelp" className="form-text">Masukkan angka dari 1-10</div>
                    </div>

                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label">Nilai Kesimpulan</label>
                        <input className='form-control' defaultValue={data.metodologi} disabled={disabled} {...register("kesimpulan")} />
                        <div id="emailHelp" className="form-text">Masukkan angka dari 1-10</div>
                    </div>

                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label">Nilai Format</label>
                        <input className='form-control' defaultValue={data.metodologi} disabled={disabled} {...register("format")} />
                        <div id="emailHelp" className="form-text">Masukkan angka dari 1-10</div>
                    </div>

                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label">Nilai Post-Lab</label>
                        <input className='form-control' defaultValue={data.metodologi} disabled={disabled} {...register("post_lab")} />
                        <div id="emailHelp" className="form-text">Masukkan angka dari 1-10</div>
                    </div>

                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label">Ketepatan Waktu</label>
                        <input className='form-control' defaultValue={data.ketepatan_waktu} disabled={disabled} {...register("ketepatan_waktu")} />
                        <div id="emailHelp" className="form-text">Masukkan angka 1 atau 0</div>
                    </div>

                    <div className="col-6 col-md-2 my-2">
                        <label htmlFor="nama_lengkap" className="form-label text-danger">Nilai Akhir</label>
                        <input className='form-control' value={nilaiAkhir} disabled={true}/>
                    </div>

                </div>
                

                <button type='button' className='btn btn-secondary my-2' onClick={() => setDisabled(false)}>Ubah Nilai</button>
                {!disabled && 
                    <>
                        <button type='button' onClick={hitungNilaiAkhir} className='btn btn-info text-white my-2 ms-3'>Hitung Nilai Akhir</button>
                        <button type='submit' className='btn btn-danger my-2 ms-3'>{!loading && <>Update Nilai</>}{loading && <Image src={loadingGif} width="20" height="20" alt='loading'/>}</button>
                        <button type='button' onClick={() => setDisabled(true)} className='btn btn-close my-2 ms-3'></button>
                    </>
                }
            </form>
        </div>
    )
}

export default NilaiPraktikan