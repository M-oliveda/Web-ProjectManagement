import { getAccesToken, removeAccesToken } from "../utils";

const apiServiceURL = import.meta.env.VITE_API_SERVICE_URL || "localhost:8000";

export async function registerUser(
  email: string,
  password: string,
): Promise<true | string> {
  const apiResult = await fetch(`${apiServiceURL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (apiResult.status === 201) {
    return true;
  } else {
    const data = await apiResult.json();
    return data.detail;
  }
}

export async function loginUser(
  email: string,
  password: string,
  storedToken: boolean,
): Promise<true | string> {
  const apiResult = await fetch(`${apiServiceURL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (apiResult.status === 200) {
    const jsonData = await apiResult.json();
    if (storedToken) {
      localStorage.setItem("token", jsonData.access_token);
    } else {
      sessionStorage.setItem("token", jsonData.access_token);
    }
    return true;
  } else {
    const data = await apiResult.json();
    return data.detail;
  }
}

export async function logoutUser() {
  removeAccesToken();
  return true;
}

export async function getUserInfo() {
  const token = getAccesToken();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(`${apiServiceURL}/api/v1/auth/userinfo`, {
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
