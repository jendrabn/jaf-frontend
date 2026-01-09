import AuthLayout from "@/components/layouts/AuthLayout";
import SEO from "@/components/SEO";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <AuthLayout title="Reset Password">
      <SEO
        title="Reset Password"
        description="Reset password akun Anda"
        noIndex={true}
        noFollow={true}
      />

      <ResetPasswordForm />
    </AuthLayout>
  );
}

export default ResetPasswordPage;
