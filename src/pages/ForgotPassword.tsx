import AuthLayout from "@/components/layouts/AuthLayout";
import SEO from "@/components/SEO";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

function ForgotPasswordPage() {
  return (
    <AuthLayout title="Lupa Password">
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

export default ForgotPasswordPage;
