import React, { useState } from 'react';
import './NewPurchase.css';

const NewPurchaseGrid = () => {
  const [formData, setFormData] = useState({
    supplierName: '',
    referenceNo: '',
    purchaseDate: '',
    itemName: '',
    quantity: 0,
    purchasePrice: 0,
    discount: 0,
    taxAmount: 0,
    unitCost: 0,
    totalAmount: 0,
    otherCharges: 0,
    discountOnAll: 0,
    note: '',
    roundOff: 0,
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      supplierName: formData.supplierName,
      referenceNo: formData.referenceNo,
      purchaseDate: formData.purchaseDate,
      itemName: formData.itemName,
      quantity: formData.quantity,
      purchasePrice: formData.purchasePrice,
      discount: formData.discount,
      taxAmount: formData.taxAmount,
      unitCost: formData.unitCost,
      totalAmount: formData.totalAmount,
      otherCharges: formData.otherCharges,
      discountOnAll: formData.discountOnAll,
      note: formData.note,
      roundOff: formData.roundOff,
    };

    try {
      const response = await fetch('https://pk-api-psi.vercel.app/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Purchase added successfully!');
        setMessageType('success');
        setFormData({
          supplierName: '',
          referenceNo: '',
          purchaseDate: '',
          itemName: '',
          quantity: 0,
          purchasePrice: 0,
          discount: 0,
          taxAmount: 0,
          unitCost: 0,
          totalAmount: 0,
          otherCharges: 0,
          discountOnAll: 0,
          note: '',
          roundOff: 0,
        });
      } else {
        setMessage('Failed to add purchase. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error saving purchase: ' + error.message);
      setMessageType('error');
    }

    // Scroll to top to show the message
    window.scrollTo(0, 0);
    setTimeout(() => {
        setMessage('');
      }, 5000);
  };

  return (
    <div className="new-purchase-grid">
      <h2>Add Purchase</h2>

      {/* Display success or error message */}
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label>Supplier Name:</label>
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleInputChange}
            placeholder="Enter Supplier Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Reference No:</label>
          <input
            type="text"
            name="referenceNo"
            value={formData.referenceNo}
            onChange={handleInputChange}
            placeholder="Enter Reference No"
          />
        </div>

        <div className="form-group">
          <label>Purchase Date:</label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Item Name:</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            placeholder="Enter Item Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Enter Quantity"
            required
          />
        </div>

        <div className="form-group">
          <label>Purchase Price:</label>
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleInputChange}
            placeholder="Enter Purchase Price"
            required
          />
        </div>

        <div className="form-group">
          <label>Discount (₹):</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            placeholder="Enter Discount"
          />
        </div>

        <div className="form-group">
          <label>Tax Amount:</label>
          <input
            type="number"
            name="taxAmount"
            value={formData.taxAmount}
            onChange={handleInputChange}
            placeholder="Enter Tax Amount"
          />
        </div>

        <div className="form-group">
          <label>Unit Cost:</label>
          <input
            type="number"
            name="unitCost"
            value={formData.unitCost}
            onChange={handleInputChange}
            placeholder="Enter Unit Cost"
          />
        </div>

        <div className="form-group">
          <label>Total Amount:</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleInputChange}
            placeholder="Enter Total Amount"
          />
        </div>

        <div className="form-group">
          <label>Other Charges:</label>
          <input
            type="number"
            name="otherCharges"
            value={formData.otherCharges}
            onChange={handleInputChange}
            placeholder="Enter Other Charges"
          />
        </div>

        <div className="form-group">
          <label>Discount on All:</label>
          <input
            type="number"
            name="discountOnAll"
            value={formData.discountOnAll}
            onChange={handleInputChange}
            placeholder="Enter Discount on All"
          />
        </div>

        <div className="form-group full-width">
          <label>Note:</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            placeholder="Enter Note"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Round Off (₹):</label>
          <input
            type="number"
            name="roundOff"
            value={formData.roundOff}
            onChange={handleInputChange}
            placeholder="Enter Round Off Amount"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default NewPurchaseGrid;
