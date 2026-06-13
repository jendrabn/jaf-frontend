import AuthLayout from "@/components/layouts/auth-layout";
import SEO from "@/components/seo";
import VerifyLoginForm from "@/features/auth/components/verify-login-form";

const VerifyLogin = () => {
  return (
    <AuthLayout
      title="Verifikasi Login"
      subtitle="Masukkan kode verifikasi untuk melanjutkan proses login."
    >
      <SEO
        title="Verifikasi Login Aman"
        description="Verifikasi login akun Anda"
        noIndex={true}
        noFollow={true}
      />

      <VerifyLoginForm />
    </AuthLayout>
  );
};

export default VerifyLogin;
