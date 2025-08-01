import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import "./CheckoutForm.css";
import useStatus from "../../hooks/useStatus";
import Swal from "sweetalert2";

const CheckoutForm = ({ selected }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [isDark, setIsDark] = useState(false);

  // ✅ Detect & watch DaisyUI theme changes
  useEffect(() => {
    const detectTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };

    detectTheme(); // initial

    // Watch for changes
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: isDark ? "#ffffff" : "#000000",
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        "::placeholder": {
          color: isDark ? "#9ca3af" : "#6b7280",
        },
      },
      invalid: {
        color: "#ef4444",
      },
    },
  };

  useEffect(() => {
    if (selected?.price) {
      axiosSecure
        .post("/create-payment-intent", { amount: selected.price * 100 })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [selected, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      toast.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        name: user.displayName || "Unknown",
        email: user.email,
        amount: selected.price,
        duration: selected.value,
        transactionId: paymentIntent.id,
      };

      try {
        const res = await axiosSecure.post("/payments", paymentInfo);

        if (res.data?.updateUser?.modifiedCount > 0) {
          Swal.fire({
            title: "Good job! Now you're a Premium User 🎉",
            text: "You now have access to all premium features!",
            icon: "success",
          });
          navigate("/premium-articles");
        }
      } catch (err) {
        console.error("Payment Save Error:", err);
      }
    }
  };

  return (
    <div className="custom-card-form">
      {/* Card Preview UI */}
      <div className="card-preview">
        <div className="chip"></div>
        <div className="card-number">1234 5678 9012 3456</div>
        <div className="flex justify-between text-xs mt-2">
          <div className="card-holder">CARDHOLDER NAME</div>
          <div className="card-expiration">12/28</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <CardElement className="stripe-input" options={cardElementOptions} />

        <div className="form-buttons">
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="pay-btn"
          >
            Pay ${selected?.price}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/subscription")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
