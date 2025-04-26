import { useMutation } from "@tanstack/react-query";
import { register } from "../utils/authApi";
import { useIsLogin } from "../context/LoginProvider";
import { useNavigate } from "react-router";

export function useSignIn() {
  const navigate = useNavigate();
  const { setLogin } = useIsLogin();
  const { data, isPending, mutate } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: register,
    onError: (err) => {
      setLogin(false);
      console.log(err.message);
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("/confirmation");
    },
  });

  return { data, isPending, mutate };
}
