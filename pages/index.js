import { useSession, getSession, signOut } from 'next-auth/react'
import { useRouter } from "next/router";
import Head from 'next/head';
import { PrismaClient } from "@prisma/client";
import { FcGoogle } from "react-icons/fc";
import Login from '../helpers/login';
import Cookies from 'js-cookie';
import Loading from '../components/Loading';

export async function getServerSideProps(context){
    const session = await getSession(context)
    const prisma = new PrismaClient()
    const checkAslab = await prisma.aslab.findFirst({
        where: {
            email: session?.user.email
        }
    }) 
    
    return {
        props: {
            checkAslab: checkAslab,
        }
    }
}

const Auth = ({ checkAslab }) => {
    const router = useRouter()
    const {data: session, status } = useSession()
    if (status === "loading") return <Loading/>
    
    // Redirect setelah login
    if (session && Cookies.get("role")){
        if (checkAslab && Cookies.get("role") === 'aslab'){
            router.push('/aslab')
            return <Loading/>
        } else if(Cookies.get("role") === 'praktikan'){
            router.push('/praktikan')
            return <Loading/>
        }
    }


    return (
        <div className="body-container body-login d-flex justify-content-center align-items-center">
            <Head>
                <title>Login | Laboratorium Fisika Madya Fisika ITS</title>
            </Head>
            <div className="card-login p-4 border border-2 rounded-3 shadow">
                <div className="logo-login text-black mb-4 border-bottom border-dark py-2">
                    <span>LABORATORIUM FISIKA MADYA</span>
                    <span>DEPARTEMEN FISIKA ITS</span>
                </div>
            
            {status === "authenticated" && !checkAslab && Cookies.get("role") === 'aslab' &&
                <div className='text-center'>
                    <h5>Anda bukanlah asisten.<br/>Silahkan login sebagai praktikan</h5>
                    <button
                        className="btn btn-outline-primary my-2 w-100 d-flex justify-content-center align-items-center"
                        onClick={(e) => {
                            e.preventDefault()
                            Login("praktikan")
                        }}
                    ><FcGoogle className='mx-2'/> Login sebagai Praktikan</button>
                </div>
            }
            {status === "unauthenticated" &&
                <> 
                    <p className='w-100'>
                        Anda belum melakukan Login.<br/> Silahkan Login terlebih dahulu!
                    </p>
                    <div className='text-center'>
                        <button
                            className="btn btn-outline-primary my-2 w-100 d-flex justify-content-center align-items-center"
                            onClick={(e) => {
                                e.preventDefault()
                                Login("aslab")
                            }}
                        ><FcGoogle className='mx-2'/> Login sebagai Asisten</button>
                        <button
                            className="btn btn-outline-success my-2 w-100 d-flex justify-content-center align-items-center"
                            onClick={(e) => {
                                e.preventDefault()
                                Login('praktikan')
                            }}
                        ><FcGoogle className='mx-2'/> Login sebagai Praktikan
                        </button>
                    </div>
                </>
            }
            </div>
        </div>
    )
}

export default Auth