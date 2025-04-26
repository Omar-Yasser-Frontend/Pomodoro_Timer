import { useNavigate } from "react-router";
import Container from "../components/Container";
import LoginForm from "../components/LoginForm";
import LoginSigninHeader from "../components/LoginSigninHeader";
import { useIsLogin } from "../context/LoginProvider";
import { useEffect } from "react";

function Login() {
  const { isLogin } = useIsLogin();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (isLogin) navigate("/");
    },
    [navigate, isLogin]
  );

  return (
    <Container>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <LoginSigninHeader type="Login" />
        <LoginForm />
      </div>
    </Container>
  );
}

export default Login;
