import AuthLayout from "@/components/layouts/AuthLayout";
import SEO from "@/components/SEO";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Buat kata sandi baru yang aman untuk akunmu."
    >
      <SEO
        title="Reset Password"
        description="Reset password akun Anda"
        noIndex={true}
        noFollow={true}
      />

      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;
