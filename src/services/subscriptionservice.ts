import { SubscriptionType } from "../types/SubscriptionType";
import { getAccesToken } from "../utils";

const apiServiceURL = import.meta.env.VITE_API_SERVICE_URL || "localhost:8000";

export async function subscribe(subscription_type: SubscriptionType): Promise<
  | boolean
  | {
      id: string;
      client_secret: string;
    }
> {
  const token = getAccesToken();

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
  const token = getAccesToken();

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
  const token = getAccesToken();

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
