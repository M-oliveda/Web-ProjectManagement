import { SubscriptionType } from "../types/SubscriptionType";

const apiServiceURL = import.meta.env.VITE_API_SERVICE_URL || "localhost:8000";

export function get_access_token() {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return sessionStorage.getItem("token");
  }
}

function remove_access_token() {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    return;
  } else {
    sessionStorage.removeItem("token");
    return;
  }
}

export async function registerUser(email: string, password: string) {
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

  return apiResult.status === 201;
}

export async function loginUser(
  email: string,
  password: string,
  storedToken: boolean,
): Promise<boolean | { token: string }> {
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
    return false;
  }
}

export async function logoutUser() {
  remove_access_token();
  return true;
}

export async function getUserInfo() {
  const token = get_access_token();

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

export async function subscribe(subscription_type: SubscriptionType): Promise<
  | boolean
  | {
      id: string;
      client_secret: string;
    }
> {
  const token = get_access_token();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(
    `${apiServiceURL}/api/v1/subscription/create-checkout-session?` +
      new URLSearchParams({ subscription_type: subscription_type }),
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      },
    },
  );

  if (apiResult.status === 200) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}

export async function getStripeSessionStatus(
  subscripion_type: SubscriptionType,
  session_id: string,
) {
  const token = get_access_token();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(
    `${apiServiceURL}/api/v1/subscription/stripe-session-status?` +
      new URLSearchParams({
        subscription_type: subscripion_type || "annual",
        stripe_session_id: session_id,
      }),
  );

  if (apiResult.status === 200) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}

export async function unsubscribeUser(userEmail: string) {
  const token = get_access_token();

  if (!token) {
    return false;
  }

  const apiResult = await fetch(
    `${apiServiceURL}/api/v1/subscription/cancel-subscription?` +
      `user_email=${userEmail}`,
    {
      method: "POST",
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

export async function getProjects() {
  const token = get_access_token();

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
  const token = get_access_token();

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

  if (apiResult.status === 200) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}

export async function deleteProject(project_id: string) {
  const token = get_access_token();

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
  const token = get_access_token();

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
      body: JSON.stringify({ name: name, description: description }),
    },
  );

  if (apiResult.status === 200) {
    const data = await apiResult.json();
    return data;
  }

  return false;
}
