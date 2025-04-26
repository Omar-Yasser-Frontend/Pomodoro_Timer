import Container from "../components/Container";
import SignInForm from "../components/SignInForm";
import LoginSigninHeader from "../components/LoginSigninHeader";
import { useIsLogin } from "../context/LoginProvider";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function SignIn() {
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
        <LoginSigninHeader type="Create Account" />
        <SignInForm />
      </div>
    </Container>
  );
}

export default SignIn;
