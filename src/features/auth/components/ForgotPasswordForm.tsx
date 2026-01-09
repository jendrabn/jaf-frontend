import { Button, Form } from "react-bootstrap";
import {
  useForgotPassword,
  type ForgotPasswordInput,
} from "@/features/auth/api";
import type { ForgotPasswordReqTypes } from "@/types/auth";
import { toast } from "react-toastify";
import ErrorValidationAlert from "@/components/ui/error-validation-alert";
import { useForm, type SubmitHandler } from "react-hook-form";

export default function ForgotPasswordForm() {
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
    <>
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
    </>
  );
}
