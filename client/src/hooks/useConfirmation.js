import { useMutation } from "@tanstack/react-query";
import { confirmation } from "../utils/authApi";
import { useIsLogin } from "../context/LoginProvider";
import { useNavigate } from "react-router";

export function useConfirmation() {
  const { setLogin } = useIsLogin();
  const navigate = useNavigate();
  const { data, isPending, mutate } = useMutation({
    mutationKey: ["confirm-User"],
    mutationFn: confirmation,
    onError: (err) => console.log(err.message),
    onSuccess: (data) => {
      console.log(data);
      setLogin(true);
      navigate("/");
    },
  });

  return { data, isPending, mutate };
}
