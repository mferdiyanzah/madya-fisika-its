import React from 'react'
import Navbar from '../../components/Navbar'
import Register from '../../components/Register'

import { PrismaClient } from "@prisma/client";
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from "next/router";
import Head from "next/head";
import Loading from '../../components/Loading';
import DashboardPraktikan from '../../components/DashboardPraktikan';
import dateFormat from '../../helpers/dateFormat';


export async function getServerSideProps(context){
    const session = await getSession(context)
    const prisma = new PrismaClient()
    const kelompok = await prisma.kelompok.findMany()
    const praktikan = await prisma.praktikan.findFirst({
        where: {
            email: session?.user.email
        },
        include: {
            nilai: true
        }
    })
    
    
    return {
        props: {
            praktikan: praktikan,
            kelompok: kelompok
        }
    }
}

const Index = ({ praktikan, kelompok}) => {
    const {data, status} = useSession()

    const router = useRouter()
    if (status === 'loading') return <Loading/>
    if (status !== 'loading' && !data){
        router.push('/')
    }

    return (
        <div>
            <Head>
                <title>Praktikan | Laboratorium Fisika Madya </title>
            </Head>
            <Navbar nama_lengkap={praktikan ? praktikan.nama_lengkap : 'N/A'}/>
            
            {data && !praktikan && <Register kelompok={kelompok}/>}
            {data && praktikan && 
            <div className='p-4'>
                <DashboardPraktikan dataPraktikan={praktikan}/>
            </div>}
        </div>
    )
}

export default Index