import { Button, Col, Form, Row } from "react-bootstrap";
import AccountLayout from "@/components/layouts/AccountLayout";
import {
  useUpdatePassword,
  type UpdatePasswordInput,
} from "@/features/user/api";
import PasswordInput from "@/components/ui/password-input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import SEO from "@/components/SEO";
import { useServerValidation } from "@/hooks/use-server-validation";

const ChangePassword = () => {
  const form = useForm<UpdatePasswordInput>();
  const { mutate, isPending, error } = useUpdatePassword();

  const onSubmit: SubmitHandler<UpdatePasswordInput> = (data) => {
    mutate(
      {
        data: {
          current_password: data.current_password,
          new_password: data.new_password,
          new_password_confirmation: data.new_password_confirmation,
        },
      },
      {
        onSuccess() {
          form.reset();

          toast.success("Password updated successfully.");
        },
      }
    );
  };

  useServerValidation(error, form);

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
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isPending}>
              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} className="text-muted">
                  Password Saat Ini
                </Form.Label>
                <Col sm={9}>
                  <PasswordInput
                    {...form.register("current_password")}
                    isInvalid={!!form.formState.errors.current_password}
                    errorMessage={form.formState.errors.current_password?.message}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} className="text-muted">
                  Password
                </Form.Label>
                <Col sm={9}>
                  <PasswordInput
                    {...form.register("new_password")}
                    isInvalid={!!form.formState.errors.new_password}
                    errorMessage={form.formState.errors.new_password?.message}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} className="text-muted">
                  Konfirmasi Password
                </Form.Label>
                <Col sm={9}>
                  <PasswordInput
                    {...form.register("new_password_confirmation")}
                    isInvalid={!!form.formState.errors.new_password_confirmation}
                    errorMessage={
                      form.formState.errors.new_password_confirmation?.message
                    }
                  />
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
