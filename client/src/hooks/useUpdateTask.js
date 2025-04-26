import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../utils/tasksApi";

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["update"],
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries(),
    onError: (err) => console.log(err.message),
  });

  return { isPending, mutate };
}
