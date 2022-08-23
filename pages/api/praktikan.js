import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res){
    const session = await getSession({ req })
    const prisma = new PrismaClient()

    
    
    if (!session) return res.status(401).json({ message: 'Unauthorized' })

    const data = req.body


    if (req.method === 'POST' && session){
        try {
            
            const praktikan = await prisma.praktikan.create({
                data: {
                    email: data.email,
                    nama_lengkap: data.nama_lengkap,
                    nrp: data.nrp,
                    kode_kelompok: data.kode_kelompok
                }
            })

            const praktikum = await prisma.praktikum.findMany({
                where: {
                    kode_kelompok: praktikan.kode_kelompok
                },
                include:{
                    aslab: true
                }
            })
            
            praktikum.map(async prak => {
                await prisma.nilai.create({
                    data: {
                        nrp: praktikan.nrp,
                        kode_aslab: prak.kode_aslab,
                        id_praktikum: prak.id
                    }
                })
            })         
            
            res.status(200).json('success')
        } catch(err){
            console.log(err)
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
}