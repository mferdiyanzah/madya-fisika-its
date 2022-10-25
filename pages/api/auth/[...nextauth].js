import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export default NextAuth({
    pages:{
        signIn: '/',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    session: {
        maxAge: 2 * 60 * 60
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
    callbacks: {
        async jwt({ token }){
            return token
        }
    }
})