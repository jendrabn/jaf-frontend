import AuthLayout from "@/components/layouts/AuthLayout";
import SEO from "@/components/SEO";
import LoginForm from "@/features/auth/components/LoginForm";

function LoginPage() {
  return (
    <AuthLayout title="Log in">
      <SEO
        title="Login"
        description="Login ke akun JAF Parfum's Anda"
        noIndex={true}
        noFollow={true}
      />

      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;
