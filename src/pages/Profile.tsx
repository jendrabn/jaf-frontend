import { Row, Col, Button, Form } from "react-bootstrap";
import { useAuthState } from "@/contexts/AuthContext";
import type { User } from "@/types/user";
import AccountLayout from "@/components/layouts/AccountLayout";
import { useUpdateUser } from "@/features/user/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { type ChangeEvent, useCallback, useRef } from "react";
import ErrorValidationAlert from "@/components/ui/error-validation-alert";
import { useForm, useWatch } from "react-hook-form";
import SEO from "@/components/SEO";
import AvatarUpload from "@/features/user/components/AvatarUpload";

const Profile = () => {
  const { user } = useAuthState();

  const queryClient = useQueryClient();

  const inputAvatarRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);

  const { mutate, isPending, error, reset } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    setValue,
    control,
  } = useForm<User>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      sex: user?.sex || null,
      birth_date: user?.birth_date || "",
    },
  });

  const watchedSex = useWatch({ control, name: "sex" });

  const onSubmit = useCallback(
    (data: User) => {
      const formData = new FormData();

    // Append form data
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("sex", data.sex?.toString() || "1");
    formData.append("birth_date", data.birth_date || "");

    // Append avatar file if exists
    if (inputAvatarRef.current?.files?.[0]) {
      formData.append("avatar", inputAvatarRef.current.files[0]);
    }

      mutate(
        { data: formData },
        {
          onSuccess: () => {
            toast.success("Berhasil memperbarui profil.");

            queryClient.invalidateQueries({ queryKey: ["user"] });
          },
          onError: () => {
            resetForm();
            avatarRef.current?.setAttribute("src", user?.avatar ?? "");
          },
        }
      );
    },
    [mutate, queryClient, resetForm, user]
  );

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(onSubmit)(event);
    },
    [handleSubmit, onSubmit]
  );

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.result) {
            avatarRef.current?.setAttribute("src", reader.result as string);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <AccountLayout title="Profil">
      <SEO
        title="Profil Saya"
        description="Kelola informasi profil akun Anda di sini."
        noIndex={true}
        noFollow={true}
      />

      <ErrorValidationAlert error={error} onClose={reset} />

      <div className="row flex-row-reverse">
        <div className="col-lg-3">
          <div className="mb-3 mb-lg-0">
            <AvatarUpload
              src={user?.avatar}
              name={user?.name || "Username"}
              imageRef={avatarRef}
              onTriggerUpload={() => {
                inputAvatarRef.current?.click();
              }}
            />
          </div>
        </div>
        <div className="col-lg-9">
          <Form onSubmit={handleFormSubmit}>
            <fieldset disabled={isPending}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" className="text-muted">
                  Nama
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" {...register("name")} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" className="text-muted">
                  Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="email" {...register("email")} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" className="text-muted">
                  Nomor Telepon
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" {...register("phone")} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" className="text-muted">
                  Jenis Kelamin
                </Form.Label>
                <Col sm="9">
                  <Form.Check
                    type="radio"
                    inline
                    label="Laki-laki"
                    name="sex"
                    checked={watchedSex === 1}
                    onChange={() => setValue("sex", 1)}
                  />
                  <Form.Check
                    type="radio"
                    label="Perempuan"
                    inline
                    name="sex"
                    checked={watchedSex === 2}
                    onChange={() => setValue("sex", 2)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" className="text-muted">
                  Tanggal Lahir
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="date" {...register("birth_date")} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="3"></Form.Label>
                <Col sm="9">
                  <Button variant="primary" type="submit">
                    Simpan
                  </Button>
                </Col>
              </Form.Group>
            </fieldset>

            <input
              type="file"
              className="d-none"
              ref={inputAvatarRef}
              name="avatar"
              accept=".jpg,.jpeg,.png"
              onChange={handleAvatarChange}
            />
          </Form>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Profile;
