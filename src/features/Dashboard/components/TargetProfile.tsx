import { useAuthStore } from '@/stores/auth.store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from '@/components/ui/separator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'

export const TargetProfile = () => {
    const { user } = useAuthStore()

    return (
        <div className="flex justify-center ">
            <Card className="w-full max-w-md ">
                <CardHeader className="text-center">
                    <Avatar className="mx-auto w-20 h-20 bg-blue-100">
                        <AvatarFallback>
                            <FontAwesomeIcon icon={faTools} className="text-blue-600 text-4xl" />
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4 text-2xl font-bold">
                        ¡Bienvenido, {user?.nombres} {user?.apellidos}!
                    </CardTitle>
                    <CardDescription className="mt-2">
                        Estamos aquí para ayudarte con cualquier problema técnico.
                    </CardDescription>
                </CardHeader>

                <Separator className="my-4" />

                <CardContent className="text-center space-y-4">
                    <p className="">
                        Completa el formulario y nuestro equipo te atenderá lo antes posible.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
