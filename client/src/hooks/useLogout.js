import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../utils/authApi";
import { useIsLogin } from "../context/LoginProvider";

export function useLogout() {
  const { setLogin } = useIsLogin();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setLogin(false);
      queryClient.invalidateQueries();
    },
  });

  return { isPending, mutate };
}
