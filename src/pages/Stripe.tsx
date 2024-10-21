import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  getStripeSessionStatus,
  subscribe,
} from "../services/subscriptionservice";
import { useCallback, useEffect, useState } from "react";
import { SubscriptionType } from "../types/SubscriptionType";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const stripeSecretKey = import.meta.env.VITE_STRIPE_SECRET_KEY || null;

const stripePromise = loadStripe(stripeSecretKey);

export function CheckoutForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const subscriptionType = searchParams.get("subscription_type");

  const fetchClientSecret = useCallback(async () => {
    if (!subscriptionType) {
      return;
    }
    return subscribe(subscriptionType as SubscriptionType).then((data) => {
      if (data && typeof data !== "boolean" && data.client_secret) {
        console.log(data);
        return data.client_secret;
      }
    });
  }, [subscriptionType]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export function Return() {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const subscriptionType = searchParams.get("subscription_type");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) {
      return;
    }

    getStripeSessionStatus(
      subscriptionType as SubscriptionType,
      sessionId,
    ).then((value) => {
      if (value) {
        setStatus(value.status);
      }
    });
  }, [subscriptionType]);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    navigate("/profile");
  }

  return null;
}
