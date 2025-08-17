import React from "react";

interface Payment {
  paymentId: number;
  userId: number;
  amount: number;
  paymentMethod: string;
  paidAt: string;
  transactionRef: string;
  paymentStatus: string;
  paymentType: string;
  planId?: number;
}

interface Props {
  payments: Payment[];
}

const PaymentListTable: React.FC<Props> = ({ payments }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Method</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Transaction Ref</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                No payments found
              </td>
            </tr>
          ) : (
            payments.map((p) => (
              <tr key={p.paymentId} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{p.paymentId}</td>
                <td className="px-4 py-2">{p.userId}</td>
                <td className="px-4 py-2">{p.amount.toLocaleString()} VND</td>
                <td className="px-4 py-2">{p.paymentMethod}</td>
                <td className="px-4 py-2">{p.paymentStatus}</td>
                <td className="px-4 py-2">{p.paymentType}</td>
                <td className="px-4 py-2">{new Date(p.paidAt).toLocaleString()}</td>
                <td className="px-4 py-2">{p.transactionRef}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentListTable;
