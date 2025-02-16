import React, { useState, useEffect } from "react";
import './AddSales.css';

const AddSales = () => {
  const [formData, setFormData] = useState({
    warehouse: "",
    customerName: "",
    salesCode: "",
    salesNumber: "",
    salesDate: "",
    referenceNo: "",
    productName: "",
    productQuantity: 1,
    productPrice: 0,  // Product price field
    itemDetails: [],
    otherCharges: 0,
    discountCouponCode: "",
    couponType: "",
    couponValue: 0,
    discountOnAll: 0,
    total: 0,  // Total field
    paymentPaid: 0,
    paymentStatus: "",
    dueDate: "",
    note: "",
  });

  const [products, setProducts] = useState([]);  // State to store fetched products
  const [message, setMessage] = useState("");

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://pk-api-psi.vercel.app/items");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Update the total whenever product price or quantity changes
  useEffect(() => {
    const newTotal = formData.productQuantity * formData.productPrice;
    setFormData((prevData) => ({
      ...prevData,
      total: newTotal,
    }));
  }, [formData.productQuantity, formData.productPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle product selection and set product price based on selected product
  const handleProductSelect = (e) => {
    const selectedProductName = e.target.value;
    const selectedProduct = products.find((product) => product.name === selectedProductName);

    if (selectedProduct) {
      setFormData({
        ...formData,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,  // Set product price based on selection
        productQuantity: 1,                   // Reset quantity to 1
        total: selectedProduct.price * 1,     // Set initial total (price * quantity)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://pk-api-psi.vercel.app/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage("Sales data submitted successfully");
        window.scrollTo(0, 0);
        setTimeout(() => setMessage(""), 5000);
        setFormData({
          warehouse: "",
          customerName: "",
          salesCode: "",
          salesNumber: "",
          salesDate: "",
          referenceNo: "",
          productName: "",
          productQuantity: 1,
          productPrice: 0,
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
        window.scrollTo(0, 0);
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
      window.scrollTo(0, 0);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="container">
      {message && <div className="alert alert-info">{message}</div>}
      <h2 className="my-3">Add Sales</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          {/* Existing fields */}
          <div className="col-md-4">
            <label htmlFor="warehouse" className="form-label">Warehouse</label>
            <input
              type="text"
              className="form-control"
              name="warehouse"
              value={formData.warehouse}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="customerName" className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="salesCode" className="form-label">Sales Code</label>
            <input
              type="text"
              className="form-control"
              name="salesCode"
              value={formData.salesCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="salesNumber" className="form-label">Sales Number</label>
            <input
              type="number"
              className="form-control"
              name="salesNumber"
              value={formData.salesNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="salesDate" className="form-label">Sales Date</label>
            <input
              type="date"
              className="form-control"
              name="salesDate"
              value={formData.salesDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="referenceNo" className="form-label">Reference No</label>
            <input
              type="text"
              className="form-control"
              name="referenceNo"
              value={formData.referenceNo}
              onChange={handleInputChange}
            />
          </div>

          {/* New fields for Product Name, Quantity, and Price */}
          <div className="col-md-4">
            <label htmlFor="productName" className="form-label">Product Name</label>
            <select
              className="form-select"
              name="productName"
              value={formData.productName}
              onChange={handleProductSelect}   // Trigger product selection
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="productQuantity" className="form-label">Product Quantity</label>
            <input
              type="number"
              className="form-control"
              name="productQuantity"
              value={formData.productQuantity}
              onChange={handleInputChange}  // Trigger total recalculation when quantity changes
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="productPrice" className="form-label">Product Price</label>
            <input
              type="number"
              className="form-control"
              name="productPrice"
              value={formData.productPrice}
              readOnly
            />
          </div>
        </div>

        {/* Total, Payment, and Status Fields */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="total" className="form-label">Total</label>
            <input
              type="number"
              className="form-control"
              name="total"
              value={formData.total}
              readOnly
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="paymentPaid" className="form-label">Payment Paid</label>
            <input
              type="number"
              className="form-control"
              name="paymentPaid"
              value={formData.paymentPaid}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="paymentStatus" className="form-label">Payment Status</label>
            <select
              className="form-select"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Due">Due</option>
            </select>
          </div>
        </div>

        {/* Submission and Note Section */}
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="note" className="form-label">Note</label>
            <textarea
              className="form-control"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddSales;
