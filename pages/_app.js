import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import {useEffect} from 'react'
import {SessionProvider as AuthProvider} from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
  },[])

  return(
    <>
      <NextNProgress color='#0d6efd' options={{showSpinner: false}}/>
      <AuthProvider session={session}>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  ) 
}

export default MyApp
