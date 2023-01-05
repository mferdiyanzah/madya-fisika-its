import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Navbar from '../../components/Navbar'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import DashboardAslab from '../../components/DashboardAslab'
import Footer from '../../components/Footer'
import _ from 'lodash'

export async function getServerSideProps(context){
  const session = await getSession(context)
  const prisma = new PrismaClient()
  const aslab = await prisma.aslab.findMany({
      where: {
          email: session?.user.email
      }
  })

  const elka = await prisma.praktikum.findMany({
    where: {
      kode_kelompok: {
        contains: 'EL'
      },
      aslab: {
        email: aslab[0].email
      }
    },
    orderBy: {
      minggu: 'asc'
    },
    include: {
      waktu_praktikum: true,
      judul_praktikum: true
    }
  })

  const fislab = await prisma.praktikum.findMany({
    where: {
      aslab: {
        email: aslab[0].email
      },
      kode_kelompok: {
        contains: 'FISLAB'
      }
    },
    orderBy: {
      minggu: 'asc'
    },
    include: {
      waktu_praktikum: true,
      judul_praktikum: true
    }
  })

  return {
    props:{
        elka: JSON.parse(JSON.stringify(elka)),
        fislab: JSON.parse(JSON.stringify(fislab)),
        aslab: aslab
    }
  }
}

const Index = ({ aslab, elka, fislab }) => {
  const {data, status} = useSession()
  const router = useRouter()
  if(!data && status !== 'loading') router.push('/')
  

  if(!aslab) router.push('/praktikan')

  return (
    <div>
      <Head>
        <title>Asisten Praktikum | Laboratorium Fisika Madya</title>
      </Head>
        <Navbar nama_lengkap={aslab[0].nama_lengkap}/>
        <DashboardAslab nama_lengkap={aslab[0].nama_lengkap} elka={elka} fislab={fislab}  />
        <Footer/>
    </div>
  )
}


export default Index