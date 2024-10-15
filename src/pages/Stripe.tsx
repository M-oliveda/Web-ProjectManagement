import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getStripeSessionStatus, subscribe } from "../services/api_service";
import { useCallback, useEffect, useState } from "react";
import { SubscriptionType } from "../types/SubscriptionType";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Q8hVJP5Fx2fTHDkXpQAG2i4sRSjTWwMEEsmvpKODDYRXvN5fHnfNHVrLfb4cfOvzHMBFJQbkexrhQgCbRibSwty00NoIHjlP9",
);

const subscriptionInfo = {
  subscriptionType: "",
};

export function CheckoutForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const subscriptionType = searchParams.get("subscription_type");

  const fetchClientSecret = useCallback(async () => {
    console.log(subscriptionType);
    if (!subscriptionType) {
      return;
    }
    return subscribe(subscriptionType as SubscriptionType).then((data) => {
      console.log(data);
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
