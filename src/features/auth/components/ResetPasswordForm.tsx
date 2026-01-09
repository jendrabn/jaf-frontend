import { useNavigate, useSearchParams } from "react-router";
import AuthLayout from "@/components/layouts/AuthLayout";
import type { ResetPasswordReqTypes } from "@/types/auth";
import { Button, Form, FormControl } from "react-bootstrap";
import { useResetPassword, type ResetPasswordInput } from "@/features/auth/api";
import { toast } from "react-toastify";
import ErrorValidationAlert from "@/components/ui/error-validation-alert";
import PasswordInput from "@/components/ui/password-input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { paths } from "@/config/paths";

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { mutate, isPending, error, reset } = useResetPassword();

  const { register, handleSubmit } = useForm<ResetPasswordReqTypes>({
    defaultValues: {
      email: searchParams.get("email") || "",
      token: searchParams.get("token") || "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordReqTypes> = (data) => {
    mutate(
      { data: data as ResetPasswordInput },
      {
        onSuccess() {
          toast.success("Reset password berhasil, silahkan login.");

          navigate(paths.auth.login.root(), { replace: true });
        },
      }
    );
  };

  return (
    <>
      <ErrorValidationAlert error={error} onClose={reset} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <FormControl type="email" {...register("email")} disabled />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <PasswordInput
              {...register("password")}
              className="mb-3"
              autofocus
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Konfirmasi Password</Form.Label>
            <PasswordInput
              {...register("password_confirmation")}
              className="mb-3"
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="primary">
              Reset Password
            </Button>
          </div>
        </fieldset>
      </Form>
    </>
  );
}
