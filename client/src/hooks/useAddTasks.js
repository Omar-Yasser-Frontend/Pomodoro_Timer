import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../utils/tasksApi";

export function useAddTasks() {
  const queryClient = useQueryClient();
  const { data, isPending, mutate } = useMutation({
    mutationKey: ["add-task"],
    mutationFn: addTask,
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { data, isPending, mutate };
}
