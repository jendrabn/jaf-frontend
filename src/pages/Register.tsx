import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import type { RegisterReqTypes } from "@/types/auth";
import { useRegister, type RegisterInput } from "@/features/auth/api";
import AuthLayout from "@/components/layouts/AuthLayout";
import ErrorValidationAlert from "@/components/ui/error-validation-alert";
import PasswordInput from "@/components/ui/password-input";
import { useForm, type SubmitHandler } from "react-hook-form";
import SEO from "@/components/SEO";

function RegisterPage() {
  const navigate = useNavigate();

  const { mutate, isPending, error, reset } = useRegister();

  const { register, handleSubmit } = useForm<RegisterReqTypes>();

  const onSubmit: SubmitHandler<RegisterReqTypes> = (data) => {
    mutate(
      { data: data as RegisterInput },
      {
        onSuccess() {
          toast.success("Registrasi berhasil, silahkan login.");

          navigate("/auth/login", { replace: true });
        },
      }
    );
  };

  return (
    <AuthLayout title="Daftar">
      <SEO
        title="Register"
        description="Daftar akun baru di JAF Parfum's"
        noIndex={true}
        noFollow={true}
      />

      <ErrorValidationAlert error={error} onClose={reset} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <Form.Group className="mb-3">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" {...register("name")} autoFocus />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...register("email")} name="email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <PasswordInput {...register("password")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Konfirmasi Password</Form.Label>
            <PasswordInput {...register("password_confirmation")} />
          </Form.Group>

          <div className="d-grid mb-3">
            <Button variant="primary" type="submit">
              Daftar
            </Button>
          </div>

          <p className="mb-0 text-center">
            Sudah punya akun? <Link to="/auth/login">Login</Link>
          </p>
        </fieldset>
      </Form>
    </AuthLayout>
  );
}

export default RegisterPage;
