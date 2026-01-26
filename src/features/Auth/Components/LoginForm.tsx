import React from 'react'
import { LoginSchema, Login } from '../Schema/AuthSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FieldGroup } from '@/components/ui/field'
import z from 'zod'
function LoginForm() {
    const form = useForm<Login>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    function onSubmit(data: Login) {
        console.log(data);
    }


    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

            </FieldGroup>
        </form>
    )
}

export default LoginForm