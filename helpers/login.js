import { signIn } from "next-auth/react";
import Cookies from "js-cookie";

export default function Login(role){
    if (role === 'praktikan'){
        Cookies.set("role", "praktikan")
    } else {
        Cookies.set("role", "aslab")
    }
    signIn('google')
}