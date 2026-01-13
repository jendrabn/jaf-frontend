import { Row, Col, Button, Form } from "react-bootstrap";
import { useAuthState } from "@/contexts/AuthContext";
import type { User } from "@/types/user";
import AccountLayout from "@/components/layouts/AccountLayout";
import { useUpdateUser } from "@/features/user/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { type ChangeEvent, useCallback, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import SEO from "@/components/SEO";
import AvatarUpload from "@/features/user/components/AvatarUpload";
import { useServerValidation } from "@/hooks/use-server-validation";

const Profile = () => {
  const { user } = useAuthState();

  const queryClient = useQueryClient();

  const inputAvatarRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);

  const { mutate, isPending, error } = useUpdateUser();

  const form = useForm<User>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      sex: user?.sex || null,
      birth_date: user?.birth_date || "",
    },
  });

  const watchedSex = useWatch({ control: form.control, name: "sex" });

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
            form.reset();
            avatarRef.current?.setAttribute("src", user?.avatar ?? "");
          },
        }
      );
    },
    [mutate, queryClient, form, user]
  );

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      void form.handleSubmit(onSubmit)(event);
    },
    [form, onSubmit]
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

  useServerValidation(error, form);

  return (
    <AccountLayout title="Profil">
      <SEO
        title="Profil Saya"
        description="Kelola informasi profil akun Anda di sini."
        noIndex={true}
        noFollow={true}
      />

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
                  <Form.Control
                    type="text"
                    {...form.register("name")}
                    isInvalid={!!form.formState.errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.formState.errors.name?.message}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" className="text-muted">
                  Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="email"
                    {...form.register("email")}
                    isInvalid={!!form.formState.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.formState.errors.email?.message}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" className="text-muted">
                  Nomor Telepon
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    {...form.register("phone")}
                    isInvalid={!!form.formState.errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.formState.errors.phone?.message}
                  </Form.Control.Feedback>
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
                    onChange={() => form.setValue("sex", 1)}
                  />
                  <Form.Check
                    type="radio"
                    label="Perempuan"
                    inline
                    name="sex"
                    checked={watchedSex === 2}
                    onChange={() => form.setValue("sex", 2)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" className="text-muted">
                  Tanggal Lahir
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="date"
                    {...form.register("birth_date")}
                    isInvalid={!!form.formState.errors.birth_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.formState.errors.birth_date?.message}
                  </Form.Control.Feedback>
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
