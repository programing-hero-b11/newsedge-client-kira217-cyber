import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Free Explorer",
    price: "0 USD/mo",
    button: "Get Started",
    description: "Limited all Access",
    features: [
      "Limited article access per month",
      "Just one Article Added",
      "Basic newsletter access",
    ],
    duration: 0,
  },
  {
    title: "Premium Reader",
    price: "29 USD/mo",
    button: "Subscribe Now",
    description: "Standard",
    features: [
      "All Free Features",
      "Unlimited access to all articles",
      "Unlimited activity",
      "Early access to breaking news",
      "Added Unlimited Article",
      "Early access to featured stories",
    ],
    duration: 5,
  },
  {
    title: "Insider Pro",
    price: "49 USD/mo",
    button: "Become Insider",
    description: "Highly Recommend",
    features: [
      "All Premium features",
      "Access to exclusive content (interviews, reports)",
      "Monthly digital magazine",
      "Member-only events or Q&A",
      "Permissions Premium Access",
      "Member-only live events",
      "Priority support",
      "Annual archive access",
      "Early beta features",
      "1-on-1 article requests",
    ],
    duration: 10,
  },
];

const Subscription = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    navigate("/payment", { state: { plan } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-14">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Choose Your Plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-base-100 shadow-xl rounded-xl p-6 border border-base-300 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-center mb-2">
                {plan.title}
              </h2>
              <p className="text-center text-2xl font-semibold mb-1">
                {plan.price}
              </p>
              <p className="text-center text-sm text-gray-500 mb-4">
                {plan.description}
              </p>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe(plan)}
              className="btn btn-primary btn-outline w-full mt-auto"
            >
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
