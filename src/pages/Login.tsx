import AuthLayout from "@/components/layouts/AuthLayout";
import SEO from "@/components/SEO";
import LoginForm from "@/features/auth/components/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Log in"
      subtitle="Masuk untuk melanjutkan belanja dan akses akunmu dengan cepat."
    >
      <SEO
        title="Login"
        description="Login ke akun JAF Parfum's Anda"
        noIndex={true}
        noFollow={true}
      />

      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
