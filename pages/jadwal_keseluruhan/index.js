import React from 'react'
import { PrismaClient } from "@prisma/client";
import Navbar from '../../components/Navbar';
import Head from 'next/head'
import Jadwal from '../../components/Jadwal';
import Footer from '../../components/Footer';

export async function getServerSideProps(context){
    const prisma = new PrismaClient()
    const sesi = await prisma.sesi.findMany({
        where: {
            NOT: {
                id:1
            }
        },
        include:{
            praktikum: true
        }
    })
    
    
    return {
        props: {
            sesi: JSON.parse(JSON.stringify(sesi)),
        }
    }
}

const Index = ({ sesi }) => {
    
    return (
        <div>
            <Head>
                <title>Jadwal Keseluruhan</title>
            </Head>
            <Navbar/>
            <div className='container p-4'>
                <h2>Jadwal Keseluruhan</h2>
                <hr/>
                <div className='accordion'>
                    {Array(6).fill(null).map((val, id) => (
                        <div key={id} className='accordion-item'>
                            <h3 className='accordion-header'>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="true" aria-controls={`collapse${id}`}>
                                    Minggu Praktikum ke-{id+1}
                                </button>
                            </h3>
                            <div id={`collapse${id}`} className={`accordion-collapse collapse ${id === 0 ? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ul className='row'>
                                        {sesi.filter(s => s.minggu === id+1).map(s => (
                                            <Jadwal key={s.id} sesi={s}/>
                                        ))}
                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Index