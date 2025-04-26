import LoginSigninHeader from "../components/LoginSigninHeader";
import Container from "../components/Container";
import ConfirmationForm from "../components/ConfirmationForm";

function Confirmation() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <LoginSigninHeader type="" />
        <ConfirmationForm />
      </div>
    </Container>
  );
}

export default Confirmation;
