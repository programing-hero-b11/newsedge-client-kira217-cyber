// PlansSection.jsx
import { motion } from "framer-motion";
import { Link } from "react-router";

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

const Plans = () => {
  return (
    <section className="py-16 bg-gradient-to-b ">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
        ✨ Choose Your <span className="text-primary">Plan</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="relative border-2 rounded-xl shadow-xl overflow-hidden min-h-[500px] flex flex-col justify-between animate-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Border Animation */}
              <div className="absolute inset-0 z-0 border-animation"></div>

              <div className="relative z-10 p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className=" mb-4">{plan.description}</p>
                <p className="text-3xl font-semibold mb-4">{plan.price}</p>

                <ul className="mb-6 space-y-2 text-sm flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      ✅ {feature}
                    </li>
                  ))}
                </ul>

                {/* Bottom Button (Always at bottom) */}
                <div className="mt-auto pt-4">
                  <Link
                    to="/subscription"
                    className="block w-full text-center py-2 px-4 btn btn-primary font-semibold rounded transition"
                  >
                    {plan.button}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 👇 Subscribe Button at Bottom */}
        <div className="text-center mt-12">
          <Link to="/subscription">
            <button className="px-6 py-3 hover:cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-lg shadow-md hover:scale-105 transition">
              Subscribe Now
            </button>
          </Link>
        </div>
      </div>

      {/* 🔥 Border Animation CSS */}
      <style>
        {`
          .border-animation::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: 1rem;
            padding: 2px;
            background: conic-gradient(from 0deg, #3b82f6, #9333ea, #3b82f6);
            animation: spin-border 4s linear infinite;
            z-index: -1;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            -webkit-mask-composite: destination-out;
          }

          @keyframes spin-border {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </section>
  );
};

export default Plans;
