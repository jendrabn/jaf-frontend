import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { useRegister, type RegisterInput } from "@/features/auth/api";
import PasswordInput from "@/components/ui/password-input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { paths } from "@/config/paths";
import { useServerValidation } from "@/hooks/use-server-validation";

export default function RegisterForm() {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useRegister();

  const form = useForm<RegisterInput>();

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    mutate(
      { data: data as RegisterInput },
      {
        onSuccess() {
          toast.success("Registrasi berhasil, silahkan login.");

          navigate(paths.auth.login.root(), { replace: true });
        },
      }
    );
  };

  useServerValidation(error, form);

  return (
    <>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <Form.Group className="mb-3">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              {...form.register("name")}
              autoFocus
              isInvalid={!!form.formState.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {form.formState.errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...form.register("email")}
              name="email"
              isInvalid={!!form.formState.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {form.formState.errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <PasswordInput
              {...form.register("password")}
              isInvalid={!!form.formState.errors.password}
              errorMessage={form.formState.errors.password?.message}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Konfirmasi Password</Form.Label>
            <PasswordInput
              {...form.register("password_confirmation")}
              isInvalid={!!form.formState.errors.password_confirmation}
              errorMessage={
                form.formState.errors.password_confirmation?.message
              }
            />
          </Form.Group>
          <div className="d-grid mb-3">
            <Button variant="primary" type="submit">
              Daftar
            </Button>
          </div>
          <p className="mb-0 text-center">
            Sudah punya akun? <Link to={paths.auth.login.root()}>Login</Link>
          </p>
        </fieldset>
      </Form>
    </>
  );
}
