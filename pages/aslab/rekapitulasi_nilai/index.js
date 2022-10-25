import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Navbar from '../../../components/Navbar'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import Footer from '../../../components/Footer'
import _ from 'lodash'
import RekapitulasiNilai from '../../../components/RekapitulasiNilai'

export async function getServerSideProps(context){
  const session = await getSession(context)
  const prisma = new PrismaClient()
  const aslab = await prisma.aslab.findFirst({
      where: {
          email: session?.user.email
      }
  })

	const nilai = await prisma.praktikum.findMany({
		where: {
			aslab: {
				email: aslab.email
			}
		},
		include: {
			nilai:{
				include: {
					praktikan: true
				}
			}
		}
	})

  return {
    props:{
        nilai: nilai,
        aslab: aslab
    }
  }
}

const Index = ({ aslab, nilai }) => {
  const {data, status} = useSession()
  const router = useRouter()
  if(!data && status !== 'loading') router.push('/')
  

  if(!aslab) router.push('/praktikan')

  return (
    <div>
      <Head>
        <title>Rekapitulasi Nilai | Laboratorium Fisika Madya</title>
      </Head>
        <Navbar nama_lengkap={aslab.nama_lengkap}/>
				<RekapitulasiNilai kumpulan_nilai={nilai} />
        <Footer/>
    </div>
  )
}


export default Index