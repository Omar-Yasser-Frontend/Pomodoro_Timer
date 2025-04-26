import { Link, useNavigate } from "react-router";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function LoginForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isError } = useLogin();
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
      <div className="bg-white rounded-md p-4 w-[350px] max-w-full text-black">
        <h2 className="text-center font-bold select-none text-2xl">Welcome</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (
              !gmail ||
              !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(gmail)
            )
              setErrors((error) => ({
                ...error,
                email: "Please enter a valid email address",
              }));
            else
              setErrors((error) => ({
                ...error,
                email: "",
              }));
            if (!password)
              setErrors((error) => ({
                ...error,
                password: "Please enter a valid email address",
              }));
            else
              setErrors((error) => ({
                ...error,
                password: "",
              }));

            if (
              !gmail ||
              !password ||
              !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(gmail)
            )
              return;
            mutate({ gmail, password }, { onSuccess: () => navigate("/") });
          }}
          className="signin"
        >
          <div className=" flex flex-col">
            {isError && (
              <p className="text-red-600 font-semibold">Something went wrong</p>
            )}
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              id="email"
              placeholder="Example@email.com"
              className="bg-gray-200 placeholder:text-gray-400 py-2 px-4 rounded-md outline-none"
            />
            {errors.email && (
              <p className="text-red-600 font-semibold">{errors.email}</p>
            )}
          </div>
          <div className="mt-5 flex flex-col">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={`${hidePassword ? "password" : "text"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Example@email.com"
                className="w-full bg-gray-200 placeholder:text-gray-400 py-2 px-4 rounded-md outline-none"
              />
              <button
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xl"
                onClick={() => setHidePassword((hide) => !hide)}
              >
                {hidePassword ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
            {errors.email && (
              <p className="text-red-600 font-semibold">{errors.password}</p>
            )}
          </div>

          <button className="w-full bg-gray-950 text-white py-2 px-4 mt-6 rounded-md cursor-pointer">
            Sign Up
          </button>
        </form>
      </div>
      <div className="text-center mt-3">
        <p>Want to create account ?</p>
        <Link to="/signin" className="underline">
          Sign In
        </Link>
      </div>
    </>
  );
}

export default LoginForm;
