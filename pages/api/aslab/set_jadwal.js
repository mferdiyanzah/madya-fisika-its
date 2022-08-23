import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res){
    const session = await getSession({ req })
    const prisma = new PrismaClient()

    
    
    if (!session) return res.status(401).json({ message: 'Unauthorized' })

    const data = req.body


    if (req.method === 'POST' && session){
        try {
            
            await prisma.praktikum.update({
                where: {
                    id: data.id
                },
                data: {
                    id_sesi: data.id_sesi
                }
            })        
            
            res.status(200).json('success')
        } catch(err){
            console.log(err)
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
}