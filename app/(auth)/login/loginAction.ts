'use server'

import { signIn } from "@/auth"

export default async function loginAction(_prevState: any, formData: FormData){
    try {
        const data = Object.fromEntries(formData.entries())
        await signIn('credentials', {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            redirect: false
        }) 

        return {status: 200} 
    } catch (error: any) {
        let error_message = ''

        if(error.type === 'CredentialsSignin'){
            error_message = 'Suas credenciais estão incorretas'
        }else {
            error_message = 'Ops! Algum erro aconteceu'
        }
        return {status: 400, message: error_message}
    }
}