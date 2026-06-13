import AuthLayout from "@/components/layouts/auth-layout";
import SEO from "@/components/seo";
import LoginForm from "@/features/auth/components/login-form";

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
