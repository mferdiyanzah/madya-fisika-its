import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res){
    const session = await getSession({ req })
    const prisma = new PrismaClient()

    
    
    if (!session) return res.status(401).json({ message: 'Unauthorized' })

    const data = req.body

    // const checkNilai = await prisma.nilai.findFirst({
    //     where: {

    //     }
    // })


    if (req.method === 'POST' && session){
        try {
            
            const updateNilai = await prisma.nilai.update({
                where: {
                    id: data.id
                },
                data: {
                    abstrak: parseInt(data.abstrak),
                    pendahuluan: parseInt(data.pendahuluan),
                    metodologi: parseInt(data.metodologi),
                    hasil_diskusi: parseInt(data.hasil_diskusi),
                    kesimpulan: parseInt(data.kesimpulan),
                    format: parseInt(data.format),
                    jawab_post_lab: parseInt(data.post_lab),
                    ketepatan_waktu: parseInt(data.ketepatan_waktu),
                    nilai_akhir: parseFloat(data.nilai_akhir),
                    prelab: parseInt(data.prelab),
                    inlab: parseInt(data.inlab)
                }
            })        
            res.status(200).json(updateNilai)
        } catch(err){
            console.log(err)
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
}