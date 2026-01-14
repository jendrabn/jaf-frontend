import { useNavigate, useSearchParams } from "react-router";
import { Button, Form, FormControl } from "react-bootstrap";
import { useResetPassword, type ResetPasswordInput } from "@/features/auth/api";
import { toast } from "react-toastify";
import PasswordInput from "@/components/ui/password-input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { paths } from "@/config/paths";
import { useServerValidation } from "@/hooks/use-server-validation";

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { mutate, isPending, error } = useResetPassword();

  const form = useForm<ResetPasswordInput>({
    defaultValues: {
      email: searchParams.get("email") || "",
      token: searchParams.get("token") || "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordInput> = (data) => {
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

  useServerValidation(error, form);

  return (
    <>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <div className="d-flex flex-column gap-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <FormControl
                type="email"
                {...form.register("email")}
                disabled
                isInvalid={!!form.formState.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {form.formState.errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <PasswordInput
                {...form.register("password")}
                autofocus
                isInvalid={!!form.formState.errors.password}
                errorMessage={form.formState.errors.password?.message}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Konfirmasi Password</Form.Label>
              <PasswordInput
                {...form.register("password_confirmation")}
                isInvalid={!!form.formState.errors.password_confirmation}
                errorMessage={
                  form.formState.errors.password_confirmation?.message
                }
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" variant="primary">
                Reset Password
              </Button>
            </div>
          </div>
        </fieldset>
      </Form>
    </>
  );
}
