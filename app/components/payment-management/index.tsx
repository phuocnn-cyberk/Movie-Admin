import React, { useEffect, useState } from "react";
import PaymentListTable from "./payment-list-table";
import { getAllPayments, getPaymentsByUser } from "app/services/api";

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  // Filters
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchAllPayments = async () => {
    setLoading(true);
    try {
      const data = await getAllPayments();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
    setLoading(false);
  };

  const fetchPaymentsByUser = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getPaymentsByUser(Number(userId));
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments by user:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllPayments();
  }, []);

  // Apply filters
  const filteredPayments = payments.filter((p) => {
    const matchStatus = status ? p.paymentStatus === status : true;
    const matchMethod = method ? p.paymentMethod === method : true;

    const paidAt = new Date(p.paidAt);
    const matchFromDate = fromDate ? paidAt >= new Date(fromDate) : true;
    const matchToDate = toDate ? paidAt <= new Date(toDate) : true;

    return matchStatus && matchMethod && matchFromDate && matchToDate;
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Payment Management</h1>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={fetchAllPayments}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          View All Payments
        </button>
        <input
          type="number"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <button
          onClick={fetchPaymentsByUser}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          View By User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Status</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="FAILED">FAILED</option>
          <option value="PENDING">PENDING</option>
        </select>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Methods</option>
          <option value="paypal">PayPal</option>
          <option value="momo">Momo</option>
        </select>

        <div className="flex items-center gap-2">
          <label>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-2 py-1 rounded-md"
          />
        </div>

        <div className="flex items-center gap-2">
          <label>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border px-2 py-1 rounded-md"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PaymentListTable payments={filteredPayments} />
      )}
    </div>
  );
};

export default PaymentManagement;
