import { getAccesToken } from "../utils";

const apiServiceURL = import.meta.env.VITE_API_SERVICE_URL || "localhost:8000";

export async function createTask(
  project_id: string,
  title: string,
  description: string,
) {
  const token = getAccesToken();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(`${apiServiceURL}/api/v1/tasks/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      project_id: project_id,
      title: title,
      description: description,
    }),
  });

  if (apiResult.status === 201) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}

export async function getTasks() {
  const token = getAccesToken();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(`${apiServiceURL}/api/v1/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (apiResult.status === 200) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}

export async function deleteTask(task_id: string) {
  const token = getAccesToken();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(`${apiServiceURL}/api/v1/tasks/${task_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (apiResult.status === 200) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}

export async function updateTask(
  task_id: string,
  title: string,
  description: string,
  status: string,
) {
  const token = getAccesToken();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(`${apiServiceURL}/api/v1/tasks/${task_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      task_id: task_id,
      title: title,
      description: description,
      status: status.toLowerCase(),
    }),
  });

  if (apiResult.status === 200) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}
