import AuthLayout from "@/components/layouts/AuthLayout";
import SEO from "@/components/SEO";
import VerifyLoginForm from "@/features/auth/components/VerifyLoginForm";

const VerifyLogin = () => {
  return (
    <AuthLayout
      title="Verifikasi Login"
      subtitle="Masukkan kode verifikasi untuk melanjutkan proses login."
    >
      <SEO
        title="Verifikasi Login"
        description="Verifikasi login akun Anda"
        noIndex={true}
        noFollow={true}
      />

      <VerifyLoginForm />
    </AuthLayout>
  );
};

export default VerifyLogin;
