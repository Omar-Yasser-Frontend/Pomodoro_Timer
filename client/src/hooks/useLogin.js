import { useMutation } from "@tanstack/react-query";
import { login } from "../utils/authApi";
import { useIsLogin } from "../context/LoginProvider";

export function useLogin() {
  const { setLogin } = useIsLogin();
  const { data, isPending, mutate, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => setLogin(true),
  });

  return { data, mutate, isPending, isError };
}
