import AuthLayout from "@/components/layouts/AuthLayout";
import SEO from "@/components/SEO";
import RegisterForm from "@/features/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <AuthLayout title="Daftar">
      <SEO
        title="Register"
        description="Daftar akun baru di JAF Parfum's"
        noIndex={true}
        noFollow={true}
      />

      <RegisterForm />
    </AuthLayout>
  );
}

export default RegisterPage;
