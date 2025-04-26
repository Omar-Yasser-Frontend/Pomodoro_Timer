import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../utils/tasksApi";

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { isPending, mutate };
}
