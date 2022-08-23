import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res){
    const session = await getSession({ req })
    const prisma = new PrismaClient()
    
    if (!session) return res.status(401).json({ message: 'Unauthorized' })

    if (req.method === 'GET' && session){
        try {
            const query = req.query
            const { kode_kelompok } = query

            const praktikum = await prisma.praktikum.findMany({
                where: {
                    kode_kelompok: kode_kelompok
                },
                include:{
                    aslab: true,
                    waktu_praktikum: true,
                    judul_praktikum: true
                }
            })
            res.status(200).json(JSON.parse(JSON.stringify(praktikum)))
        } catch(err){
            console.log(err)
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
}