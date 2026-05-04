
'use server'

import db from "@/lib/db"
import { hashSync } from 'bcrypt-ts'
import { redirect } from "next/navigation"

export default async function registerAction(_prevState: any, formData: FormData){
    const entries = Array.from(formData.entries())
    const data = Object.fromEntries(entries) as {
        name: string,
        email: string,
        password: string
    }

    console.log("=== Forma data ===")
    console.log(data)

    if(!data.email || !data.password || !data.name){
        return {
            status: 400,
            message: 'Preencha todos os campos'
        }
    }

    //verificar se o usuário já existe
    const isUserAlreadyCreated = await db.user.findUnique({
        where: {
            email: data.email
        }
    })

    if(isUserAlreadyCreated){
        return {
            status: 400,
            message: 'Usuário já cadastrado'
        }
    }

    //cadastrar usuário
    await db.user.create({
        data: {
            email: data.email,
            password: hashSync(data.password),
            name: data.name,
        }
    })

    return redirect('/login')
}