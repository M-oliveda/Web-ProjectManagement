import { getAccesToken } from "../utils";

const apiServiceURL = import.meta.env.VITE_API_SERVICE_URL || "localhost:8000";

export async function getProjects() {
  const token = getAccesToken();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(`${apiServiceURL}/api/v1/projects`, {
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

export async function addNewProject(name: string, description: string) {
  const token = getAccesToken();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(`${apiServiceURL}/api/v1/projects/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ name: name, description: description }),
  });

  if (apiResult.status === 201) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}

export async function deleteProject(project_id: string) {
  const token = getAccesToken();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(
    `${apiServiceURL}/api/v1/projects/${project_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  );

  if (apiResult.status === 200) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}

export async function updateProject(
  project_id: string,
  name: string,
  description: string,
) {
  const token = getAccesToken();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(
    `${apiServiceURL}/api/v1/projects/${project_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name: name, description: description }),
    },
  );

  if (apiResult.status === 200) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}
