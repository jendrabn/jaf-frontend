import type { LoginTypes } from "@/types/auth";
import { api } from "@/lib/api-client";
import { setAuthToken, setSelectedCartIds } from "@/utils/functions";
import { useGoogleLogin } from "@react-oauth/google";
import { Button, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { paths } from "@/config/paths";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const login = useGoogleLogin({
    onError: (error) => console.log("Login Failed:", error),
    onSuccess: (codeResponse) => {
      api
        .post<LoginTypes, LoginTypes>("/auth/google", {
          token: codeResponse.access_token,
        })
        .then((data) => {
          const token = (data as { auth_token?: string }).auth_token;
          if (!token) {
            return;
          }
          setAuthToken(token);

          setSelectedCartIds([]);

          navigate(location.state?.from || paths.landing.root(), { replace: true });

          window.location.reload();
        });
    },
  });

  return (
    <Button
      variant="outline-light"
      type="button"
      className="d-flex justify-content-center align-items-center gap-2"
      onClick={() => login()}
    >
      <Image
        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        alt="Google"
      />
      Log in dengan Google
    </Button>
  );
};

export default GoogleLoginButton;

