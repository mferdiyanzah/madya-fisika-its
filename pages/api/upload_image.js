import { getSession } from 'next-auth/react'

const ImageKit = require('imagekit')

export default async function handler(req, res){
    const session = getSession({req})

    const imageKit = new ImageKit({
        urlEndpoint: 'https://ik.imagekit.io/madyafisikaits/',
        publicKey: 'public_bg1FT1zKR6sX5pXdwyl8PkDT9uA=',
        privateKey: process.env.NEXT_PUBLIC_IMAGEKIT
    })

    if(req.method === 'GET' && session){
        try{
            const result = imageKit.getAuthenticationParameters()
            res.status(200).end(JSON.stringify(result))
        } catch(e){
            res.status(404).end()
        }
    }
}