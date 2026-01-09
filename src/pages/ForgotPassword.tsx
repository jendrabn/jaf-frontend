import { Button, Form } from "react-bootstrap";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  useForgotPassword,
  type ForgotPasswordInput,
} from "@/features/auth/api";
import type { ForgotPasswordReqTypes } from "@/types/auth";
import { toast } from "react-toastify";
import ErrorValidationAlert from "@/components/ui/error-validation-alert";
import { useForm, type SubmitHandler } from "react-hook-form";
import SEO from "@/components/SEO";

function ForgotPasswordPage() {
  const { mutate, isPending, error, reset } = useForgotPassword();

  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<ForgotPasswordReqTypes>();

  const onSubmit: SubmitHandler<ForgotPasswordReqTypes> = (data) => {
    mutate(
      { data: data as ForgotPasswordInput },
      {
        onSuccess() {
          toast.success("Link reset password berhasil dikirim ke email anda.");

          resetForm();
        },
      }
    );
  };

  return (
    <AuthLayout title="Lupa Password">
      <SEO
        title="Lupa Password"
        description="Lupa password akun Anda? Dapatkan link reset password melalui email."
        noIndex={true}
        noFollow={true}
      />

      <ErrorValidationAlert error={error} onClose={reset} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...register("email")} autoFocus />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Kirim Link Reset Password
            </Button>
          </div>
        </fieldset>
      </Form>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
