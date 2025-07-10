import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; // ✅ make sure path is correct
import { useLocation } from "react-router";

// Load your Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

// Subscription options
const subscriptionOptions = [
  { label: "1 Minute", value: 60 * 1000, price: 1 },
  { label: "5 Days", value: 5 * 24 * 60 * 60 * 1000, price: 29 },
  { label: "10 Days", value: 10 * 24 * 60 * 60 * 1000, price: 49 },
];

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation();

  // (Optional) Handle data from Subscription page
  const planFromSubscription = location.state?.plan;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="p-6 rounded-lg shadow-2xl w-full max-w-md">
   
          <h1 className="text-2xl font-bold text-center mb-6">
            Complete Your Subscription
          </h1>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Duration</label>
            <select
              onChange={(e) => {
                const opt = subscriptionOptions.find(
                  (o) => o.label === e.target.value
                );
                setSelectedOption(opt);
              }}
              className="select select-bordered w-full"
            >
              <option value="">Choose Subscription Duration</option>
              {subscriptionOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label} - ${opt.price}
                </option>
              ))}
            </select>
          </div>

          {selectedOption && (
            <div className="mt-6">
              <Elements stripe={stripePromise}>
                <CheckoutForm selected={selectedOption} />
              </Elements>
            </div>
          )}
        </div>
      </div>
 
  );
};

export default Payment;
