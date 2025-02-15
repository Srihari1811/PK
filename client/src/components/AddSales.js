import React, { useState } from "react";
import './AddSales.css';

const AddSales = () => {
  const [formData, setFormData] = useState({
    warehouse: "",
    customerName: "",
    salesCode: "",
    salesNumber: "",
    salesDate: "",
    referenceNo: "",
    itemDetails: [],
    otherCharges: 0,
    discountCouponCode: "",
    couponType: "",
    couponValue: 0,
    discountOnAll: 0,
    total: 0,            // New field
    paymentPaid: 0,       // New field
    paymentStatus: "",    // New field
    dueDate: "",          // New field
    note: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage("Sales data submitted successfully");
        window.scrollTo(0, 0);  // Scroll to top
        setTimeout(() => setMessage(""), 5000);  // Clear message after 5 seconds
        setFormData({   // Clear the form fields after successful save
          warehouse: "",
          customerName: "",
          salesCode: "",
          salesNumber: "",
          salesDate: "",
          referenceNo: "",
          itemDetails: [],
          otherCharges: 0,
          discountCouponCode: "",
          couponType: "",
          couponValue: 0,
          discountOnAll: 0,
          total: 0,
          paymentPaid: 0,
          paymentStatus: "",
          dueDate: "",
          note: "",
        });
      } else {
        setMessage("Failed to submit sales data");
        window.scrollTo(0, 0);  // Scroll to top
        setTimeout(() => setMessage(""), 5000);  // Clear message after 5 seconds
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
      window.scrollTo(0, 0);  // Scroll to top
      setTimeout(() => setMessage(""), 5000);  // Clear message after 5 seconds
    }
  };

  return (
    <div className="container">
      {message && <div className="alert alert-info">{message}</div>}
      <h2 className="my-3">Add Sales</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="warehouse" className="form-label">
              Warehouse
            </label>
            <input
              type="text"
              className="form-control"
              name="warehouse"
              value={formData.warehouse}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="customerName" className="form-label">
              Customer Name
            </label>
            <input
              type="text"
              className="form-control"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="salesCode" className="form-label">
              Sales Code
            </label>
            <input
              type="text"
              className="form-control"
              name="salesCode"
              value={formData.salesCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="salesNumber" className="form-label">
              Sales Number
            </label>
            <input
              type="number"
              className="form-control"
              name="salesNumber"
              value={formData.salesNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="salesDate" className="form-label">
              Sales Date
            </label>
            <input
              type="date"
              className="form-control"
              name="salesDate"
              value={formData.salesDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="referenceNo" className="form-label">
              Reference No
            </label>
            <input
              type="text"
              className="form-control"
              name="referenceNo"
              value={formData.referenceNo}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* New Fields for Total, Payment, and Status */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="total" className="form-label">
              Total
            </label>
            <input
              type="number"
              className="form-control"
              name="total"
              value={formData.total}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="paymentPaid" className="form-label">
              Payment Paid
            </label>
            <input
              type="number"
              className="form-control"
              name="paymentPaid"
              value={formData.paymentPaid}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="paymentStatus" className="form-label">
              Payment Status
            </label>
            <select
              className="form-select"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddSales;
