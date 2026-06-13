import AuthLayout from "@/components/layouts/auth-layout";
import SEO from "@/components/seo";
import RegisterForm from "@/features/auth/components/register-form";

const Register = () => {
  return (
    <AuthLayout
      title="Daftar"
      subtitle="Buat akun baru untuk mulai berbelanja dan simpan parfum favorit."
    >
      <SEO
        title="Register"
        description="Daftar akun baru di JAF Parfum's"
        noIndex={true}
        noFollow={true}
      />

      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
