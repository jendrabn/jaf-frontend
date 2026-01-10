import AuthLayout from "@/components/layouts/AuthLayout";
import SEO from "@/components/SEO";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <AuthLayout
      title="Lupa Password"
      subtitle="Masukkan email untuk menerima tautan pemulihan password."
    >
      <SEO
        title="Lupa Password"
        description="Lupa password akun Anda? Dapatkan link reset password melalui email."
        noIndex={true}
        noFollow={true}
      />

      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPassword;
