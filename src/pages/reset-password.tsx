import AuthLayout from "@/components/layouts/auth-layout";
import SEO from "@/components/seo";
import ResetPasswordForm from "@/features/auth/components/reset-password-form";

const ResetPassword = () => {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Buat kata sandi baru yang aman untuk akunmu."
    >
      <SEO
        title="Reset Password Akun"
        description="Reset password akun Anda"
        noIndex={true}
        noFollow={true}
      />

      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;
