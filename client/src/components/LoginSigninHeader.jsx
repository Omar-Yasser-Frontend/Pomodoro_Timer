import { GoCheckCircleFill } from "react-icons/go";
import { Link } from "react-router";

function LoginSigninHeader({ type }) {
  return (
    <div className="text-center">
      <Link to="/" className="flex items-center gap-2 mb-8 text-white">
        <GoCheckCircleFill fontSize={36} />
        <h1 className="text-4xl font-bold">Pomofocus</h1>
      </Link>
      <p className="text-center text-2xl text-gray-200 font-semibold mb-8">
        {type}
      </p>
    </div>
  );
}

export default LoginSigninHeader;
