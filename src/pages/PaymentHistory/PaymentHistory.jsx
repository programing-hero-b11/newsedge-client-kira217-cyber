import React, { useEffect, useState } from "react";
import moment from "moment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get("/user/payments").then((res) => {
      setPayments(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">
        💳 My Payment History
      </h2>

      {/* ✅ Laptop View: Table */}
      <div className="hidden lg:block">
        <table className="table w-full text-sm border rounded-lg">
          <thead className="">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-3 px-4">{payment.name || "N/A"}</td>
                <td className="py-3 px-4">{payment.email}</td>
                <td className="py-3 px-4">{payment.transactionId}</td>
                <td className="py-3 px-4">$ {payment.amount}</td>
                <td className="py-3 px-4">
                  {moment(payment.paidAt).format("LLL")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile View: Card Format */}
      <div className="lg:hidden grid gap-4">
        {payments.map((payment, idx) => (
          <div key={idx} className="border rounded-lg shadow-md p-4 space-y-2">
            <p>
              <strong>Name:</strong> {payment.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {payment.email}
            </p>
            <p>
              <strong>Transaction ID:</strong> {payment.transactionId}
            </p>
            <p>
              <strong>Amount:</strong> $ {payment.amount}
            </p>
            <p>
              <strong>Paid At:</strong> {moment(payment.paidAt).format("LLL")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
