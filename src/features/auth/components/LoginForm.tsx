import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useLogin, type LoginInput } from "@/features/auth/api";
import { useLocation } from "react-router";
import { setAuthToken, setSelectedCartIds } from "@/utils/functions";
import PasswordInput from "@/components/ui/password-input";
import { useForm, type SubmitHandler } from "react-hook-form";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { paths } from "@/config/paths";
import { useServerValidation } from "@/hooks/use-server-validation";

export default function LoginForm() {
  const navigate = useNavigate();

  const location = useLocation();

  const { mutate, isPending, error } = useLogin();

  const form = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    mutate(
      { data: data as LoginInput },
      {
        onSuccess: (resp) => {
          // OTP required: server returns otp_required, otp_expires_at, otp_sent_to
          if ((resp as { otp_required?: boolean }).otp_required) {
            if (data.email) {
              sessionStorage.setItem("pendingLoginEmail", data.email);
            }

            const { otp_expires_at, otp_sent_to } = resp as {
              otp_expires_at?: string;
              otp_sent_to?: string;
            };

            if (otp_expires_at) {
              sessionStorage.setItem("otpExpiresAt", otp_expires_at);
            }
            if (otp_sent_to) {
              sessionStorage.setItem("otpSentTo", otp_sent_to);
            }

            navigate(paths.auth.verifyLogin(), {
              replace: true,
              state: { email: data.email, from: location.state?.from },
            });
            return;
          }

          const token = (resp as { auth_token?: string }).auth_token;
          if (!token) {
            return;
          }

          setAuthToken(token);
          setSelectedCartIds([]);

          navigate(location.state?.from || "/", { replace: true });

          window.location.reload();
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...form.register("email")}
              autoFocus
              autoSave="email"
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

          <p className="text-end mb-3">
            <Link to={paths.auth.forgotPassword()}>Lupa Password?</Link>
          </p>

          <div className="d-grid gap-2 mb-5">
            <Button variant="primary" type="submit">
              Log in
            </Button>
            <GoogleLoginButton />
          </div>

          <p className="text-center mb-0">
            Belum punya akun? <Link to={paths.auth.register()}>Daftar</Link>
          </p>
        </fieldset>
      </Form>
    </>
  );
}
