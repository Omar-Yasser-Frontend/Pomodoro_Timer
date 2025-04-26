import isLogin from "./isLogin";

export async function getTasks() {
  const login = isLogin();

  if (login !== false) return null;

  const res = await fetch(
    `https://3afde1ea-9062-4673-bedf-0d7f10f7f39c-00-2ziyswb0pl2vu.spock.replit.dev:8000/api/tasks`,
    {
      credentials: "include",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch data");

  let data = await res.json();

  return data;
}

export async function addTask(task) {
  const res = await fetch(
    "https://3afde1ea-9062-4673-bedf-0d7f10f7f39c-00-2ziyswb0pl2vu.spock.replit.dev:8000/api/tasks",
    {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        task,
      }),
    }
  );
  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();

  return data;
}

export async function deleteTask(_id) {
  const login = isLogin();

  if (login !== false) return null;

  const res = await fetch(
    `https://3afde1ea-9062-4673-bedf-0d7f10f7f39c-00-2ziyswb0pl2vu.spock.replit.dev:8000/api/tasks/${_id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { "content-type": "application/json" },
    }
  );
  if (!res.ok) throw new Error("Failed to delete this task");

  const data = await res.json();
  return data;
}

export async function updateTask({ _id, task }) {
  const login = isLogin();

  if (login !== false) return null;
  const res = await fetch(
    `https://3afde1ea-9062-4673-bedf-0d7f10f7f39c-00-2ziyswb0pl2vu.spock.replit.dev:8000/api/tasks/${_id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    }
  );

  if (!res.ok) throw new Error("Failed to update task");

  const data = await res.json();

  return data;
}
