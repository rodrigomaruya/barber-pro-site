"use client";
import { setupAPIClient } from "@/service/api";
import { getStripeJs } from "@/service/stripe-js";

export function Buttons({
  premium,
  token,
}: {
  premium: boolean;
  token: string;
}) {
  async function handleSubscribe() {
    if (premium === true) {
      return;
    }
    try {
      const api = setupAPIClient(token);
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId: sessionId });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangeSession() {
    try {
      const api = setupAPIClient(token);
      const response = await api.post("/create-portal");
      const { sessionId } = response.data;
      window.location.href = sessionId;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <button
        className={`bg-amber-500 rounded-md py-2 w-full mt-4 ${
          premium ? "bg-transparent" : "opacity-100"
        } ${premium ? "cursor-none" : "cursor-pointer"}`}
        disabled={premium === true}
        onClick={handleSubscribe}
        type="button"
      >
        {premium ? "Você é premium" : "Vira premium"}
      </button>
      {premium && (
        <button
          className="bg-amber-500 rounded-md py-2 w-full mt-2"
          type="button"
          onClick={handleChangeSession}
        >
          Alterar Assinatura
        </button>
      )}
    </>
  );
}
