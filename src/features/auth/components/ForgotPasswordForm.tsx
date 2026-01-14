import { Button, Form } from "react-bootstrap";
import {
  useForgotPassword,
  type ForgotPasswordInput,
} from "@/features/auth/api";
import { toast } from "react-toastify";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useServerValidation } from "@/hooks/use-server-validation";

export default function ForgotPasswordForm() {
  const { mutate, isPending, error } = useForgotPassword();

  const form = useForm<ForgotPasswordInput>();

  const onSubmit: SubmitHandler<ForgotPasswordInput> = (data) => {
    mutate(
      { data: data as ForgotPasswordInput },
      {
        onSuccess() {
          toast.success("Link reset password berhasil dikirim ke email anda.");

          form.reset();
        },
      }
    );
  };

  useServerValidation(error, form);

  return (
    <>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <div className="d-flex flex-column gap-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...form.register("email")}
                autoFocus
                isInvalid={!!form.formState.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {form.formState.errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Kirim Link Reset Password
              </Button>
            </div>
          </div>
        </fieldset>
      </Form>
    </>
  );
}
