import { LoginSchema, Login } from '../schema/AuthSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useLoginUser } from '../hooks/AuthHooks'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function LoginForm() {
    const { mutate: LoginUser } = useLoginUser();

    const form = useForm<Login>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            correo_electronico: "",
            password: "",
        }
    })

    function onSubmit(data: Login) {
        LoginUser(data);
    }


    return (
        <Card className='w-full sm:max-w-md'>
            <CardHeader>
                <CardTitle className=''>Iniciar sesión</CardTitle>
                <CardDescription>
                    Ingresa tus credenciales
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <FieldGroup>
                        <Controller
                            name='correo_electronico'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='correo'>
                                        Correo Electronico
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="correo"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Ingresa tu Correo Electronico"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='password'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='password'>
                                        Contraseña
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Ingresa tu Contraseña"
                                        type='password'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <CardFooter>
                        <Field orientation="horizontal">
                            <Button type="submit">
                                Submit
                            </Button>
                        </Field>
                    </CardFooter>
                </form>
            </CardContent>

        </Card>
    )
}

export default LoginForm