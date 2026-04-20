import { LoginSchema, Login } from "../schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Field, FieldGroup } from "@/components/ui/field";
import { useLoginUser } from "../hooks/AuthHooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";

function LoginForm() {
  const { mutate: LoginUser } = useLoginUser();

  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      correo_electronico: "",
      password: "",
    },
  });

  function onSubmit(data: Login) {
    LoginUser(data);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="">Iniciar sesión</CardTitle>
        <CardDescription>Ingresa tus credenciales</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormInput<Login>
              name="correo_electronico"
              control={form.control}
              label="Correo Electronico"
              type="text"
              placeholder="ingresa tu correo electronico"
            />
            <FormInput<Login>
              name="password"
              control={form.control}
              label="Contraseña"
              type="password"
              placeholder="ingresa tu contraseña"
            />
          </FieldGroup>
          <CardFooter className="mt-6 px-0 pb-0">
            <Field>
              <Button type="submit">Submit</Button>
            </Field>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
