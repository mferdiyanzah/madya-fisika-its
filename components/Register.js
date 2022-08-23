import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import loadingGif from '../images/mini_loading.gif'
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import noImage from '../images/no-image-icon.png'
import ImageKit from 'imagekit';

const Register = ({ kelompok }) => {
    const session = useSession()
    const router = useRouter()
    const { register, handleSubmit } = useForm()

    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()


    useEffect(() => {
        if(!selectedFile){
            setPreview(undefined)
            return
        }
        
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        console.log(selectedFile)
        return () => URL.revokeObjectURL(objectUrl)
        

    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }


    const createNewPraktikan = data =>{
        setLoading(true)
        const email =  session.data.user.email
        data["email"] = email

        const imageKit = new ImageKit({
            urlEndpoint: 'https://ik.imagekit.io/madyafisikaits/',
            publicKey: 'public_bg1FT1zKR6sX5pXdwyl8PkDT9uA=',
            privateKey: process.env.NEXT_PUBLIC_IMAGEKIT
        })

        imageKit.upload({
            file: selectedFile,
            fileName: `${data.nrp}.jpg`,
            useUniqueFileName: false
        })
        axios.post('/api/praktikan', data)
            .then(() => {
                Swal.fire({
                    text: 'Data anda telah sukses terbarui',
                    icon: 'success'
                })
                router.reload()
            })
            .then(err => setLoading(err))
    }

    return (
        <div className="container my-4">
            <h4>Silahkan isi data terlebih dahulu</h4>
            <form className='col-md-4' onSubmit={handleSubmit(createNewPraktikan)}>
                <div className="my-2">
                    <label htmlFor="nama_lengkap" className="form-label">Email</label>
                    <input className='form-control' value={session.data.user.email} disabled={true} />
                </div>

                <div className="my-2">
                    <label htmlFor="nama_lengkap" className="form-label">Nama Lengkap</label>
                    <input className='form-control' {...register("nama_lengkap", { required: true })} />
                </div>

                <div className="my-2">
                    <label htmlFor="nama_lengkap" className="form-label">NRP</label>
                    <input className='form-control' type="number" {...register("nrp", { required: true })} />
                </div>

                <div className="my-2">
                    <label htmlFor="nama_lengkap" className="form-label">Kode Kelompok</label>
                    <select className='form-control text-black' {...register("kode_kelompok", { required: true })}>
                        {kelompok.map((kel, id) => <option value={kel.kode} key={id}>{kel.kode}</option>
                        )}
                    </select>
                </div>

                <div className="my-2">
                    <label>Foto Formal 4x6</label>
                    <div className="input-group custom-file-button">
                        <label className="input-group-text" htmlFor="inputGroupFile">Upload file</label>
                        <input type="file" className="form-control" id="inputGroupFile" onChange={onSelectFile}/>
                    </div>
                    <div id="emailHelp" className="form-text">Ukuran maksimal 500kb dengan rasio 4x6</div>
                    <div className='image-preview'>
                        {!selectedFile && <Image className='img-responsive' width='150' height='200' src={noImage} alt="preview image" />}
                        {selectedFile && <Image className='img-responsive' width='150' height='200' src={preview} alt="preview image" />}
                    </div>
                </div>

                <button type='submit' className='my-2 btn btn-primary'>{!loading && <>Submit</>}{loading && <Image src={loadingGif} width="20" height="20" alt='loading'/>}</button>
            </form>
        </div>
    )
}

export default Register