import { Navigate } from "react-router";
import { useAuthState } from "@/contexts/AuthContext";
import { useLocation } from "react-router";
import { type PropsWithChildren } from "react";
import Loading from "@/components/ui/loading";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { paths } from "@/config/paths";

type AuthLayoutProps = PropsWithChildren & {
  title?: string;
  subtitle?: string;
};

function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuthState();

  if (isLoading) {
    return <Loading className="min-dvh-100" />;
  }

  if (isAuthenticated) {
    return (
      <Navigate to={location.state?.from?.pathname || paths.landing.root()} />
    );
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="auth-layout" role="main" tabIndex={-1}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-5">
              <div className="auth-card card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <div className="auth-card-header">
                    <span className="auth-card-eyebrow">Selamat datang</span>
                    <h1 className="h3 mb-2 text-body-emphasis">{title}</h1>
                    {subtitle && (
                      <p className="auth-card-subtitle mb-0">{subtitle}</p>
                    )}
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AuthLayout;
