import { Button, Col, Form, Row } from "react-bootstrap";
import AccountLayout from "@/components/layouts/AccountLayout";
import type { PasswordReqTypes } from "@/types/user";
import { useUpdatePassword } from "@/features/user/api";
import ErrorValidationAlert from "@/components/ui/error-validation-alert";
import PasswordInput from "@/components/ui/password-input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import SEO from "@/components/SEO";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<PasswordReqTypes>();
  const { mutate, isPending, error, reset } = useUpdatePassword();

  const onSubmit: SubmitHandler<PasswordReqTypes> = (data) => {
    mutate(
      {
        data: {
          current_password: data.current_password,
          new_password: data.password,
          new_password_confirmation: data.password_confirmation,
        },
      },
      {
        onSuccess() {
          resetForm();

          toast.success("Password updated successfully.");
        },
      }
    );
  };

  return (
    <AccountLayout title="Ubah Password">
      <SEO
        title="Ubah Password"
        description="Kelola dan ubah password akun Anda untuk keamanan yang lebih baik."
        noIndex={true}
        noFollow={true}
      />

      <div className="row">
        <div className="col-lg-9">
          <ErrorValidationAlert error={error} onClose={reset} />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isPending}>
              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} className="text-muted">
                  Password Saat Ini
                </Form.Label>
                <Col sm={9}>
                  <PasswordInput {...register("current_password")} />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} className="text-muted">
                  Password
                </Form.Label>
                <Col sm={9}>
                  <PasswordInput {...register("password")} />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} className="text-muted">
                  Konfirmasi Password
                </Form.Label>
                <Col sm={9}>
                  <PasswordInput {...register("password_confirmation")} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={3} />
                <Col sm={9}>
                  <Button type="submit" variant="primary">
                    Ubah Password
                  </Button>
                </Col>
              </Form.Group>
            </fieldset>
          </Form>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </AccountLayout>
  );
};

export default ChangePassword;
