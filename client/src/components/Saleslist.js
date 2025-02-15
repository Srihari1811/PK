import React, { useState, useEffect } from "react";
import axios from "axios";
import './SalesList.css';

const SalesList = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalReceivedAmount, setTotalReceivedAmount] = useState(0);
  const [totalInvoicesAmount, setTotalInvoicesAmount] = useState(0);
  const [totalSalesDue, setTotalSalesDue] = useState(0);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sales");
      const sales = response.data;

      console.log("Sales Data:", sales); // Add this log to see the actual data coming from the backend

      // Calculate the metrics with fallback values to avoid undefined errors
      const totalInv = sales.length; // Total number of invoices
      const totalReceived = sales.reduce(
        (acc, sale) => acc + (sale.paymentPaid || 0), // Use fallback value 0 if paymentPaid is undefined
        0
      ); // Sum of all paid payments
      const totalAmount = sales.reduce(
        (acc, sale) => acc + (sale.total || 0), // Use fallback value 0 if total is undefined
        0
      ); // Sum of all invoices total
      const totalDue = sales.reduce(
        (acc, sale) => acc + ((sale.total || 0) - (sale.paymentPaid || 0)), // Use fallback value 0 for both total and paymentPaid if undefined
        0
      ); // Sum of all due amounts

      setSalesData(sales);
      setTotalInvoices(totalInv);
      setTotalReceivedAmount(totalReceived);
      setTotalInvoicesAmount(totalAmount);
      setTotalSalesDue(totalDue);
    } catch (error) {
      console.error("Error fetching sales data", error);
    }
  };

  return (
    <div className="sales-list-container">
      <div className="header">
        <h2>Sales List</h2>
        <div className="metrics">
          <div className="metric-card">
            <span className="icon">&#128717;</span>
            <div>
              <h3>{totalInvoices}</h3>
              <p>Total Invoices</p>
            </div>
          </div>
          <div className="metric-card">
            <span className="icon">&#128176;</span>
            <div>
              <h3>₹ {totalReceivedAmount.toFixed(2)}</h3>
              <p>Total Received Amount</p>
            </div>
          </div>
          <div className="metric-card">
            <span className="icon">&#128179;</span>
            <div>
              <h3>₹ {totalInvoicesAmount.toFixed(2)}</h3>
              <p>Total Invoices Amount</p>
            </div>
          </div>
          <div className="metric-card">
            <span className="icon">&#128185;</span>
            <div>
              <h3>₹ {totalSalesDue.toFixed(2)}</h3>
              <p>Total Sales Due</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sales-table">
        <table>
          <thead>
            <tr>
              <th>Sales Date</th>
              <th>Due Date</th>
              <th>Sales Code</th>
              <th>Reference No.</th>
              <th>Customer Name</th>
              <th>Total</th>
              <th>Paid Payment</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale._id}>
                <td>{new Date(sale.salesDate).toLocaleDateString()}</td>
                <td>{new Date(sale.dueDate).toLocaleDateString()}</td>
                <td>{sale.salesCode}</td>
                <td>{sale.referenceNo}</td>
                <td>{sale.customerName}</td>
                <td>₹ {sale.total}</td>
                <td>₹ {sale.paymentPaid}</td>
                <td>{sale.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesList;
