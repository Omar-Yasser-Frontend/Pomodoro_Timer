import { Link } from "react-router";
import { useSignIn } from "../hooks/useSignIn";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { mutate } = useSignIn();
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState({});

  return (
    <>
      <div className="bg-white rounded-md p-4 w-[350px] max-w-full text-black">
        <h2 className="text-center font-bold select-none text-2xl">Welcome</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (
              !email ||
              !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
            )
              setError((error) => ({
                ...error,
                email: "Email could not be empty",
              }));
            else
              setError((error) => ({
                ...error,
                email: "",
              }));
            if (!password)
              setError((error) => ({
                ...error,
                password: "Please enter a valid password",
              }));
            else
              setError((error) => ({
                ...error,
                password: "",
              }));
            if (!username)
              setError((error) => ({
                ...error,
                username: "Confirm password should be like password",
              }));
            else
              setError((error) => ({
                ...error,
                username: "",
              }));

            if (
              !password ||
              !email ||
              !username ||
              !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
            )
              return;

            mutate({ email, password, username });
          }}
          className="signin"
        >
          <div className="mt-5 flex flex-col">
            <label htmlFor="username">username</label>
            <input
              type="text"
              onBlur={(e) =>
                e.target.value === ""
                  ? setError((error) => ({
                      ...error,
                      username: "Confirm password should be like password",
                    }))
                  : ""
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() =>
                setError((error) => ({ ...error, username: null }))
              }
              id="username"
              placeholder="John Doe"
              className="bg-gray-200 placeholder:text-gray-400 py-2 px-4 rounded-md outline-none"
            />
            {error.username && (
              <p className="text-red-600 font-semibold">{error.username}</p>
            )}
          </div>

          <div className=" flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onBlur={(e) =>
                e.target.value === ""
                  ? setError((error) => ({
                      ...error,
                      email: "Email could not be empty",
                    }))
                  : ""
              }
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setError((error) => ({ ...error, email: null }))}
              id="email"
              placeholder="Example@email.com"
              className="bg-gray-200 placeholder:text-gray-400 py-2 px-4 rounded-md outline-none"
            />
            {error.email && (
              <p className="text-red-600 font-semibold">{error.email}</p>
            )}
          </div>
          <div className="mt-5 flex flex-col">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={`${hidePassword ? "password" : "text"}`}
                value={password}
                onBlur={(e) =>
                  e.target.value === ""
                    ? setError((error) => ({
                        ...error,
                        password: "Please enter a valid password",
                      }))
                    : ""
                }
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() =>
                  setError((error) => ({ ...error, password: null }))
                }
                id="password"
                placeholder="Please enter password"
                className="bg-gray-200 placeholder:text-gray-400 py-2 px-4 rounded-md outline-none w-full"
              />
              <button
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xl"
                onClick={() => setHidePassword((hide) => !hide)}
              >
                {hidePassword ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
            {error.password && (
              <p className="text-red-600 font-semibold">{error.password}</p>
            )}
          </div>

          <button className="w-full bg-gray-950 text-white py-2 px-4 mt-6 rounded-md cursor-pointer">
            Sign Up
          </button>
        </form>
      </div>
      <div className="text-center mt-3">
        <p>have an account ?</p>
        <Link to="/login" className="underline">
          Log in
        </Link>
      </div>
    </>
  );
}

export default SignInForm;
