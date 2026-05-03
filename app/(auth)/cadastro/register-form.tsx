'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Form from 'next/form'
import registerAction from './registerAction';
import { useActionState } from 'react';

export default function RegisterForm(){
    const [state, formAction, isPending] = useActionState(registerAction, null)

    return (
        <Form action={formAction}>
            {state?.status == 400 && (
                <div className='text-xs mb-6 bg-red-100 border border-red-400 px-4 py-3 rounded relative' role='alert'>
                    <strong className='font-bold'>Erro! </strong>
                    <span  className='block sm:inline'>{state.message}</span>
                </div>
            )}
          <div>
            <Label>Nome</Label>
            <Input type="text" name="name" placeholder="Fulano de Tal" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="eu@exemplo.com" />
          </div>
          <div>
            <Label>Senha</Label>
            <Input type="password" name="password" placeholder="********" />
          </div>
          <div>
            <Button disabled={isPending} className="w-full mt-6" type="submit">
              {isPending ? 'Cadastrando...' : 'Registrar'}
            </Button>
          </div>
        </Form>
    )
}