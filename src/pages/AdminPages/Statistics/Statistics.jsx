import React, { useEffect, useState } from "react";
import { FaUser, FaNewspaper, FaStar, FaCommentDollar } from "react-icons/fa";
import CountUp from "react-countup";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import moment from "moment";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    premiumArticles: 0,
    totalEarnings: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/statistics").then((res) => setStats(res.data));
    axiosSecure.get("/admin/chart-data").then((res) => setChartData(res.data));
    axiosSecure
      .get("/admin/payment-history")
      .then((res) => setPayments(res.data));
  }, [axiosSecure]);

  const cardStyle =
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow-lg flex items-center justify-between";

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        📊 Statistics
      </h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          {
            title: "All Articles",
            icon: <FaNewspaper size={30} />,
            value: stats.totalArticles,
          },
          {
            title: "Total Users",
            icon: <FaUser size={30} />,
            value: stats.totalUsers,
          },
          {
            title: "Today's Earning",
            icon: <FaCommentDollar size={30} />,
            value: stats.totalEarnings,
          },
          {
            title: "Premium Articles",
            icon: <FaStar size={30} />,
            value: stats.premiumArticles,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className={cardStyle}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <p className="text-lg font-semibold mb-1">{item.title}</p>
              <p className="text-2xl font-bold">
                <CountUp end={item.value} duration={2} />
              </p>
            </div>
            <div>{item.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Daily Article Chart */}
      <div className="mb-12 p-6 shadow-md rounded-xl">
        <h3 className="text-xl font-semibold mb-4">
          📅 Daily Article Activity
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={12} angle={-45} textAnchor="end" />
            <YAxis />
            <Tooltip
              contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
              labelStyle={{ fontWeight: "bold" }}
              formatter={(value) => [`${value} articles`, "Total"]}
            />
            <Bar
              dataKey="articles"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Payment History Table */}
      <div className="p-6 shadow-md rounded-xl">
        <h3 className="text-xl font-semibold mb-4">💰 Payment History</h3>

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className=" text-left">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Transaction ID</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="">
                  <td className="p-3 border">{payment.name}</td>
                  <td className="p-3 border">{payment.email}</td>
                  <td className="p-3 border">{payment.transactionId}</td>
                  <td className="p-3 border">${payment.amount}</td>
                  <td className="p-3 border">
                    {moment(payment.paidAt).format("LLL")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
          {payments.map((payment, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm overflow-hidden"
            >
              <p>
                <strong>Name:</strong> {payment.name}
              </p>
              <p>
                <strong className="overflow-hidden">Email:</strong>{" "}
                {payment.email}
              </p>
              <p>
                <strong className="">Transaction ID:</strong>{" "}
                {payment.transactionId}
              </p>
              <p>
                <strong>Amount:</strong> ${payment.amount}
              </p>
              <p>
                <strong>Date:</strong> {moment(payment.paidAt).format("LLL")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
