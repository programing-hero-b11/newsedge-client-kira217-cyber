import React, { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUser, FaUserAltSlash, FaUserTie, FaNewspaper } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    label: "Total Articles",
    count: 215,
    icon: <FaNewspaper className="text-4xl text-indigo-600" />,
    bg: "bg-indigo-50",
  },
  {
    label: "Normal Users",
    count: 160,
    icon: <FaUserAltSlash className="text-4xl text-green-600" />,
    bg: "bg-green-50",
  },
  {
    label: "Premium Users",
    count: 55,
    icon: <FaUserTie className="text-4xl text-orange-600" />,
    bg: "bg-orange-50",
  },
  {
    label: "Total Users",
    count: 215,
    icon: <FaUser className="text-4xl text-blue-600" />,
    bg: "bg-blue-50",
  },
];

const CountUps = () => {
  const [hasViewed, setHasViewed] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  if (inView && !hasViewed) {
    setHasViewed(true);
  }

  return (
    <section className="py-10 px-4 bg-base-100" ref={ref}>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10"> Statistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className={`rounded-xl shadow-lg p-6 flex flex-col items-center text-center ${stat.bg}`}
          >
            <div className="mb-4">{stat.icon}</div>
            <h3 className="text-3xl font-extrabold text-gray-800">
              {hasViewed ? (
                <CountUp end={stat.count} duration={15} delay={0.2} />
              ) : (
                0
              )}
            </h3>
            <p className="text-gray-600 font-medium mt-1 text-lg">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CountUps;
