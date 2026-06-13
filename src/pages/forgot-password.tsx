import AuthLayout from "@/components/layouts/auth-layout";
import SEO from "@/components/seo";
import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Lupa Password"
      subtitle="Masukkan email untuk menerima tautan pemulihan password."
    >
      <SEO
        title="Lupa Password Akun"
        description="Lupa password akun Anda? Dapatkan link reset password melalui email."
        noIndex={true}
        noFollow={true}
      />

      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
